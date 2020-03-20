//import dependencies
const graphql = require('graphql');
const _ = require('lodash');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList, 
    GraphQLNonNull,
} = graphql;

//MongoDB connections through mongoose
const Book = require('../models/book');
const Author = require('../models/author');

//Data types
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                // console.log(args);
                // return _.find(authors, {id: parent.authorId} );
                return Author.findById(parent.authorId);
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id});
                return Book.find({
                    authorId: parent.id
                });
            }
        }
    }),
});

//dummy data
// let books = [
//     {name: 'book1', genre: 'genre1', id: '1', authorId: '3'},
//     {name: 'book2', genre: 'genre2', id: '2', authorId: '2'},
//     {name: 'book5', genre: 'genre69', id: '4', authorId: '2'},
//     {name: 'book3', genre: 'genre3', id: '3', authorId: '1'},
// ];
// let authors = [
//     {name: 'Gene', age: 27, id: '1'},
//     {name: 'Gane', age: 37, id: '2'},
//     {name: 'Gine', age: 47, id: '3'},
// ];


//Root Query
//fields does not need to be a function
//will enable us to query for 'book' with an arg of id
//book(id: '123')
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id:{type: GraphQLID},
            },
            resolve(parent, args){
                //code to get data from database or other source

                //finds obj w key (replace books with queried data from database)
                //return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID},
            },
            resolve(parent, args){
                //return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                //return authors;
                return Author.find({});
            }
        }
    },
});


//new graphqlnonnull is validation for it exists
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });

                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new  GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save();
            }
        }    
    }
})


//export
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

// const AuthorType = new GraphQLObjectType({
//     name:'Author',
//     fields: () => ({
//         id: {type: GraphQLString},
//         name: {type: GraphQLString},
//         genre: {type: GraphQLString}
//     }),
// })
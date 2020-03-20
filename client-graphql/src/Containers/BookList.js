import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }   
`;

const BookList = (props) => {

    const books = () => {
        if (props.data.loading){
            return(
                <li>Loading...</li>
            )
        }
        else{
            return props.data.books.map(book=>{
                return(
                    <li key={book.id}>{book.name}</li>
                )
                });
        }       
    };
    return (
        <div >
            <ul id="book-list">
                {books()}
            </ul>
        </div>
    );
}

export default graphql(getBooksQuery)(BookList);

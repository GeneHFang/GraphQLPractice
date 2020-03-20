import env from './env';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


let app = express();

//Testing backend wrapper for mangadex
const Mangadex = require('mangadex-api');
const client = new Mangadex();

client.agent.loginWithSession('./session/session')
    .then( async () => {
        const res = await client.search('To Be Winner');
        console.log(res);

    })


//allow cross origin requests
app.use(cors());

mongoose.connect(env.DATABASE_URL, );
mongoose.connection.once('open', ()=>{
    console.log('connected');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log('now listening for req on port 4000');
})
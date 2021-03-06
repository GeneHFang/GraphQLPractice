import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import './App.css';
import BookList from './Containers/BookList';
import AddBook from './Components/AddBook';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;

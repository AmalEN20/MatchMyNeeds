import React from 'react';
import Navbar from './NavBar/Navbar';
import './App.css';
import Home from './pages/Home';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './pages/Todo';
import MyRequests from './pages/Request';
import SignUp from './pages/SignUp';
import Footer from '../src/components/Footer/Footer';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/todo/me' element={<Todo/>} />
          <Route path='/request/me' element={<MyRequests/>} />
          <Route path='/signup' element={<SignUp/>} />
          {/* <Route path='/requests/:requestId' component={SingleRequest}/> */}
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
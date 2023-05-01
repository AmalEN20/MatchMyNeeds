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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Footer from '../src/components/Footer/Footer';
import MyRequests from './pages/Request';

import AllRequests from './pages/AllRequests';

import SingleRequest from './pages/SingleRequest';


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
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/request/me' component={MyRequests} />
          <Route path='/allrequests' component={AllRequests} />
          <Route path='/signup' component={SignUp} />
          <Route path='/requests/:requestId' component={SingleRequest}/>
          
        </Switch>

      </Router>
    </ApolloProvider>
  );
}

export default App;
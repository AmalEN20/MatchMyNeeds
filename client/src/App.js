import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Todo from './components/pages/Todo';
import Post from './components/pages/Post';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Todo} />
          <Route path='/Post' component={Post} />
          <Route path='/my requests' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
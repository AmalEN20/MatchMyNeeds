import React from 'react';
import Navbar from './NavBar/Navbar';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Todo from './pages/Todo';
import Request from './pages/Request';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Todo} />
          <Route path='/request' component={Request} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
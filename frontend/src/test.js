import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function Index() {
  return (
    <Router>
      <h1> Ahmed Mahmoud </h1>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
    </Router>
  )
}
export default Index;
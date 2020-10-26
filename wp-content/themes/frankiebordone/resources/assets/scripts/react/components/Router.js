import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Resume from './Resume';
import Projects from './Projects';
import Contact from './Contact';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />

        <Route exact path="/" component={Home} />
        <Route exact path="/resume" component={Resume} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/contact" component={Contact} />
      </BrowserRouter>
    );
  }
}

export default Router;

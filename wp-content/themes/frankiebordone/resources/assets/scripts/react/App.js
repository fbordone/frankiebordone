import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import Home from './components/Home';
import About from './components/About';
import Resume from './components/Resume';
import Portfolios from './components/Portfolios';
import Contact from './components/Contact';

class App extends React.Component {
  loadFont() {
    WebFont.load({
      google: {
        families: ['Nunito', 'Nunito:400,700'],
      },
      timeout: 3000,
    })
  }

  componentDidMount() {
    this.loadFont();
  }

  render() {
    return (
      <div className="wrap">
        <Router>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/resume">Resume</Link></li>
            <li><Link to="/portfolios">Portfolios</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/resume" component={Resume} />
            <Route exact path="/portfolios" component={Portfolios} />
            <Route exact path="/contact" component={Contact} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

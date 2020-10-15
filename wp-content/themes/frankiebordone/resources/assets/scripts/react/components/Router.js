import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import About from './About';
import Resume from './Resume';
import Projects from './Projects';
import Contact from './Contact';

class Router extends React.Component {
  state = {
    pages: [],
  };

  getPagesFromMenu() {
    axios.get('/wp-json/wp/v2/menu')
      .then(res => {
        const pages = res.data;
        this.setState({ pages });
      })
  }

  componentDidMount() {
    this.getPagesFromMenu();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="nav-wrap">
          <nav>
            <ul>
              {this.state.pages.map(page =>
                <li key={page.ID}>
                  <NavLink exact to={page.path}>{page.title}</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="content-wrap">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/resume" component={Resume} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/contact" component={Contact} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;

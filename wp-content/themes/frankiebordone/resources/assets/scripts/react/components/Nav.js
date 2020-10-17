import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Nav extends React.Component {
  state = {
    pages: [],
    active: false,
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

  toggleMenu = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <nav className={ `nav ${this.state.active ? 'nav--visible' : ''}` }>
        <button className="nav__menu-btn" onClick={this.toggleMenu}>
          <span className="nav__menu-btn-line"></span>
          <span className="nav__menu-btn-line"></span>
          <span className="nav__menu-btn-line"></span>
        </button>

        <div className="nav__contents">
          <ul className="nav__menu">
            {this.state.pages.map(page =>
              <li key={page.ID}>
                <NavLink exact to={page.path} onClick={this.toggleMenu}>{page.title}</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;

import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Nav extends React.Component {
  state = {
    pages: [],
    navImage: '',
    active: false,
  };

  getNavImage() {
    axios.get('/wp-json/wp/v2/nav')
      .then(res => {
        const navImage = res.data.image;
        this.setState({ navImage });
      })
  }

  getPagesFromMenu() {
    axios.get('/wp-json/wp/v2/menu')
      .then(res => {
        const pages = res.data;
        this.setState({ pages });
      })
  }

  componentDidMount() {
    this.getNavImage();
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
          <div className="nav__image">
            <NavLink exact to='/' className="nav__image-link" onClick={this.toggleMenu}>
              <img src={this.state.navImage} alt="A photo of Frankie Bordone" />
            </NavLink>
          </div>

          <ul className="nav__menu">
            {this.state.pages.map(page =>
              <li key={page.ID} className="nav__menu-list-item">
                <NavLink exact to={page.path} onClick={this.toggleMenu}>{page.title}</NavLink>
              </li>
            )}
          </ul>

          <p className="nav__copyright">© { new Date().getFullYear() } <span className="bold">Frankie Bordone</span></p>
        </div>
      </nav>
    )
  }
}

export default Nav;

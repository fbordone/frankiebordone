import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import BackgroundParticles from './BackgroundParticles';
import BackgroundDots from './BackgroundDots';

class Home extends React.Component {
  state = {
    title: '',
    tagline: '',
  };

  getPageContent() {
    axios.get('/wp-json/wp/v2/home')
      .then(res => {
        const data = res.data;
        this.setState({
          title: data.title,
          tagline: data.tagline,
        });
      })
  }

  componentDidMount() {
    this.getPageContent();
  }

  render() {
    return (
      <div className="home">
        <BackgroundParticles />

        <BackgroundDots />

        <div className="home__wrapper">
          <h1 className="home__title bold">
            <span className="blue">Frankie Bordone, </span> {this.state.title}
          </h1>

          <p className="home__tagline">{this.state.tagline}</p>

          <NavLink exact to='/resume' className="home__btn">See My Resume</NavLink>
        </div>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import axios from 'axios';

import BackgroundDots from './BackgroundDots';

class Projects extends React.Component {
  state = {
    projects: [],
    visible: false,
  };

  getPageContent() {
    axios.get('/wp-json/wp/v2/projects')
      .then(res => {
        this.setState({
          projects: res.data,
          visible: true,
        });
      })
  }

  componentDidMount() {
    this.getPageContent();
  }

  render() {
    return (
      <div className="projects">
        <BackgroundDots />

        <div className={ `padding-top ${this.state.visible ? 'visible' : 'hidden'}` }>
          <div className="projects__wrap">
            <h2 className="projects__section_title">Projects</h2>

            <div className="projects__grid">
              {this.state.projects.map(project =>
                <div key={project.ID} className="projects__grid_card">
                  <div className="projects__grid_card_content">
                    <a href={project.link} target="_blank">
                      <img className="projects__grid_card_img" src={project.image} alt={project.title} />
                    </a>

                    <a href={project.link} target="_blank">
                      <h4 className="projects__grid_card_title">{project.title}</h4>
                    </a>

                    <p className="projects__grid_card_copy">{project.tagline}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;

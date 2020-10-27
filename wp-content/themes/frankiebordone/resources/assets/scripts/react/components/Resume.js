import React from 'react';
import axios from 'axios';

import BackgroundDots from './BackgroundDots';

class Resume extends React.Component {
  state = {
    skillsTitle: '',
    skillsCopy: '',
    timelineTitle: '',
    visible: false,
  };

  getPageContent() {
    axios.get('/wp-json/wp/v2/resume')
      .then(res => {
        const data = res.data;
        this.setState({
          skillsTitle: data.skills_title,
          skillsCopy: data.skills_copy,
          timelineTitle: data.timeline_title,
          visible: true,
        });
      })
  }

  componentDidMount() {
    this.getPageContent();
  }

  render() {
    return (
      <div className="resume">
        <BackgroundDots />

        <div className={ `resume__skills padding-top ${this.state.visible ? 'visible' : 'hidden'}` }>
          <div className="resume__skills_wrap">
            <h2 className="resume__skills_title">{this.state.skillsTitle}</h2>

            <div className="resume__skills_copy" dangerouslySetInnerHTML={{__html: this.state.skillsCopy}}></div>
          </div>
        </div>

        <div className={ `resume__timeline padding-top padding-bottom ${this.state.visible ? 'visible' : 'hidden'}` }>
          <div className="resume__timeline_wrap">
            <h2>{this.state.timelineTitle}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;

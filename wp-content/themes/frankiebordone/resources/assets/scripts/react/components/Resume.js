import React from 'react';
import axios from 'axios';

import BackgroundDots from './BackgroundDots';

class Resume extends React.Component {
  state = {
    skills: [],
    timelineTitle: '',
    timelineCta: [],
    timelineEvents: [],
    visible: false,
  };

  getPageContent() {
    axios.get('/wp-json/wp/v2/resume')
      .then(res => {
        const data = res.data;
        this.setState({
          skills: data.skills,
          timelineTitle: data.timeline.title,
          timelineCta: data.timeline.cta,
          timelineEvents: data.timeline.events,
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
            <h2 className="resume__section_title">{this.state.skills.title}</h2>

            <div className="resume__skills_copy" dangerouslySetInnerHTML={{__html: this.state.skills.copy}}></div>
          </div>
        </div>

        <div className={ `resume__timeline padding-top padding-bottom ${this.state.visible ? 'visible' : 'hidden'}` }>
          <div className="resume__timeline_wrap">
            <h2 className="resume__section_title">{this.state.timelineTitle}</h2>

            <a href={this.state.timelineCta.url} target={this.state.timelineCta.target} className="resume__timeline_btn">
              {this.state.timelineCta.title}
            </a>

            {Object.keys(this.state.timelineEvents).map((key, index) => (
              <div key={index} className="resume__timeline_events">
                <h3 className="resume__timeline_events_title">{this.state.timelineEvents[key]['title']}</h3>

                <div className="resume__timeline_event_wrap">
                  {this.state.timelineEvents[key]['events'].map((event, index) =>
                    <div key={index} className="resume__timeline_event">
                      <p className="resume__timeline_event_year">{event.year}</p>
                      <p className="resume__timeline_event_title">{event.title}</p>
                      <p className="resume__timeline_event_subtitle">{event.subtitle}</p>
                      <p className="resume__timeline_event_description">{event.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;

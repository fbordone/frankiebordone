import React from 'react';
import Particles from 'react-particles-js';

class BackgroundParticles extends React.Component {
  render() {
    return (
      <div className="background__particles">
        <Particles
          params={{
            'particles': {
              'number': {
                'value': 110,
                'density': {
                  'enable': false,
                },
              },
              'size': {
                'value': 3,
                'random': false,
              },
              'move': {
                'direction': 'bottom',
                'out_mode': 'out',
              },
              'line_linked': {
                'enable': false,
              },
            },
            'interactivity': {
              'events': {
                'onclick': {
                  'enable': true,
                  'mode': 'remove',
                },
              },
              'modes': {
                'remove': {
                  'particles_nb': 10,
                },
              },
            },
          }}
        />
      </div>
    );
  }
}

export default BackgroundParticles;

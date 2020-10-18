import React from 'react';
import WebFont from 'webfontloader';

import Router from './components/Router';

class App extends React.Component {
  loadFont() {
    WebFont.load({
      google: {
        families: ['Nunito', 'Nunito:400,600,700'],
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
        <Router />
      </div>
    );
  }
}

export default App;

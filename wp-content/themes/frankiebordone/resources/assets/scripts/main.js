import '../styles/main.scss';
import '../styles/fonts.scss';
import './autoload/**/*'

import React from 'react';
import { render } from 'react-dom';
import App from './react/App';

render(<App />, document.querySelector('#root'));

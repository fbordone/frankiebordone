import React from 'react';
import { render } from 'react-dom';
import Router from './routes/Router';

import '../styles/main.scss';
import '../styles/fonts.scss';
import './autoload/**/*'

render(<Router />, document.querySelector('#root'));

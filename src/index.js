import React from 'react';
import App from './app';
import Model from './model';

const model = new Model();

React.render(<App model={model}/>, document.getElementById('root'));

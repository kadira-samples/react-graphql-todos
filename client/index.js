import React from 'react';
import App from './app';
import Model from './model';

// create the model
const model = new Model();

// render the main react component
React.render(<App model={model}/>, document.getElementById('root'));


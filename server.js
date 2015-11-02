require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});
require('./server/index');

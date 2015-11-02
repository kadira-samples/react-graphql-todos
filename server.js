// Here we requiring the babel require hook.
// So, all the other files require after this will be transpiled.
require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});
require('./server/index');

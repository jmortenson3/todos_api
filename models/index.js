var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://user:password@ds235788.mlab.com:35788/todos');
mongoose.Promise = Promise;

// When require() 'ing a directory, the index.js file is automatically import.
// So in index.js, we're also requiring in the todo.js file.
module.exports.Todo = require('./todo');
var express = require('express');
var router = express.Router();
var db = require('../models');


exports.getTodos = function(req, res) {
  db.Todo.find()
  .then(function(todos) {
    res.json(todos);
  })
  .catch(function(err) {
    res.send(err);
  });
};

exports.createTodo = function(req, res) {
  db.Todo.create(req.body)
  .then(function(newTodo) {
    res.status(201).json(newTodo);
  })
  .catch(function(err) {
    res.send(err);
  });
};

exports.getTodo =  function(req, res) {
  db.Todo.findById(req.params.todoId)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.send(err);
  });
};

exports.updateTodo = function(req, res) {
  //responds with old data as default, unless new:true is set
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(data) {
    res.json(data);
  });
};

exports.deleteTodo = function(req, res) {
  db.Todo.remove({_id: req.params.todoId})
  .then(function() {
    res.json("Deleted")
  })
  .catch(function(err) {
    res.send(err);
  });
};

module.exports = exports;
$(document).ready(function() {
  $.getJSON('/api/todos')
  .then(function(data) {
    addTodos(data);
  })
  .catch(function(err) {
    console.log(err);
  });

  $('#todoInput').keypress(function(event) {
    if (event.which === 13) {
      createTodo();
    }
  });

  // the click even is on the ul.list because the spans are generated
  // dynamically.
  $('.list').on('click', 'span', function(event) {
    // when we click on the span, it won't also
    // trigger the event on the parent li
    event.stopPropagation();
    removeTodo($(this).parent());
  });

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
  });
});


function addTodos(todos) {
  //add todos to the page
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}


function addTodo(todo) {
  var newTodo = $('<li>' + todo.name + '<span>X</span></li>');
  // jquery holds id in memory
  newTodo.data('id', todo._id); 
  newTodo.data('completed', todo.completed);
  newTodo.addClass('task');
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}


function createTodo() {
  // send post to create todo item
  var $userInput = $('#todoInput').val();
  console.log($userInput);
  $.post('/api/todos', {name: $userInput})
  .then(function(data) {
    addTodo(data);
    $('#todoInput').val('');
  })
  .catch(function(err) {
    console.log(err);
  });
}

function removeTodo(todo) {
  var deleteUrl = '/api/todos/' + todo.data('id');
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data) {
    todo.remove();
  })
  .catch(function(err) {
    console.log(err);
  });
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(data) {
    todo.data('completed', isDone);
    todo.toggleClass('done');
  })
  .catch(function(err) {
    console.log(err);
  });
}

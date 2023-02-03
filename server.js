// import express
const express = require('express');

// call express
const app = express();

// port number
const port = 9999;

// Mock data
let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

// root
app.use(express.static('./Todo/todosV5/public'));
// payload json parsing
app.use(express.json());

// Server activation
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

/**
 * GET /api/todos
 */
app.get('/api/todos', (req, res) => {
  res.send(todos);
});

/**
 * POST /api/todos
 * {id, content, completed}
 */
app.post('/api/todos', (req, res) => {
  todos = [req.body, ...todos];
  res.send(todos);
});

/**
 * PATCH /api/todos/:id
 * {completed}
 */
app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));
  res.send(todos);
});

/**
 * PATCH /api/todos
 * {completed} or {content}
 */
app.patch('/api/todos', (req, res) => {
  const { completed } = req.params;

  todos = todos.map(todo => ({ ...todo, ...completed }));
  res.send(todos);
});

/**
 * DELETE /api/todos/:id
 */
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

/**
 * DELETE /api/todos?completed=false
 */
app.delete('/api/todos', (req, res) => {
  const completed = JSON.parse(req.query.completed);

  todos = todos.filter(todo => todo.completed !== completed);
  res.send(todos);
});

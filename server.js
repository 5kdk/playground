const express = require('express');

const app = express();
const port = 9999;

// Mock data
let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

// app.use(express.static('./Todo/todosV5/publicXML'));
app.use(express.static('./Todo/todosV5/publicPromise'));
// app.use(express.static('./Todo/todosV5/publicAsyncAwait'));
// app.use(express.static('./Todo/todosV5/publicAxios'));
app.use(express.json());

/**
 * GET /todos
 */
app.get('/api/todos', (req, res) => {
  res.send(todos);
});

/**
 * POST /todos
 * {id, content, completed}
 */
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todos = [newTodo, ...todos];

  res.send(todos);
});

/**
 * PATCH /todos
 * {completed}
 */
app.patch('/api/todos', (req, res) => {
  const { completed } = req.body;

  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

/**
 * PATCH /todos/:id
 * {completed} || {content}
 */
app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));
  res.send(todos);
});

/**
 * DELETE /todos/:id
 */
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

/**
 * DELETE /todos?completed=true
 */
app.delete('/api/todos', (req, res) => {
  const completed = JSON.parse(req.query.completed);

  todos = todos.filter(todo => todo.completed !== completed);
  res.send(todos);
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

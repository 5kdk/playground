const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false },
];

// const getMaxId = todos => (todos.length ? Math.max(...todos.map(todo => todo.id)) : 0);
// const getMaxId = todos => (todos.length === 0 ? 0 : Math.max(...todos.map(todo => todo.id)));
const getMaxId = todos => Math.max(...todos.map(todo => todo.id), 0);

console.log(getMaxId(todos)); // 3
console.log(getMaxId([])); // 0

export default getMaxId;

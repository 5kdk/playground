const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false },
];

const toggleCompletedAll = todos =>
  todos.map(todo => {
    todo.completed = !todo.completed;
    return todo;
  });

console.log(toggleCompletedAll(todos));
/*
[
  { id: 3, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: true }
]
*/
export default toggleCompletedAll;

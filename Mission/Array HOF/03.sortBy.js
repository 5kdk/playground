const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false },
];

const sortBy = (todos, key) => [...todos].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));

const sortedTodos1 = sortBy(todos, 'id');
console.log(sortedTodos1);
console.log(todos === sortedTodos1);
/*
[
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false }
]
false
*/

const sortedTodos2 = sortBy(todos, 'content');
console.log(sortedTodos2);
console.log(todos === sortedTodos2);
/*
[
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
false
*/

const sortedTodos3 = sortBy(todos, 'completed');
console.log(sortedTodos3);
console.log(todos === sortedTodos3);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true }
]
false
*/

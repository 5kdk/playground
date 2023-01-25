const toggleCompletedById = (todos, id) =>
  todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));

// const toggleCompletedById = (todos, id) =>
//   todos.map(todo => {
//     // todos를 직접 변경한다.
//     if (todo.id === id) todo.completed = !todo.completed;
//     return todo;
//   });

// console.log(toggleCompletedById(todos, 2));
// console.log(todos);

export default toggleCompletedById;

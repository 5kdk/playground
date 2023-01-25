const toggleCompletedAll = todos => todos.map(todo => ({ ...todo, completed: true }));

export default toggleCompletedAll;

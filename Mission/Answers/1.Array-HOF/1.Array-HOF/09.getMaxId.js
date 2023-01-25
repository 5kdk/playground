const getMaxId = todos => Math.max(...todos.map(todo => todo.id), 0);

export default getMaxId;

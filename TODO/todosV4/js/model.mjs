// eslint-disable-next-line import/extensions
import render from './view.mjs';

// eslint-disable-next-line import/no-mutable-exports
let state = {
  todos: [],
  editingTodos: [],
  filterId: 'all',
  isCheckedToggleAll: false,
  inputNewTodoValue: '',
};

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

export { state, setState };

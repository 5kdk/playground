import render from './render.js';
// import xhr from './utils/xhr.js';
// import promise from './utils/promise.js';

/**
 * 상태는 뷰에 영향을 주는 변화하는 데이터다.
 * 즉, 상태를 변경하면 리렌더링해 뷰를 변경한다.
 */
// eslint-disable-next-line import/no-mutable-exports
let state = {
  /**
   * todo 배열
   * 서버로부터 취득하는 서버 상태다.
   * @see https://tanstack.com/query/v4/docs/guides/does-this-replace-client-state
   */
  todos: [],
  /**
   * 일괄 토글 모드
   * 리렌더링 시 .toggle-all 요소도 새롭게 생성된다. 이때 checked가 false로 리셋된다.
   * 이를 방지하기 위해 랜더링 시 .toggle-all 요소에 checked 어트리뷰트를 설정한다.
   * @see https://ko.reactjs.org/docs/forms.html#controlled-components
   */
  isCheckedToggleAll: false,
  /**
   * .new-todo 요소에 입력된 문지열
   * 리렌더링 시 .new-todo 요소도 새롭게 생성된다. 이때 value가 ''로 리셋된다.
   * 이를 방지하기 위해 랜더링 시 .new-todo 요소에 value 어트리뷰트를 설정한다.
   */
  inputNewTodoValue: '',
  /**
   * 편집 모드인 todo id의 배열
   * 편집 모드인 li 요소에 editing 클래스를 설정할 때, focus 처리 시 필요하다.
   */
  editingTodoIds: [],
  /**
   * 현재 선택 중인 filter id ('all'|'completed'|'active')
   * currentFilterId 값이 변경되면 리렌더링되어야 한다.
   */
  currentFilterId: 'all',
};

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

// private
const generateNextId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const fetchTodos = async () => {
  // xhr.get('/todos', todos => {
  //   setState({ todos });
  // });

  // return promise
  //   .get('/todos')
  //   .then(todos => {
  //     setState({ todos });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.get('/todos');
    setState({ todos });
  } catch (e) {
    console.log(e);
  }
};

const toggleAllTodoCompleted = async () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;

  // xhr.patch('/todos', { completed: isCheckedToggleAll }, todos => {
  //   setState({
  //     todos,
  //     isCheckedToggleAll,
  //   });
  // });

  /**
   * toggleAllTodoCompleted 함수를 호출해 비동기 처리를 실행하고 setFocusTo 함수를 호출해야 한다.
   * 이를 위해 toggleAllTodoCompleted 함수는 반드시 Promise를 반환해야 한다.
   * toggleAllTodoCompleted().then(() => {
   *  setFocusTo(...);
   * });
   * // or
   * await toggleAllTodoCompleted();
   * setFocusTo(...);
   */
  // return promise
  //   .patch('/todos', { completed: isCheckedToggleAll })
  //   .then(todos => {
  //     setState({
  //       todos,
  //       isCheckedToggleAll,
  //     });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.patch('/todos', { completed: isCheckedToggleAll });
    setState({ todos, isCheckedToggleAll });
  } catch (e) {
    console.log(e);
  }
};

const changeInputNewTodoValue = value => {
  setState({ inputNewTodoValue: value });
};

const addTodo = async content => {
  const newTodo = { id: generateNextId(), content, completed: false };
  // xhr.post('/todos', newTodo, todos => {
  //   setState({ todos, inputNewTodoValue: '' });
  // });

  // return promise
  //   .post('/todos', newTodo)
  //   .then(todos => {
  //     setState({ todos, inputNewTodoValue: '' });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.post('/todos', newTodo);
    setState({ todos, inputNewTodoValue: '' });
  } catch (e) {
    console.log(e);
  }
};

const toggleTodoCompleted = async id => {
  // xhr.patch(
  //   `/todos/${id}`,
  //   { completed: !state.todos.find(todo => todo.id === +id).completed },
  //   todos => {
  //     setState({
  //       todos,
  //     });
  //   }
  // );

  // return promise
  //   .patch(`/todos/${id}`, {
  //     completed: !state.todos.find(todo => todo.id === +id).completed,
  //   })
  //   .then(todos => {
  //     setState({
  //       todos,
  //     });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.patch(`/todos/${id}`, {
      completed: !state.todos.find(todo => todo.id === +id).completed,
    });

    // toggleTodoCompleted 함수는 change 이벤트 핸들러가 호출한다. 따라서 state.todos 배열이 빈배열이 경우는 없다.
    const [firstTodo] = todos;

    setState({
      todos,
      /**
       * 모든 todo.completed가 true 또는 false로 변경되면 isCheckedToggleAll 상태도 변경한다.
       * 변경 이전의 state.todos가 아니라 변경된 todos를 사용해야 한다.
       */
      isCheckedToggleAll: todos.every(({ completed }) => completed === firstTodo.completed)
        ? firstTodo.completed
        : state.isCheckedToggleAll,
    });
  } catch (e) {
    console.log(e);
  }
};

const changeToEditMode = id => {
  setState({ editingTodoIds: [...state.editingTodoIds, +id] }); // 일반 모드 => 편집 모드
};

const updateTodoContent = async (id, content) => {
  // xhr.patch(`/todos/${id}`, { content }, todos => {
  //   setState({
  //     todos,
  //     editingTodoIds: state.editingTodoIds.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
  //   });
  // });

  // return promise
  //   .patch(`/todos/${id}`, { content })
  //   .then(todos => {
  //     setState({
  //       todos,
  //       editingTodoIds: state.editingTodoIds.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
  //     });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.patch(`/todos/${id}`, { content });
    setState({
      todos,
      editingTodoIds: state.editingTodoIds.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
    });
  } catch (e) {
    console.log(e);
  }
};

const removeTodo = async id => {
  // xhr.delete(`/todos/${id}`, todos => {
  //   setState({ todos });
  // });

  // return promise
  //   .delete(`/todos/${id}`)
  //   .then(todos => {
  //     setState({ todos });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.delete(`/todos/${id}`);
    setState({ todos });
  } catch (e) {
    console.log(e);
  }
};

const changeCurrentFilter = id => {
  setState({ currentFilterId: id });
};

const removeAllCompletedTodos = async () => {
  // xhr.delete('/todos?completed=true', todos => {
  //   setState({ todos });
  // });

  // return promise
  //   .delete('/todos?completed=true')
  //   .then(todos => {
  //     setState({ todos });
  //   })
  //   .catch(e => console.log(e));

  try {
    const { data: todos } = await axios.delete('/todos?completed=true');
    setState({ todos, isCheckedToggleAll: false });
  } catch (e) {
    console.log(e);
  }
};

export {
  state,
  fetchTodos,
  toggleAllTodoCompleted,
  changeInputNewTodoValue,
  addTodo,
  toggleTodoCompleted,
  changeToEditMode,
  updateTodoContent,
  removeTodo,
  changeCurrentFilter,
  removeAllCompletedTodos,
};

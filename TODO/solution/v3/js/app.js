/**
 * 상태는 뷰에 영향을 주는 변화하는 데이터다.
 * 즉, 상태를 변경하면 리렌더링해 뷰를 변경한다.
 */
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

const $root = document.getElementById('root');
const filterIds = ['all', 'active', 'completed'];

const render = () => {
  console.log('[STATE]', state);

  const { todos, isCheckedToggleAll, inputNewTodoValue, editingTodoIds, currentFilterId } = state;

  // active 상태인 todo의 갯수
  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  // completed 상태인 todo의 갯수
  const countCompletedTodos = todos.filter(todo => todo.completed).length;
  // 현재 선택 중인 currentFilterId를 기준으로 todos 배열을 필터링
  const filteredTodos = todos.filter(({ completed }) =>
    currentFilterId === 'completed' ? completed : currentFilterId === 'active' ? !completed : true
  );

  // prettier-ignore
  const domString = `
    <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" value="${inputNewTodoValue}" autofocus />
      </header>
      ${todos.length !== 0 ?
      `<section class="main">
        <!-- 체크박스가 on 상태가 되면 모든 todo를 checked 상태로 변경한다. -->
        <input type="checkbox" id="toggle-all" class="toggle-all" ${isCheckedToggleAll ? 'checked' : ''} />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
        ${filteredTodos.map(({ id, content, completed }) => `
          <li data-id="${id}" class="${editingTodoIds.includes(id) ? 'editing' : ''}">
            <div class="view">
              <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
              <label>${content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${content}" />
          </li>`).join('')}
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">${countActiveTodos} item${countActiveTodos > 1 ? 's' : ''} left</span>
        <ul class="filters">
          ${filterIds.map(filterId => `
          <li>
            <a id="${filterId}" class="${filterId === currentFilterId ? 'selected' : ''}" href="#">
              <!-- text-transform: capitalize; -->
              ${filterId[0].toUpperCase() + filterId.slice(1)}
            </a>
          </li>`).join('')}
        </ul>
        <!-- completed 상태인 todo가 없으면 hidden 클래스를 추가해 비표시한다. -->
        ${countCompletedTodos !== 0 ? `
        <button class="clear-completed">Clear completed</button>` : ''}
      </footer>` : ''}
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>`;

  /**
   * TODO: diffing & Reconciliation
   *
   * const $virtual = $root.cloneNode();
   * $virtual.innerHTML = domString;
   *
   * applyDiff($root, $virtual);
   */
  $root.innerHTML = domString;
};

/**
 * state handlers
 */
const setState = newState => {
  state = { ...state, ...newState };
  render();
};

const generateNextId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const fetchTodos = () => {
  // TODO: fetch todos
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

const toggleAllTodoCompleted = () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: isCheckedToggleAll })),
    isCheckedToggleAll,
  });
};

const changeInputNewTodoValue = value => {
  setState({ inputNewTodoValue: value });
};

const addTodo = content => {
  const newTodo = { id: generateNextId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos], inputNewTodoValue: '' });
};

const toggleTodoCompleted = id => {
  const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
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
};

const changeToEditMode = id => {
  setState({ editingTodoIds: [...state.editingTodoIds, +id] }); // 일반 모드 => 편집 모드
};

const updateTodoContent = (id, content) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, content } : todo)),
    editingTodoIds: state.editingTodoIds.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
  });
};

const removeTodo = id => {
  setState({ todos: state.todos.filter(todo => todo.id !== +id) });
};

const changeCurrentFilter = id => {
  setState({ currentFilterId: id });
};

const removeAllCompletedTodos = () => {
  setState({ todos: state.todos.filter(todo => !todo.completed), isCheckedToggleAll: false });
};

/**
 * input 요소의 focus를 설정한다.
 * input 요소에 텍스트가 존재하는 경우 텍스트 앞에 cursor가 위치한다.
 * HTMLInputElement#setSelectionRange 메서드를 사용해 텍스트의 가장 뒤로 cursor position을 재조정한다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
 */
const setFocusTo = $inputField => {
  const { length } = $inputField.value;
  $inputField.focus();
  $inputField.setSelectionRange(length, length);
};

/**
 * Event handlers
 */
// initial rendering
window.addEventListener('DOMContentLoaded', fetchTodos);

// toggle all todo completed
$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle-all')) return;

  toggleAllTodoCompleted();

  /**
   * .new-todo 요소는 setState에 의해 새롭게 생성되어 렌더링되므로 focus를 잃는 문제가 발생한다.
   * .new-todo 요소에 autofocus 어트리뷰트를 설정했다. 하지만 autofocus 어트리뷰트는 페이지 로드시에만 정상적으로 동작한다.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   *
   * setFocusTo 함수를 사용해 새롭게 생성된 .new-todo 요소를 취득해 focus를 되살린다.
   * 이 문제의 근본적인 해결 방법은 .new-todo 요소를 리렌더링하지 않고 value 프로퍼티만 변경시키는 것이다.
   */
  setFocusTo(document.querySelector('.new-todo'));
});

/**
 * .new-todo 요소에 텍스트를 입력한 상태에서 리렌더링이 발생(예를 들어 completed 체크)하면
 * .new-todo 요소도 리렌더링되므로 .new-todo 요소의 텍스트와 focus가 사라진다.
 * 이를 방지하기 위해 .new-todo 요소에 입력된 텍스트를 상태로 관리한다.
 */
/**
 * TODO: 한글 자모 분리 현상이 발생
 * input 이벤트를 change 이벤트로 변경하면 동작하기는 하지만 한글 조합이 완성되지 않은 상태에서 클릭을 두번해야 하는 등 불완전하다.
 * change 이벤트는 input 이벤트와는 달리 HTML 요소가 포커스를 잃었을 때 사용자 입력이 종료되었다고 인식하여 발생한다.
 * 즉, 사용자가 입력을 하고 있을 때는 input 이벤트가 발생하고 사용자 입력이 종료되어 값이 변경되면 change 이벤트가 발생한다.
 */
$root.addEventListener('change', e => {
  if (!e.target.matches('.new-todo')) return;

  changeInputNewTodoValue(e.target.value);
  setFocusTo(document.querySelector('.new-todo'));
});

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();
  if (content) {
    addTodo(content);
    setFocusTo(document.querySelector('.new-todo'));
  }
});

// toggle todo completed
$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle')) return;

  toggleTodoCompleted(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// edit mode
// TODO: 리렌더링시 편집중인 텍스트가 유지되지 않는다.
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;

  const { id } = e.target.closest('li').dataset;
  changeToEditMode(id);
  setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
});

// update todo content
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.edit')) return;

  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);

  // setFocusTo(document.querySelector('.new-todo'));

  // focus 순서 고려
  if (state.editingTodoIds.length === 0) {
    setFocusTo(document.querySelector('.new-todo'));
  } else {
    const id = state.editingTodoIds.at(-1);
    setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
  }
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.matches('.destroy')) return;

  removeTodo(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;

  changeCurrentFilter(e.target.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// remove all completed todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.clear-completed')) return;

  removeAllCompletedTodos();
  setFocusTo(document.querySelector('.new-todo'));
});

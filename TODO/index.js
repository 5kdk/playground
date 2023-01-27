const $todos = document.querySelector('.todos');
const $disp = document.querySelector('.disp');

$todos.addEventListener('click', e => {
  $disp.textContent = e.target.textContent;
});

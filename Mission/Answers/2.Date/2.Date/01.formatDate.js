/** @type {(n: number) => string} */
const format = n => (n + '').padStart(2, 0);
// const format = n => (n < 10 ? '0' + n : '' + n);

/** @type {(date: Date) => string} */
const formatDate = date =>
  `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;

export default formatDate;

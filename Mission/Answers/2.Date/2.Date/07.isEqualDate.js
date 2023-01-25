// TODO: date1, date2가 Date 객체인지 확인
// const getType = target => Object.prototype.toString.call(target).slice(8, -1);
// const isDate = target => getType(target) === 'Date';

// 시간이 같지 않아도 true
// const isEqualDate = (date1, date2) => date1 - date2 === 0;
// const isEqualDate = (date1, date2) => date1.getTime() === date2.getTime();

// 날짜가 달라도 24시간 차이가 나지 않으면 true
// const isEqualDate = (date1, date2) =>
//   Math.abs(date1.getTime() - date2.getTime()) < 24 * 60 * 60 * 1000;
// const isEqualDate = (date1, date2) => Math.abs(+date1 - +date2) < 24 * 60 * 60 * 1000;

// const isEqualDate = (date1, date2) =>
//   date1.getFullYear() === date2.getFullYear() &&
//   date1.getMonth() === date2.getMonth() &&
//   date1.getDate() === date2.getDate();

/** @type {(date1: Date, date2: Date) => boolean} */
const isEqualDate = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export default isEqualDate;

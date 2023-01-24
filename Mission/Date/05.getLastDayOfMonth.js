/** @type {(year: number, month: number) => number} */
const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDay();

// 2022년 4월 말일은 토요일
console.log(getLastDayOfMonth(2022, 3)); // 6

// 2022년 7월 말일은 일요일
console.log(getLastDayOfMonth(2022, 6)); // 0

export default getLastDayOfMonth;

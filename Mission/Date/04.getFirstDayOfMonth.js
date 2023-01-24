/** @type {(year: number, month: number) => number} */
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

// 2022년 1월 1일은 토요일
console.log(getFirstDayOfMonth(2022, 0)); // 6

// 2022년 5월 1일은 일요일
console.log(getFirstDayOfMonth(2022, 4)); // 0

export default getFirstDayOfMonth;

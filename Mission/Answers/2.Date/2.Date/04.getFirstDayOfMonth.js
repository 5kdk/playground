// Date.prototype.getDay => Date 객체의 요일(0 ~ 6)을 나타내는 정수를 반환한다. 0은 일요일이고 6은 토요일이다.

/** @type {(year: number, month: number) => number} */
const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();
// const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

export default getFirstDayOfMonth;

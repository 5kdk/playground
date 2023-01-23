/** @type {(year: number, month: number) => number} */
/* 
const getLastDateOfMonth = (year, month) => {
  const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const checkLeapYear = year =>
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
  if(checkLeapYear(year)) lastDate[1] = 29
  return lastDate[month];
};
 */

const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// 2021년 1월의 마지막 날은 31일
console.log(getLastDateOfMonth(2021, 0)); // 31

// 2021년 2월의 마지막 날은 28일
console.log(getLastDateOfMonth(2021, 1)); // 28

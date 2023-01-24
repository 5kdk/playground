/** @type {(date1: Date, date2: Date) => boolean} */

/* 
const isEqualDate = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();
 */

const isEqualDate = (date1, date2) => Math.abs(date1 - date2) < 86400000 && date1.getDate() === date2.getDate();
// 1000 * 60 * 60 * 24 === 86400000

console.log(isEqualDate(new Date('2021/07/24'), new Date('2021/07/24'))); // true
console.log(isEqualDate(new Date('2021/07/24/00:00:00'), new Date('2021/07/24/23:59:59'))); // true
console.log(isEqualDate(new Date('2021/07/24/23:59:59'), new Date('2021/07/25/00:00:00'))); // false
console.log(isEqualDate(new Date('2021/07/24'), new Date('2021/07/25'))); // false
console.log(isEqualDate(new Date('2021/07/24'), new Date('2022/07/2'))); // false

export default isEqualDate;

/** @type {(from: Date, to: Date) => number} */
const diffDays = (from, to) => (to - from) / 1000 / 60 / 60 / 24;

console.log(diffDays(new Date('2022/01/01'), new Date('2022/12/31'))); // 364

export default diffDays;

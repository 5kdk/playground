const ONE_DAY = 24 * 60 * 60 * 1000;

/** @type {(from: Date, to: Date) => number} */
const diffDays = (from, to) => Math.abs(to - from) / ONE_DAY;

export default diffDays;

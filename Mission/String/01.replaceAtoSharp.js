/** @type {(str: string) => string} */
const replaceAtoSharp = str => str.replace(/A/g, '#');
// const replaceAtoSharp = str => str.replaceAll('A', '#');

replaceAtoSharp('BANANA'); // => B#N#N#

export default replaceAtoSharp;

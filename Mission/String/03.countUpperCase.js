/** @type {(str: string) => number} */
const countUpperCase = str => str.match(/[A-Z]/g).length;

countUpperCase('KoreaTimeGood'); // => 3

export default countUpperCase;

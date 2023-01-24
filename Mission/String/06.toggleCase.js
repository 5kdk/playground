/** @type {(str: string) => string} */
const toggleCase = str => str.replace(/./g, word => (/[A-Z]/.test(word) ? word.toLowerCase() : word.toUpperCase()));

toggleCase('StuDY'); // => 'sTUdy'

export default toggleCase;

/** @type {(str: string, target: string) => number} */
const count = (str, target) => str.match(new RegExp(target, 'g')).length;

count('COMPUTERPROGRAMMING', 'R'); // => 3

export default count;

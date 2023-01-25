/** @type {(str: string, target: string) => number} */
const count = (str, target) => (str.match(new RegExp(target, 'g')) ?? []).length;

console.log(count('COMPUTERPROGRAMMING', 'R')); // => 3
console.log(count('zzzzz', 'R')); 

// export default count;

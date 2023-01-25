/** @type {(str: string) => number} */
const countUpperCase = str => str.match(/[A-Z]/g).length;

// const countUpperCase = str => [...str].filter(c => c === c.toUpperCase()).length;

// const countUpperCase = str => {
//   let res = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === str[i].toUpperCase()) res += 1;
//   }
//   return res;
// };

export default countUpperCase;

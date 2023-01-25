/**
 * 1. A를 #으로
 * 영문 대문자로 이루어진 문자열이 입력되면 문자열에 포함된 ‘A'를 모두 ’#‘으로 바꾸어 출력하는 함수를 작성하세요.
 *
 * replaceAtoSharp('BANANA'); // => B#N#N#
 */

// String#replaceAll => ECMAScript 2021(ES12)
// const replaceAtoSharp = str => str.replaceAll('A', '#');

/** @type {(str: string) => string} */
const replaceAtoSharp = str => str.replace(/A/g, '#');

// const replaceAtoSharp = str => {
//   let res = '';
//   for (let i = 0; i < str.length; i++) {
//     // if (str[i] === 'A') res += '#';
//     // else res += str[i];

//     res += str[i] === 'A' ? '#' : str[i];
//   }
//   return res;
// };

export default replaceAtoSharp;

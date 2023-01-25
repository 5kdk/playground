/**
 * 콜백함수의 매개변수 _, lowerCase, upperCase에는 다음과 같이 정규식에 의해 캡쳐된 문자열이 전달된다.
 *
 * 'StuDY' =>
 * ① S undefined S
 * ② tu tu undefined
 * ③ DY undefined DY
 */

/** @type {(str: string) => string} */
const toggleCase = str =>
  str.replace(/([a-z]+)|([A-Z]+)/g, (_, lowerCase, upperCase) =>
    lowerCase ? lowerCase.toUpperCase() : upperCase.toLowerCase()
  );

// const toggleCase = str =>
//   [...str]
//     .map(c => {
//       const upperCase = c.toUpperCase();
//       const lowerCase = c.toLowerCase();

//       return c === upperCase ? lowerCase : upperCase;
//     })
//     .join('');

// const toggleCase = str => {
//   let res = '';

//   for (let i = 0; i < str.length; i++) {
//     const upperCase = str[i].toUpperCase();
//     const lowerCase = str[i].toLowerCase();

//     res += str[i] === upperCase ? lowerCase : upperCase;
//   }

//   return res;
// };

export default toggleCase;

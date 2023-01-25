/** @type {(str: string) => boolean} */
// 48ms
const isPalindrome = str => {
  const temp = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return temp === [...temp].reverse().join('');
};

// 48ms: reverse().join('')과 속도면에서 별 차이가 없다.
// const isPalindrome = str => {
//   const temp = str.toLowerCase().replace(/[^a-z0-9]/gi, '');

//   let [start, end] = [0, temp.length - 1];

//   while (start < end) {
//     if (temp[start] !== temp[end]) return false;
//     [start, end] = [start + 1, end - 1];
//   }

//   return true;
// };

export default isPalindrome;

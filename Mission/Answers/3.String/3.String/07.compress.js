/**
 * 역참조(back-references)
 * \1은 이전에 일치한 그룹()을 의미한다. 따라서 정규표현식 /(.)\1+/g는 이전에 일치한 어떤 문자가 1번 이상 반복될 때 매칭한다.
 * compress('ABBCCCE')의 경우, String#replace의 콜백의 매개변수 match에는 'BB', 'CCC'가 순차적으로 전달된다.
 * @see https://regexr.com/63hhf
 */
/** @type { (str: string) => string } */
// 50ms
const compress = str => str.replace(/(.)\1+/g, match => match[0] + match.length);
// const compress = str => str.replace(/(.)\1+/g, ({ 0: first, length }) => first + length);

// 50ms
// const compress = str => {
//   let cnt = 1;
//   let res = '';

//   for (let i = 0; i < str.length; i++) {
//     // 마지막 순회에 str[i + 1]은 언제나 undefined
//     if (str[i] === str[i + 1]) cnt += 1;
//     else {
//       res += str[i] + (cnt === 1 ? '' : cnt);
//       cnt = 1;
//     }
//   }

//   return res;
// };

export default compress;

// String#match는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.
// RegExp#exec는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.
/** @type {(str: string, target: string) => number} */
const count = (str, target) => str.match(new RegExp(target, 'g')).length;

// const count = (str, target) => [...str].filter(c => c === target).length;

// const count = (str, target) => {
//   let res = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === target) res += 1;
//   }
//   return res;
// };

export default count;

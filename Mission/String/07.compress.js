/** @type { (str: string) => string } */
const compress = str => str.replace(/(.)\1+/g, match => match[0] + match.length);

// \n은 검색, 치환을 위한 n번째 하부식(부분식)
// (.)\1+:  임의의 문자열을 찾고 그 뒤에 \1+로 첫번쨰 부분식이 다시 1번 이상 있는 것을 찾음

compress('ABBCCCE'); // => AB2C3E

export default compress;

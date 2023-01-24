/** @type {(str: string) => boolean} */
const isPalindrome = str => {
  const lowerCaseStr = str.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();

  return lowerCaseStr === lowerCaseStr.split('').reverse().join('');
};
isPalindrome('A man, a plan, a canal: Panama'); // => true
isPalindrome('race a car'); // => false

export default isPalindrome;

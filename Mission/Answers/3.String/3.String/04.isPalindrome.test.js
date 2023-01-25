import isPalindrome from './04.isPalindrome';

describe('isPalindrome', () => {
  test(`문자열을 인수로 전달받아 문자열이 회문인지 확인한다. 영문자와 숫자만 고려하고 대소문자는 무시한다`, () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(isPalindrome('race a car')).toBe(false);
  });
});

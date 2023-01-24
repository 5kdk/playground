import recommendNewId from './05.recommendNewId';

describe('recommendNewId', () => {
  test(`신규 아이디 추천 => https://programmers.co.kr/learn/courses/30/lessons/72410?language=javascript`, () => {
    expect(recommendNewId('...!@BaT#*..y.abcdefghijklm')).toBe('bat.y.abcdefghi');
    expect(recommendNewId('z-+.^.')).toBe('z--');
    expect(recommendNewId('=.=')).toBe('aaa');
    expect(recommendNewId('123_.def')).toBe('123_.def');
    expect(recommendNewId('abcdefghijklmn.p')).toBe('abcdefghijklmn');
  });
});

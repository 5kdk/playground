import getDay from './02.getDay';

describe('getDay', () => {
  test('date 문자열을 인수로 전달받아 해당 일의 요일을 문자열로 반환한다.', () => {
    expect(getDay('2021/07/24')).toBe('토요일');
    expect(getDay('2021-07-25')).toBe('일요일');
    expect(getDay('2021/07/26')).toBe('월요일');
  });
});

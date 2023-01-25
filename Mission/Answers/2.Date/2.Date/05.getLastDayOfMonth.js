// Date 생성자 함수의 2번째 매개변수(월)에 월을 나타내는 정수(0~6)에 1을 더한 값을 전달하면 익월을 가리키는 Date 객체를 반환한다.
// new Date(2021, 0 + 1) => 2021/2/1
// Date 생성자 함수의 3번째 매개변수(날짜)에 0을 전달하면 전월 말일을 가리키는 Date 객체를 반환한다.
// new Date(2021, 0 + 1, 0) => 2021/1/31

/** @type {(year: number, month: number) => number} */
const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0).getDay();

export default getLastDayOfMonth;

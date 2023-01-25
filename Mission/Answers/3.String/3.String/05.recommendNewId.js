/* eslint-disable camelcase */
/**
 * 5. 신규 아이디 추천
 * [programmers > 2021 KAKAO BLIND RECRUITMENT > 신규 아이디 추천](https://programmers.co.kr/learn/courses/30/lessons/72410?language=javascript)
 */
function recommendNewId(new_id) {
  const recommended = new_id
    .toLowerCase() // 1단계
    .replace(/[^\w-.]+/g, '') // 2단계
    .replace(/\.{2,}/g, '.') // 3단계
    .replace(/^\.|\.$/g, '') // 4단계
    .replace(/^$/g, 'a') // 5단계. ^$는 빈문자열에 매칭한다.
    .slice(0, 15)
    .replace(/\.$/g, ''); // 6단계

  // 7단계
  // const { length } = recommended;
  // // length가 1이면 2번, length가 2이면 1번 repeat
  // return length <= 2 ? recommended + recommended[length - 1].repeat(3 - length) : recommended;

  // 7단계
  // recommended의 길이가 3이 될 때까지 recommended의 마지막 문자를 끝에 추가
  return recommended.padEnd(3, recommended.at(-1)); // programmers에서 실행하면 에러!
  // return recommended.padEnd(3, recommended[recommended.length - 1]);
}

export default recommendNewId;

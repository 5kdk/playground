class Stack {
  #elements = [];

  /**
   * 인수로 배열을 전달받아 stack을 생성한다.
   * - 인수를 전달하지 않으면 빈 stack을 생성한다.
   * - stack 객체는 이터러블이다.
   * - 인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.
   * @param {array} [elements=[]]
   */
  constructor(elements = []) {
    if (!Array.isArray(elements)) throw new TypeError(`${elements} is not an array`);
    this.#elements = [...elements];
  }

  /**
   * 인수로 배열을 전달받아 stack을 생성한다.
   * - 인수를 전달하지 않으면 빈 stack을 생성한다.
   * - stack 객체는 이터러블이다.
   * - 인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.
   * @public
   * @static
   * @param {array} [elements]
   * @return {Stack}
   */
  static from(elements) {
    return new Stack(elements);
  }

  /**
   * 인수로 여러 개의 요소를 전달받아 stack을 생성한다.
   * - 인수를 전달하지 않으면 빈 stack을 생성한다.
   * - stack 객체는 이터러블이다.
   * @public
   * @static
   * @param  {...any} elements
   * @returns {Stack}
   */
  static of(...elements) {
    return new Stack(elements);
  }

  /**
   * Stack의 인스턴스는 이터레이터를 반환히는 Symbol.iterator 메서드를 상속받으므로 이터러블이다.
   * 이터러블인 LinkedList의 인스턴스는 for...of 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
   */
  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]();
  }

  /**
   * stack 요소의 갯수를 반환한다.
   * @public
   * @returns {number}
   */
  get size() {
    return this.#elements.length;
  }

  /**
   * stack의 가장 후미에 요소를 추가하고 변경된 stack을 반환한다.
   * - 인수를 전달하지 않으면 요소를 추가하지 않는다.
   * - 외부에서 전달받은 배열을 변경시키지 않는다.
   * @public
   * @param {any} [element]
   * @returns {Stack}
   */
  push(element) {
    // argument passed
    if (arguments.length !== 0) this.#elements.push(element);
    return this;
  }

  /**
   * stack에서 가장 나중에 추가된 요소를 제거하고 변경된 stack을 반환한다.
   * - 외부에서 전달받은 배열을 변경시키지 않는다.
   * @public
   * @returns {Stack}
   */
  pop() {
    this.#elements.pop();
    return this;
  }

  /**
   * 가장 나중에 추가된 stack 요소를 반환한다.
   * - stack을 직접 변경하지 않는다.
   * - stack이 비어있으면 null을 반환한다.
   * @public
   * @returns {any}
   */
  peek() {
    return this.isEmpty() ? null : this.#elements.at(-1);
  }

  /**
   * stack이 비어있는지 확인한다.
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * stack의 복사본(shallow copy)을 반환한다.
   * - 원본 stack이 변경되어도 복사본 stack은 변경되지 않는다.
   * @public
   * @return {Stack}
   */
  clone() {
    return new Stack(this.#elements);
  }

  /**
   * stack의 모든 요소를 제거하고 변경된 stack을 반환한다.
   * @public
   * @returns {Stack}
   */
  clear() {
    this.#elements = [];
    return this;
  }
}

export default Stack;

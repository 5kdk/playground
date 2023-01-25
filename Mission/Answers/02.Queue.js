class Queue {
  #elements = [];

  /**
   * 인수로 배열을 전달받아 배열로 queue를 생성한다.
   * ✓ 인수를 전달하지 않으면 빈 queue를 생성한다.
   * ✓ 인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.
   * @param {array} [elements=[]]
   */
  constructor(elements = []) {
    if (!Array.isArray(elements)) throw new TypeError(`${elements} is not an array`);
    this.#elements = [...elements];
  }

  /**
   * 인수로 배열을 전달받아 배열로 queue를 생성한다.
   * ✓ 인수를 전달하지 않으면 빈 queue를 생성한다.
   * ✓ 인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.
   * @public
   * @static
   * @param {array} [elements]
   * @return {Queue}
   */
  static from(elements) {
    return new Queue(elements);
  }

  /**
   * 인수로 여러 개의 요소를 전달받아 queue를 생성한다.
   * ✓ 인수를 전달하지 않으면 빈 queue를 생성한다.
   * @public
   * @static
   * @param  {...any} elements
   * @returns {Queue}
   */
  static of(...elements) {
    return new Queue(elements);
  }

  /**
   * Queue의 인스턴스는 이터레이터를 반환히는 Symbol.iterator 메서드를 상속받으므로 이터러블이다.
   * 이터러블인 LinkedList의 인스턴스는 for...of 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
   */
  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]();
  }

  /**
   * queue의 길이를 반환한다.
   * @public
   * @returns {number}
   */
  get size() {
    return this.#elements.length;
  }

  /**
   * queue의 가장 후미에 요소를 추가하고 변경된 queue를 반환한다.
   * - 인수를 전달하지 않으면 요소를 추가하지 않는다.
   * - 외부에서 전달받은 배열을 변경시키지 않는다.
   * @public
   * @param {any} [element]
   * @returns {Queue}
   */
  enqueue(element) {
    if (arguments.length !== 0) this.#elements.push(element);
    return this;
  }

  /**
   * queue에서 가장 나중에 추가된 요소를 제거하고 변경된 queue를 반환한다.
   * - 외부에서 전달받은 배열을 변경시키지 않는다.
   * @public
   * @returns {Queue}
   */
  dequeue() {
    this.#elements.shift();
    return this;
  }

  /**
   * 가장 먼저 추가된 queue 요소를 반환한다.
   * ✓ queue를 직접 변경하지 않는다.
   * ✓ queue가 비어있는 경우 null을 반환한다.
   * @public
   * @returns {any}
   */
  peek() {
    return this.isEmpty() ? null : this.#elements[0];
  }

  /**
   * queue가 비어있는지 확인한다.
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * queue의 복사본(shallow copy)을 반환한다.
   * - 원본 queue가 변경되어도 복사본 queue는 변경되지 않는다.
   * @public
   * @return {Queue}
   */
  clone() {
    return new Queue([...this.#elements]);
  }

  /**
   * queue의 모든 요소를 제거하고 변경된 queue를 반환한다.
   * @public
   * @returns {Queue}
   */
  clear() {
    this.#elements = [];
    return this;
  }
}

export default Queue;

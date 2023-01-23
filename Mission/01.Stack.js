class Stack {
  #elements = [];

  constructor(elements = []) {
    if (!Array.isArray(elements)) throw new TypeError(`${elements} is not an array`);
    // TODO
    this.#elements = [...elements];
  }

  static from(elements) {
    if (!Array.isArray(elements)) throw new TypeError(`${elements} is not an array`);

    return Stack(elements);
  }

  static of(...elements) {
    return new Stack(elements);
  }

  get size() {
    return this.#elements.length;
  }

  push(element) {
    if (arguments.length > 0) this.#elements.push(element);
    return this;
  }

  pop() {
    this.#elements.pop();
    return this
  }

  peek() {}

  isEmpty() {}

  clone() {}

  clear() {}
}

const stack = new Stack(1);
console.log(stack);

/* // 인수로 배열을 전달받아 배열로 stack을 생성한다.
console.log(Stack.from([10, 3, 8, 40, 1]));

// 인수를 전달하지 않으면 빈 stack을 생성한다.
console.log(Stack.from());

// stack 객체는 이터러블이다.
console.log([...Stack.from([10, 3, 8, 40, 1])]); // [10, 3, 8, 40, 1]

// 배열 이외의 값을 전달하면 에러를 발생시킨다.
console.log(Stack.from(1)); // TypeError: 1 is not an array
 */

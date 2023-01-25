class Stack {
  #elements = [];

  constructor(elements = []) {
    if (!Array.isArray(elements)) throw new TypeError(`${elements} is not an array`);

    this.#elements = [...elements];
  }

  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]();
  }

  static from(elements) {
    return new Stack(elements);
  }

  static of(...elements) {
    return new Stack(elements);
  }

  get size() {
    return this.#elements.length;
  }

  push(element) {
    if (arguments.length) this.#elements.push(element);
    return this;
  }

  pop() {
    this.#elements.pop();
    return this;
  }

  peek() {
    return this.isEmpty() ? null : this.#elements.at(-1);
  }

  isEmpty() {
    return this.size === 0;
  }

  clone() {
    return new Stack(this.#elements);
  }

  clear() {
    this.#elements = [];
    return this;
  }
}

export default Stack;

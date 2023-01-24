class Stack {
  #elements = [];

  constructor(elements = []) {
    if (!Array.isArray(elements)) {
      throw new TypeError(`${elements} is not an array`);
    }
    this.#elements = [...elements];
  }

  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = this.#elements.length;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur, done: cur >= max };
      },
    };
  }

  static from(elements) {
    if (!Array.isArray(elements)) {
      throw new TypeError(`${elements} is not an array`);
    }

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
    return this;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.#elements[this.#elements.length - 1];
  }

  isEmpty() {
    return this.#elements.length === 0;
  }

  clone() {
    return [...this.#elements];
  }

  clear() {
    this.#elements = [];
  }
}

export default Stack;

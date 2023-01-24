class Stack {
  #elements = [];

  #size = 0;

  constructor(elements = []) {
    if (!Array.isArray(elements)) {
      throw new TypeError(`${elements} is not an array`);
    }
    this.#elements = [...elements];
    this.#size = elements.length;
  }

  [Symbol.iterator]() {
    const that = this;
    that.#size = -1;
    return {
      next() {
        that.#size += 1;
        return { value: that.#elements[that.#size], done: that.#size >= that.#elements.length };
      },
    };
  }

  static from(elements = []) {
    if (!Array.isArray(elements)) {
      throw new TypeError(`${elements} is not an array`);
    }
    return new Stack(elements);
  }

  static of(...elements) {
    return new Stack(elements);
  }

  get size() {
    return this.#size
  }

  push(element) {
    if (arguments.length) {
      this.#elements.push(element);
      this.#size += arguments.length;
    }
    return this;
  }

  pop() {
    this.#elements.pop();
    this.#size -= 1;
    return this;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.#elements[this.#size - 1];
  }

  isEmpty() {
    return this.#size === 0;
  }

  clone() {
    return new Stack(this.#elements);
  }

  clear() {
    this.#elements = [];
    this.#size = 0;
    return this;
  }
}

export default Stack;

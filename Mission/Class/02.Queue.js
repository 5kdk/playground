class Queue {
  #elements = [];

  constructor(elements = []) {
    if (!Array.isArray(elements)) throw new TypeError(`${elements} is not an array`);

    this.#elements = [...elements];
  }

  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]();
  }

  static from(elements) {
    return new Queue(elements);
  }

  static of(...elements) {
    return new Queue(elements);
  }

  get size() {
    return this.#elements.length;
  }

  enqueue(element) {
    if (arguments.length) this.#elements.push(element);
    return this;
  }

  dequeue() {
    this.#elements.shift();
    return this;
  }

  peek() {
    return this.isEmpty() ? null : this.#elements.at(0);
  }

  isEmpty() {
    return this.size === 0;
  }

  clone() {
    return new Queue(this.#elements);
  }

  clear() {
    this.#elements = [];
    return this;
  }
}

export default Queue;

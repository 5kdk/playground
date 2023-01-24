class Queue {
  #elements = [];

  constructor(elements = []) {
    if (!Array.isArray(elements)) {
      throw new TypeError('Not an array!');
    }
    this.#elements = [...elements];
  }

  static from(elements) {
    if (!Array.isArray(elements)) {
      throw new TypeError(`${elements} is not an array`);
    }

    return Queue(elements);
  }

  static of(...elements) {
    return new Queue(elements);
  }

  get size() {
    return this.#elements.length;
  }

  enqueue(element) {
    return this.#elements.push(element);
  }

  dequeue() {
    return this.#elements.shift();
  }

  peek() {
    return this.#elements[0];
  }

  isEmpty() {
    return !this.#elements.length
  }

  clone() {
    
  }
  
  entries() {
    return [...this.#elements];
  }
}

export default Queue;

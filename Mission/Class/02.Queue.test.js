import Queue from './02.Queue';

describe('Queue', () => {
  describe('constructor', () => {
    test('인수로 배열을 전달받아 배열로 queue를 생성한다.', () => {
      expect([...new Queue([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test('인수를 전달하지 않으면 빈 queue를 생성한다.', () => {
      expect([...new Queue()]).toEqual([]);
    });

    test('queue 객체는 이터러블이다.', () => {
      expect([...new Queue([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test('인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.', () => {
      expect(() => new Queue(1)).toThrow(new TypeError('1 is not an array'));
      expect(() => new Queue(true)).toThrow(new TypeError('true is not an array'));
      expect(() => new Queue({})).toThrow(new TypeError('[object Object] is not an array'));
    });
  });

  describe('Queue.from', () => {
    test('인수로 배열을 전달받아 queue를 생성한다.', () => {
      expect([...Queue.from([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test('인수를 전달하지 않으면 빈 queue를 생성한다.', () => {
      expect([...Queue.from()]).toEqual([]);
    });

    test('queue 객체는 이터러블이다.', () => {
      expect([...Queue.from([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test('인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.', () => {
      expect(() => Queue.from(1)).toThrow(new TypeError('1 is not an array'));
      expect(() => Queue.from(true)).toThrow(new TypeError('true is not an array'));
      expect(() => Queue.from({})).toThrow(new TypeError('[object Object] is not an array'));
    });
  });

  describe('Queue.of', () => {
    test('인수로 여러 개의 요소를 전달받아 queue를 생성한다.', () => {
      expect([...Queue.of(10, 3, 8, 40, 1)]).toEqual([10, 3, 8, 40, 1]);
    });

    test('인수를 전달하지 않으면 빈 queue를 생성한다.', () => {
      expect([...Queue.of()]).toEqual([]);
    });

    test('queue 객체는 이터러블이다.', () => {
      expect([...Queue.of(10, 3, 8, 40, 1)]).toEqual([10, 3, 8, 40, 1]);
    });
  });

  describe('Queue.prototype.size', () => {
    test('queue의 길이를 반환한다.', () => {
      expect(new Queue().size).toBe(0);
      expect(new Queue([10, 3, 8, 40, 1]).size).toBe(5);
    });

    test('strict mode에서 size에 값을 할당하면 에러가 발생한다.', () => {
      expect(() => {
        Queue.from().size = 100;
      }).toThrow(new TypeError('Cannot set property size of #<Queue> which has only a getter'));
    });
  });

  describe('Queue.prototype.enqueue', () => {
    test('queue의 가장 후미에 요소를 추가하고 변경된 queue를 반환한다.', () => {
      const queue = new Queue([1, 2]).enqueue(3);
      expect([...queue]).toEqual([1, 2, 3]);

      queue.enqueue(4).enqueue('a').enqueue().enqueue(undefined).enqueue(null);
      expect([...queue]).toEqual([1, 2, 3, 4, 'a', undefined, null]);
    });

    test('인수를 전달하지 않으면 요소를 추가하지 않는다.', () => {
      const queue = new Queue([1, 2]).enqueue();

      expect(queue.size).toBe(2);
      expect([...queue]).toEqual([1, 2]);
    });

    test('외부에서 전달받은 배열을 변경시키지 않는다.', () => {
      const origin = [1, 2, 3];
      new Queue(origin).enqueue(4);

      expect(origin).toEqual([1, 2, 3]);
    });
  });

  describe('Queue.prototype.dequeue', () => {
    test('queue에서 가장 먼저 추가된 요소를 제거하고 변경된 queue를 반환한다.', () => {
      const queue = new Queue([1, 2, 3]).dequeue();
      expect([...queue]).toEqual([2, 3]);

      queue.dequeue().dequeue();
      expect([...queue]).toEqual([]);
    });

    test('외부에서 전달받은 배열을 변경시키지 않는다.', () => {
      const origin = [1, 2, 3];
      new Queue(origin).dequeue();

      expect(origin).toEqual([1, 2, 3]);
    });
  });

  describe('Queue.prototype.peek', () => {
    test('가장 먼저 추가된 queue 요소를 반환한다.', () => {
      const queue = new Queue([1, 2]);
      expect(queue.peek()).toBe(1);
    });

    test('queue를 직접 변경하지 않는다.', () => {
      const queue = new Queue([1, 2]);
      queue.peek();

      expect([...queue]).toEqual([1, 2]);
    });

    test('queue이 비어있는 경우 null을 반환한다.', () => {
      const empty = new Queue();
      expect(empty.peek()).toBe(null);
    });
  });

  describe('Queue.prototype.isEmpty', () => {
    test('queue이 비어있는지 확인한다.', () => {
      const queue = new Queue([1]);

      expect(queue.isEmpty()).toBe(false);
      expect(queue.dequeue().isEmpty()).toBe(true);
    });
  });

  describe('Queue.prototype.clone', () => {
    const queue = new Queue([{ id: 1 }, { id: 2 }]);
    const clone = queue.clone();

    test('queue의 복사본(shallow copy)을 반환한다.', () => {
      expect(queue).toEqual(clone);
      expect(queue).not.toBe(clone);
      expect(queue.peek()).toBe(clone.peek());
    });

    test('원본 queue가 변경되어도 복사본 queue는 변경되지 않는다.', () => {
      expect(queue.enqueue(1)).not.toEqual(clone);
    });
  });

  describe('Queue.prototype.clear', () => {
    test('queue의 모든 요소를 제거하고 변경된 queue를 반환한다.', () => {
      expect(new Queue([1, 2, 3]).clear().size).toBe(0);
    });

    test('복사본이 아닌 원본을 반환한다.', () => {
      const queue = Queue.of(1, 2, 3);
      expect(queue.clear()).toBe(queue);
    });
  });
});

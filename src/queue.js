const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        if (maxSize || maxSize === 0) {
            this.maxSize = maxSize;
        } else this.maxSize = 30;
        this.heap = new MaxHeap;
    }

    push(data, priority) {

        try {
            if (this.heap.size() < this.maxSize) {
                this.heap.push(data, priority);
            } else throw new Error();
        } catch (e) {
            alert("Error");
        }
    }

    shift() {
        try {
            if (this.heap.root != null) {
                return this.heap.pop();
            } else throw new Error();
        } catch (e) {
            alert("Error");
        }

    }

    size() {
      return this.heap.size();
    }

    isEmpty() {
        var a = this.heap.isEmpty();
      return a;
    }
}

module.exports = PriorityQueue;

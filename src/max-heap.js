const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
    }

    push(data, priority) {
        var node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(this.parentNodes[this.parentNodes.length - 1]);
    }

    pop() {
        if (this.root != null) {
            var detached = this.detachRoot();
            this.restoreRootFromLastInsertedNode(detached);
            if (this.root != null) {
                this.shiftNodeDown(this.root);
            }
            return detached.data;
        }
    }

    detachRoot() {
        if (this.parentNodes.length == 1) {
            var detached = this.parentNodes[0];
            this.parentNodes = [];
        } else {
            detached = this.root;
            if (this.parentNodes.includes(this.root)) {
                this.parentNodes.shift();
            }
        }

        this.root = null;
        return detached;
    }

    restoreRootFromLastInsertedNode(detached) {

        if (this.parentNodes.length != 0) {
            if (this.parentNodes.length == 1) {
                this.root = this.parentNodes[0];
                this.root.parent = null;
                this.root.left = null;
                this.root.right = null;
            }
            else {
                if (this.parentNodes[this.parentNodes.length - 1].parent != null) {
                    var tmpParantRoot = this.parentNodes[this.parentNodes.length - 1].parent;
                    if (this.parentNodes.includes(tmpParantRoot)) {
                        tmpParantRoot.left = null;
                    } else tmpParantRoot.right = null;
                }

                this.root = this.parentNodes.pop();
                this.root.parent = null;
                this.root.left = detached.left;
                this.root.right = detached.right;

                if (this.root.left != null) {
                    this.root.left.parent = this.root;
                    if (this.root.right != null) {
                        this.root.right.parent = this.root;
                    }
                }

                if (this.root.left != null || this.root.right != null) {
                    this.parentNodes.unshift(this.root);
                }
            }
        }
    }

    size() {
        if (this.root != null) {
            return this.recSize(this.root);
        }
        return 0;
    }

    recSize(node) {
        var count = 1;

        if (node.left != null) {
            count += this.recSize(node.left);
        }

        if (node.right != null) {
            count += this.recSize(node.right);
        }

        return count;
    }

    isEmpty() {
        return !this.root;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
    }

    insertNode(node) {
        if (this.root === null) {
            this.root = node;
        } else if (this.parentNodes[0].appendChild(node)) {
            this.parentNodes.shift();
        }
        this.parentNodes.push(node);
    }

    shiftNodeUp(node) {
        if (node.parent != null) {
            if (node.priority > node.parent.priority) {
                if (this.parentNodes.includes(node) && this.parentNodes.includes(node.parent)) {
                    var nodeIndex = this.parentNodes.indexOf(node);
                    var nodeParentIndex = this.parentNodes.indexOf(node.parent);
                    this.parentNodes[nodeParentIndex] = node;
                    this.parentNodes[nodeIndex] = node.parent;
                } else {
                    this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
                }
                node.swapWithParent();
                this.shiftNodeUp(node);
            }
        } else {
            this.root = node;
        }
    }

    shiftNodeDown(node) {
        if (node.left != null) {
            if (node.right != null && node.right.priority > node.left.priority && node.right.priority > node.priority) {
                if (this.parentNodes.includes(node.right) && this.parentNodes.includes(node)) {
                    var nodeIndex = this.parentNodes.indexOf(node.right);
                    var nodeParentIndex = this.parentNodes.indexOf(node);
                    this.parentNodes[nodeParentIndex] = node.right;
                    this.parentNodes[nodeIndex] = node;
                } else {
                    this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
                }

                node.right.swapWithParent();
                if (node == this.root) {
                    this.root = node.parent;
                }
                this.shiftNodeDown(node);

            } else if (node.left.priority > node.priority) {
                if (this.parentNodes.includes(node.left) && this.parentNodes.includes(node)) {
                    var nodeIndex = this.parentNodes.indexOf(node.left);
                    var nodeParentIndex = this.parentNodes.indexOf(node);
                    this.parentNodes[nodeParentIndex] = node.left;
                    this.parentNodes[nodeIndex] = node;
                } else {
                    this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
                }
                node.left.swapWithParent();
                if (node == this.root) {
                    this.root = node.parent;
                }
                this.shiftNodeDown(node);
            }


        }
    }


    /*print(str) {
        console.log("\n" + str + "\n");
        if (this.root != null) {
            this.printNode(this.root, 0);
        }
    }

    printNode(node, level) {
        if (level > 5) {
            return;
        }
        if (node.left != null) {
            this.printNode(node.left, level + 1);
        }
        var line = "";
        for (var i = 0; i < level; i++) {
            line = line + "          ";
        }
        console.log(line + node.priority + " [" + node.data + "]" + "  (L:" + (node.left == null ? "N" : node.left.priority) +
            " R:" + (node.right == null ? "N" : node.right.priority) +
            " P:" + (node.parent == null ? "N" : node.parent.priority) + ")"
        );
        if (node.right != null) {
            this.printNode(node.right, level + 1);
        }

    }*/
}

module
    .exports = MaxHeap;

class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (this.left === null) {
            this.left = node;
            this.left.parent = this;
            return false;
        }
        else if (this.left !== node && this.right === null) {
            this.right = node;
            this.right.parent = this;
            return true;
        }
    }

    removeChild(node) {
        try {
            if (this.left == node) {
                this.left.parent = null;
                this.left = null;
            } else if (this.right == node) {
                this.right.parent = null;
                this.right = null;
            } else throw new Error();
        } catch (e) {
            alert("Error");
        }

    }

    remove() {
        if (this.parent !== null) {
            if (this.parent.left == this || this.parent.right == this) {
                this.parent.removeChild(this);
            }
        }
    }

    swapWithParent() {
        if (this.parent !== null) {

            if (this.parent.parent != null) {
                var swapParent = this.parent.parent;
                if (this.parent.parent.left == this.parent) {
                    this.parent.parent.left = this;
                } else if (this.parent.parent.right == this.parent) {
                    this.parent.parent.right = this;
                }
            } else {
                swapParent = null;
            }

            var tmpChildLeft = this.left;
            var tmpChildRight = this.right;
            if (tmpChildLeft != null) {
                tmpChildLeft.parent = this.parent;
            }
            if (tmpChildRight != null) {
                tmpChildRight.parent = this.parent;
            }


            if (this.parent.left == this) {
                this.left = this.parent;
                this.left.parent = this;
                this.right = this.parent.right;
                if (this.right != null) {
                    this.right.parent = this;
                }
                this.parent.left = tmpChildLeft;
                this.parent.right = tmpChildRight;


            } else if (this.parent.right == this) {
                this.right = this.parent;
                this.right.parent = this;
                this.left = this.parent.left;
                if (this.left != null) {
                    this.left.parent = this;
                }
                this.parent.left = tmpChildLeft;
                this.parent.right = tmpChildRight;

            }
            this.parent = swapParent;
        }
    }

}

module.exports = Node;

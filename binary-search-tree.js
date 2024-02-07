function mergeSort(arr) {
    if (arr.length === 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const firstHalf = mergeSort(arr.slice(0, mid));
    const secondHalf = mergeSort(arr.slice(mid));

    const sorted = [];

    let i = 0,
        j = 0;

    while (true) {
        if (firstHalf[i] < secondHalf[j]) {
            sorted.push(firstHalf[i++]);
        } else {
            sorted.push(secondHalf[j++]);
        }

        if (i === firstHalf.length && j !== secondHalf.length) {
            sorted.push.apply(sorted, secondHalf.slice(j));
            break;
        }

        if (j === secondHalf.length && i !== firstHalf.length) {
            sorted.push.apply(sorted, firstHalf.slice(i));
            break;
        }
    }

    return sorted;
}

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function buildTree(arr) {
    if (!arr.length) return null;

    const mid = Math.floor((arr.length - 1) / 2);

    return new Node(
        arr[mid],
        buildTree(arr.slice(0, mid)),
        buildTree(arr.slice(mid + 1))
    );
}

class Tree {
    constructor(arr) {
        this.root = buildTree(mergeSort([...new Set(arr)]));
    }

    insert(value) {
        let node = this.root;

        while (true) {
            if (value < node.data) {
                if (node.left) {
                    node = node.left;
                } else {
                    node.left = new Node(value);
                    return;
                }
            } else if (value > node.data) {
                if (node.right) {
                    node = node.right;
                } else {
                    node.right = new Node(value);
                    return;
                }
            } else {
                return;
            }
        }
    }

    delete(value) {
        let parentNode;
        let node = this.root;

        while (true) {
            if (value < node?.data) {
                parentNode = node;
                node = node.left;
            } else if (value > node?.data) {
                parentNode = node;
                node = node.right;
            } else if (value !== node?.data) return;
            else break;
        }

        if (!node.left && !node.right) {
            if (parentNode.left?.data === value) parentNode.left = null;
            else parentNode.right = null;

            return;
        }

        if (!node.left !== !node.right) {
            if (node.right) {
                node.data = node.right.data;
                node.right = null;
            } else {
                node.data = node.left.data;
                node.left = null;
            }

            return;
        }

        let targetNode = (parentNode = node);
        node = node.right;

        while (node.left) {
            parentNode = node;
            node = node.left;
        }

        targetNode.data = node.data;

        if (node.right) {
            if (parentNode.right.data === node.data)
                parentNode.right = node.right;
            else parentNode.left = node.right;
        } else {
            if (parentNode.right.data === node.data) parentNode.right = null;
            else parentNode.left = null;
        }
    }

    find(value) {
        let node = this.root;

        while (node) {
            if (value < node.data) node = node.left;
            else if (value > node.data) node = node.right;
            else if (node.data === value) return node;
        }
    }

    levelOrder(callback) {
        const queue = [this.root];
        const arr = [];

        while (queue.length) {
            if (callback) callback(queue[0].data);
            else arr.push(queue[0].data);

            if (queue[0].left) queue.push(queue[0].left);
            if (queue[0].right) queue.push(queue[0].right);
            queue.shift();
        }

        return callback ? undefined : arr;
    }

    inOrder(callback) {
        const arr = [];

        (function inOrderRec(node) {
            if (!node) return;

            inOrderRec(node.left);

            if (callback) callback(node.data);
            else arr.push(node.data);

            inOrderRec(node.right);
        })(this.root);

        return callback ? undefined : arr;
    }

    preOrder(callback) {
        const arr = [];

        (function preOrderRec(node) {
            if (!node) return;

            if (callback) callback(node.data);
            else arr.push(node.data);

            preOrderRec(node.left);
            preOrderRec(node.right);
        })(this.root);

        return callback ? undefined : arr;
    }

    postOrder(callback) {
        const arr = [];

        (function postOrderRec(node) {
            if (!node) return;

            postOrderRec(node.left);
            postOrderRec(node.right);

            if (callback) callback(node.data);
            else arr.push(node.data);
        })(this.root);

        return callback ? undefined : arr;
    }

    height(node) {
        if (!node) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
    }

    depth(node) {
        let currentNode = this.root;
        let count = 0;

        while (currentNode) {
            if (node.data < currentNode.data) currentNode = currentNode.left;
            else if (node.data > currentNode.data)
                currentNode = currentNode.right;
            else if (currentNode.data === node.data) return count;
            count++;
        }
    }

    isBalanced() {
        const leftHeight = this.height(this.root.left);
        const rightHight = this.height(this.root.right);

        if (leftHeight > rightHight) {
            return leftHeight - rightHight <= 1;
        } else {
            return rightHight - leftHeight <= 1;
        }
    }

    reBalance() {
        const arr = this.inOrder();

        this.root = buildTree(arr);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;

        if (node.right !== null)
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null)
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
    }
}

module.exports = { Tree };

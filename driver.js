const { Tree } = require("./binary-search-tree.js");

const randomArray = [];

for (let i = 0; i < 10; i++) randomArray.push(Math.floor(Math.random() * 100));

console.log(
    "Create a binary search tree from an array of random numbers < 100.\n"
);

const tree = new Tree(randomArray);

console.log("Confirm that the tree is balanced.\n");

console.log(`isBalanced: ${tree.isBalanced()}.\n`);

console.log("Print out all elements in level, pre, post, and in order.\n");

console.log(`levelOrder: ${tree.levelOrder().join(", ")}.`);
console.log(`preOrder: ${tree.preOrder().join(", ")}.`);
console.log(`postOrder: ${tree.postOrder().join(", ")}.`);
console.log(`inOrder: ${tree.inOrder().join(", ")}.\n`);

console.log("Unbalance the tree by adding several numbers > 100.\n");

for (let i = 0; i < 10; i++) tree.insert(Math.floor(Math.random() * 100) + 100);

console.log("Confirm that the tree is balanced.\n");

console.log(`isBalanced: ${tree.isBalanced()}.\n`);

console.log("Balance the tree.\n");

tree.reBalance();

console.log("Confirm that the tree is balanced.\n");

console.log(`isBalanced: ${tree.isBalanced()}.\n`);

console.log("Print out all elements in level, pre, post, and in order.\n");

console.log(`levelOrder: ${tree.levelOrder().join(", ")}.`);
console.log(`preOrder: ${tree.preOrder().join(", ")}.`);
console.log(`postOrder: ${tree.postOrder().join(", ")}.`);
console.log(`inOrder: ${tree.inOrder().join(", ")}.`);

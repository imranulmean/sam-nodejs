import readline from 'readline';
import fs from 'fs';

// class TreeNode {
//     constructor(value) {
//       this.value = value;
//       this.left = null;
//       this.right = null;
//     }
//   }
//   const a = new TreeNode(5);
//   const b = new TreeNode(3);
//   const c = new TreeNode(9);
//   const d = new TreeNode(14);
//   const e = new TreeNode(2);
//   const f = new TreeNode(6);

  
//   a.left = b;
//   a.right = c;
//   b.left = d;
//   b.right = e;
//   c.left = e;
//   c.right = f;
  
//   function maxPathSum(root) {
//     if (!root) return 0;
    
//     function maxPathSumHelper(node) {
//       if (!node) return 0;
//       let maxSum = Number.MIN_SAFE_INTEGER;
//       const leftSum = Math.max(0, maxPathSumHelper(node.left));
//       const rightSum = Math.max(0, maxPathSumHelper(node.right));
//       maxSum = Math.max(maxSum, leftSum + rightSum + node.value);
//       return Math.max(leftSum, rightSum) + node.value;
//     }
//     return maxPathSumHelper(root);
//   }
  
//   const maximumSum = maxPathSum(a);
//   console.log("Correct Maximum Sum:", maximumSum);



//////////////////Get Input From User////////////////////
// class TreeNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// // Function to build the binary tree based on user input
// const buildBinaryTree = async () => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   // Prompt user for input
//   const prompt = (question) => new Promise((resolve) => {
//     rl.question(question, resolve);
//   });

//   const buildTree = async (node) => {
//     const leftValue = await prompt(`Enter the left child value for ${node.value} (or press Enter to skip): `);
//     if (leftValue !== '') {
//       node.left = new TreeNode(parseInt(leftValue, 10));
//       await buildTree(node.left);
//     }

//     const rightValue = await prompt(`Enter the right child value for ${node.value} (or press Enter to skip): `);
//     if (rightValue !== '') {
//       node.right = new TreeNode(parseInt(rightValue, 10));
//       await buildTree(node.right);
//     }
//   };

//   const rootValue = await prompt('Enter the root value: ');
//   const root = new TreeNode(parseInt(rootValue, 10));
//   await buildTree(root);

//   rl.close();
//   return root;
// };

// // Function to calculate the maximum sum of any path in a binary tree
// const maxPathSum = (root) => {
//   if (!root) return 0;

//   // Helper function to calculate the maximum path sum
//   const maxPathSumHelper = (node) => {
//     if (!node) return 0;

//     // Initialize maxSum here
//     let maxSum = Number.MIN_SAFE_INTEGER;

//     const leftSum = Math.max(0, maxPathSumHelper(node.left));
//     const rightSum = Math.max(0, maxPathSumHelper(node.right));

//     maxSum = Math.max(maxSum, leftSum + rightSum + node.value);

//     return Math.max(leftSum, rightSum) + node.value;
//   };

//   return maxPathSumHelper(root);
// };

// // Main function
// const main = async () => {
//   const root = await buildBinaryTree();
//   const maximumSum = maxPathSum(root);
//   console.log("Correct Maximum Sum:", maximumSum);
// };

// // Run the main function
// main();

// -------------------------------------------------

const array = [5,3,9,14,2];

/////////////////////////////
const track= new Map();

let currentIndex = 0;
let numRows = 0;
const rows = [];

while (currentIndex < array.length) {
  numRows++;
  const row = [];

  for (let j = 0; j < numRows; j++) {
    //  console.log(`For Index: ${currentIndex} is Row Number: ${numRows}`)
     track.set(currentIndex, numRows);
     row.push(array[currentIndex++]);    
  }
}
////////////////////////////

function createAdjacencyMatrix(arr) {
  const n = array.length;
  const matrix = [];

  for (let i = 0; i < n; i++) {
    matrix[i] = Array(n).fill(0);
  }
  // console.log(`getting  index 0 leftChildIndex is ${track.get(0)}`)
  for (let i = 0; i < n; i++) {
    let leftChildIndex = track.get(i) + i;
    // console.log(`When index ${i} leftChildIndex is ${leftChildIndex}`)
    let rightChildIndex = leftChildIndex + 1;
    // console.log(`When index ${i} rightChildIndex is ${rightChildIndex}`)

    if (leftChildIndex < n) {
      matrix[i][leftChildIndex] = 1;
      matrix[leftChildIndex][i] = 1;
    }

    if (rightChildIndex < n) {
      matrix[i][rightChildIndex] = 1;
      matrix[rightChildIndex][i] = 1;
    }
    // console.log("For Index:", i);
    // console.log("matrix:", matrix[i]);

  }

  return matrix;
}

const adjMatrix = createAdjacencyMatrix(array);
//  console.log(adjMatrix);
 for (let i = 0; i < adjMatrix.length; i++) {
  let rowString = '';
  
  for (let j = 0; j < adjMatrix[i].length; j++) {
    rowString += adjMatrix[i][j] + ' ';
  }

  console.log(rowString.trim());
 }
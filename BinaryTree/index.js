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

// -------------------------------------------------------

// class TreeNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// // Function to build the binary tree based on provided input
// const buildBinaryTree = (values) => {

//   const buildTree = (index) => {
//     console.log(index);
//     if (index >= values.length) {
//       return null;
//     }

//     const node = new TreeNode(values[index]);
//     node.left = buildTree(2 * index + 1);
//     node.right = buildTree(2 * index + 2);

//     return node;
//   };
  
//   return buildTree(0);
// };

// // Main function
// const main = () => {
//   const inputValues = [5, 3, 9, 14, 2, 6];
//   const root = buildBinaryTree(inputValues);

//   fs.writeFileSync('./BinaryTree.txt',JSON.stringify(root, null, 2));
//   // console.log('Binary Tree:', JSON.stringify(root, null, 2));
// };

// // Run the main function
// main();
// fs.writeFileSync('./BinaryTree.txt',JSON.stringify(root, null, 2));

// -------------------------------------
// class TreeNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// function createBinaryTree(arr) {
//   if (!arr || arr.length === 0) {
//     return null;
//   }

//   // Create nodes for each element in the array
//   const nodes = arr.map(value => new TreeNode(value));

//   // Connect nodes to form the binary tree
//   for (let i = 0; i < nodes.length; i++) {
//     if (2 * i + 1 < nodes.length) {
//       nodes[i].left = nodes[2 * i + 1];
//     }
//     if (2 * i + 2 < nodes.length) {
//       nodes[i].right = nodes[2 * i + 2];
//     }
//   }

//   return nodes[0]; // Return the root of the binary tree
// }

// // Example usage
// const inputArray = [5, 3, 9, 14, 2];
// const root = createBinaryTree(inputArray);

// console.log(root);

// ------------------------------------------

const arr = [5, 3, 9, 14, 2, 6, 4, 1];

// Function to create an adjacency matrix from the given array
function createAdjacencyMatrix(arr) {
  const n = arr.length;
  const matrix = [];
  const levels = Array(n).fill(0);

  // Initialize the matrix with zeros
  for (let i = 0; i < n; i++) {
    matrix[i] = Array(n).fill(0);
  }

  // Set edges in the matrix based on the array
  for (let i = 0; i < n; i++) {
    let leftChildIndex = 2 * i + 1;
    let rightChildIndex = 2 * i + 2;

    if (i > 0) {
      leftChildIndex = 2 * i;
      rightChildIndex = 2 * i + 1;
      levels[i] = Math.floor((i - 1) / 2) + 1 ;
      
    }

    if (leftChildIndex < n) {
      matrix[i][leftChildIndex] = 1;
      matrix[leftChildIndex][i] = 1;
    }

    if (rightChildIndex < n) {
      matrix[i][rightChildIndex] = 1;
      matrix[rightChildIndex][i] = 1;
    }
    // console.log("For Index:", i);
    console.log(`levels[${i}]: ${levels[i]}`);
    // console.log("matrix:", matrix[i]);

  }

  return matrix;
}

const adjMatrix = createAdjacencyMatrix(arr);
// console.log(adjMatrix);
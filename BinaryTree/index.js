const readline= require('readline');

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
//   const g = new TreeNode(4);
//   const h = new TreeNode(1);
  
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
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Function to build the binary tree based on user input
const buildBinaryTree = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Prompt user for input
  const prompt = (question) => new Promise((resolve) => {
    rl.question(question, resolve);
  });

  const buildTree = async (node) => {
    const leftValue = await prompt(`Enter the left child value for ${node.value} (or press Enter to skip): `);
    if (leftValue !== '') {
      node.left = new TreeNode(parseInt(leftValue, 10));
      await buildTree(node.left);
    }

    const rightValue = await prompt(`Enter the right child value for ${node.value} (or press Enter to skip): `);
    if (rightValue !== '') {
      node.right = new TreeNode(parseInt(rightValue, 10));
      await buildTree(node.right);
    }
  };

  const rootValue = await prompt('Enter the root value: ');
  const root = new TreeNode(parseInt(rootValue, 10));
  await buildTree(root);

  rl.close();
  return root;
};

// Function to calculate the maximum sum of any path in a binary tree
const maxPathSum = (root) => {
  if (!root) return 0;

  // Helper function to calculate the maximum path sum
  const maxPathSumHelper = (node) => {
    if (!node) return 0;

    // Initialize maxSum here
    let maxSum = Number.MIN_SAFE_INTEGER;

    const leftSum = Math.max(0, maxPathSumHelper(node.left));
    const rightSum = Math.max(0, maxPathSumHelper(node.right));

    maxSum = Math.max(maxSum, leftSum + rightSum + node.value);

    return Math.max(leftSum, rightSum) + node.value;
  };

  return maxPathSumHelper(root);
};

// Main function
const main = async () => {
  const root = await buildBinaryTree();
  const maximumSum = maxPathSum(root);
  console.log("Correct Maximum Sum:", maximumSum);
};

// Run the main function
main();
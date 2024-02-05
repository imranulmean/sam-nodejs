import graphlib from 'graphlib';

// Create a new directed graph
const graph = new graphlib.Graph({ directed: true });

// Add nodes with corrected values
graph.setNode('a', 5);
graph.setNode('b', 3);
graph.setNode('c', 9);
graph.setNode('d', 14);
graph.setNode('e', 2);
graph.setNode('f', 6);

// Add edges
graph.setEdge('a', 'b');
graph.setEdge('a', 'c');
graph.setEdge('b', 'd');
graph.setEdge('b', 'e');
graph.setEdge('c', 'e');
graph.setEdge('c', 'f');

// Function to find the path with the largest sum using dynamic programming
const findLargestSumPath = (graph) => {
  const nodes = graph.nodes();
  const memo = {};

  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    const neighbors = graph.neighbors(node);

    if (neighbors.length === 0) {
      memo[node] = graph.node(node);
    } else {
      const maxNeighbor = neighbors.reduce((a, b) => (memo[b] > memo[a] ? b : a));
      const maxNeighborSum = memo[maxNeighbor] || 0;

      memo[node] = graph.node(node) + maxNeighborSum;
    }
  }

  const startNode = nodes[0]; // You can change the starting node if needed
  const largestSum = Math.max(...nodes.map(node => memo[node]));

  return { largestSum, memo };
};

// Find the path with the largest sum
const { largestSum, memo } = findLargestSumPath(graph);

console.log('Largest sum:', largestSum);
console.log('Memoization table:', memo);
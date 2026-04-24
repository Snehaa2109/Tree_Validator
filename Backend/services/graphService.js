const buildGraphAndAnalyze = (edges) => {
    const graph = {};
    const childSet = new Set();
    const parentUsed = new Map();

    // Build graph
    for (let [parent, child] of edges) {
        if (!graph[parent]) graph[parent] = [];

        // Multi-parent rule (first wins)
        if (!parentUsed.has(child)) {
            graph[parent].push(child);
            parentUsed.set(child, parent);
        }

        childSet.add(child);
    }

    const allNodes = new Set([
        ...Object.keys(graph),
        ...childSet
    ]);

    const visited = new Set();
    const hierarchies = [];

    let totalTrees = 0;
    let totalCycles = 0;

    let maxDepth = 0;
    let largestTreeRoot = "";

    for (let node of allNodes) {
        if (visited.has(node)) continue;

        const component = new Set();
        collectComponent(node, graph, component);

        component.forEach(n => visited.add(n));

        // Root finding
        const roots = [...component].filter(n => !childSet.has(n));

        const root = roots.length > 0
            ? roots.sort()[0]
            : [...component].sort()[0];

        const hasCycle = detectCycle(root, graph, new Set(), new Set());

        if (hasCycle) {
            totalCycles++;

            hierarchies.push({
                root,
                tree: {},
                has_cycle: true
            });

        } else {
            const tree = buildTree(root, graph);
            const depth = getDepth(root, graph);

            totalTrees++;

            if (
                depth > maxDepth ||
                (depth === maxDepth && root < largestTreeRoot)
            ) {
                maxDepth = depth;
                largestTreeRoot = root;
            }

            hierarchies.push({
                root,
                tree: { [root]: tree },
                depth
            });
        }
    }

    return {
        hierarchies,
        summary: {
            total_trees: totalTrees,
            total_cycles: totalCycles,
            largest_tree_root: largestTreeRoot
        }
    };
};

// Collect connected component
function collectComponent(node, graph, set) {
    if (set.has(node)) return;

    set.add(node);

    for (let child of graph[node] || []) {
        collectComponent(child, graph, set);
    }
}

// Cycle detection
function detectCycle(node, graph, visited, stack) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (let child of graph[node] || []) {
        if (detectCycle(child, graph, visited, stack)) return true;
    }

    stack.delete(node);
    return false;
}

// Build tree
function buildTree(node, graph) {
    let obj = {};

    for (let child of graph[node] || []) {
        obj[child] = buildTree(child, graph);
    }

    return obj;
}

// Depth
function getDepth(node, graph) {
    const children = graph[node] || [];

    if (children.length === 0) return 1;

    let max = 0;

    for (let child of children) {
        max = Math.max(max, getDepth(child, graph));
    }

    return max + 1;
}

module.exports = { buildGraphAndAnalyze };
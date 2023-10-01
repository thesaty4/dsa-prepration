class Graph {
    adjacencyList = new Map();
    makeAdjacencyList([...edges]) {
        for (const [v, u] of edges) {
            this.adjacencyList.set(v, [...this.adjacencyList.get(v) ?? [], u]);
        }
    }

    dfs1(node, visited, stack) {
        visited[node] = true;
        for (const neighbor of this.adjacencyList.get(node) ?? []) {
            if (!visited[neighbor]) {
                this.dfs1(neighbor, visited, stack);
            }
        }
        stack.push(node);
    }

    dfs2(node, adjacencyList, visited) {
        visited[node] = true;
        for (const neighbor of adjacencyList.get(node) ?? []) {
            if (!visited[neighbor]) {
                this.dfs2(neighbor, adjacencyList, visited);
            }
        }
    }

    kosarajuAlgo(v, [...edges]) {
        let ans = 0;
        this.makeAdjacencyList(edges);
        const visited = Array.from({ length: v }, () => false);
        const stack = [];

        //Visiting all node and storing their node in stack
        for (let i = 0; i < v; i++) {
            if (!visited[i]) {
                this.dfs1(i, visited, stack);
            }
        }

        // Making reverse connection to each node & visited makes false for next move...
        const reverseConnectionAdj = new Map();
        for (let i = 0; i < v; i++) {
            visited[i] = false;
            for (const neighbor of this.adjacencyList.get(i) ?? []) {
                reverseConnectionAdj.set(neighbor, [...reverseConnectionAdj.get(neighbor) ?? [], i]);
            }
        }

        // traverse using stack
        while (stack.length != 0) {
            const node = stack.pop();
            for (const neighbor of reverseConnectionAdj.get(node) ?? []) {
                if (!visited[neighbor]) {
                    this.dfs2(neighbor, reverseConnectionAdj, visited);
                    ans++;
                }
            }
        }


        return ans;
    }
}

const n = 7;
const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 7], [5, 6], [6, 7], [6, 4]];
const graph = new Graph();
const stronglyConnectedComponent = graph.kosarajuAlgo(n, edges);
console.log(stronglyConnectedComponent);
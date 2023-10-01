class Graph {
    adj = new Map();
    buildAdjacencyList([...list]) {
        for (const [v, u] of list) {
            this.adj.set(v, [...this.adj.get(v) ?? [], u]);
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
        }
    }

    bfs(rootNode, visited, ans) {
        let queue = [rootNode];
        visited[rootNode] = true;
        while (queue.length != 0) {
            const node = queue.shift();
            ans.push(node);
            for (const neighbor of this.adj.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
    }

    traversal(n, [...list]) {
        let ans = [];
        this.buildAdjacencyList(list);
        const visited = Array.from({ length: n + 1 }, () => false);

        for (let i = 1; i <= n; i++) {
            if (!visited[i]) {
                this.bfs(i, visited, ans);
            }
        }
        return ans;
    }
}

const n = 8;
const list = [[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6], [7, 8]];
const graph = new Graph();
console.log(graph.traversal(n, list));
class Graph {
    adj = new Map();

    buildAdjacency([...list]) {
        for (const [v, u] of list) {
            this.adj.set(v, [...this.adj.get(v) ?? [], u]);
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
        }
    }

    dfs(currentNode, visited, ans) {
        visited[currentNode] = true;
        ans.push(currentNode);
        for (const neighbor of this.adj.get(currentNode)) {
            if (!visited[neighbor]) {
                this.dfs(neighbor, visited, ans);
            }
        }
    }

    traverse(n, [...list]) {
        let ans = [];
        this.buildAdjacency(list);
        const visited = Array.from({ length: n + 1 }, () => false);

        for (let i = 1; i <= n; i++) {
            if (!visited[i]) {
                this.dfs(i, visited, ans);
            }
        }

        return ans;
    }
}

const n = 8;
const list = [[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6], [7, 8]];
const graph = new Graph();
console.log(graph.traverse(n, list));
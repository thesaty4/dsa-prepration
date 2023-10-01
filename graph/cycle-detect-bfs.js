class Graph {
    adj = new Map();

    buildAdjacencyList([...list]) {
        for (const [v, u] of list) {
            this.adj.set(v, [...this.adj.get(v) ?? [], u]);
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
        }
    }

    cycleExist(startNode, visited) {
        visited[startNode] = true;
        const queue = [{ node: startNode, parent: -1 }];
        visited[startNode] = true;
        while (queue.length !== 0) {
            const { node, parent } = queue.shift();
            for (const neighbor of this.adj.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push({ node: neighbor, parent: node });
                } else if (neighbor !== parent) {
                    return true;
                }
            }
        }

        return false;
    }

    hasCycle(n, list) {
        this.buildAdjacencyList(list);
        let visited = Array.from({ length: n + 1 }, () => false);
        for (let i = 1; i <= n; i++) {
            if (!visited[i]) {
                if (this.cycleExist(i, visited)) return "YES";
            }
        }
        return "NO";
    }
}

const n = 2;
const list = [[1, 2]];
const graph = new Graph();
console.log(graph.hasCycle(n, list));

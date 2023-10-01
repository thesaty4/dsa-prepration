class Graph {
    adj = new Map();

    buildAdjacencyList(list) {
        for (const [u, v] of list) {
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
        }
    }

    sort(currentNode, visited, ans) {
        visited[currentNode] = true;
        for (const neighbor of this.adj.get(currentNode)) {
            if (neighbor && !visited[neighbor]) {
                this.sort(neighbor, visited, ans);
            }
        }
        ans.push(currentNode);
    }

    topoSort(n, list) {
        this.buildAdjacencyList(list);
        const visited = Array.from({ length: n }, () => false);
        let ans = [];
        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                this.sort(i, visited, ans);
            }
        }
        return ans.reverse();
    }
}

const n = 6;
let list = [[0], [1], [2, 3], [3, 1], [4, 1], [4, 0], [5, 0], [5, 2]];
const graph = new Graph();
console.log(graph.topoSort(n, list));
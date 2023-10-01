class Graph {
    adj = new Map();
    makeAdjacentList([...list]) {
        for (const [u, v] of list) {
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
            this.adj.set(v, [...this.adj.get(v) ?? [], u]);
        }
        return this.adj;
    }
}

const nodeList = [[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]];
const graph = new Graph();

console.log(graph.makeAdjacentList(nodeList));
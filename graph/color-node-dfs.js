class Graph {
    adj = new Map();
    buildAdjacencyList([...list]) {
        for (const [u, v] of list) {
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
            this.adj.set(v, [...this.adj.get(v) ?? [], u]);
        }
    }

    colorGraph(currentNode, color, newColor) {
        color[currentNode] = newColor;
        for (const neighbor of this.adj.get(currentNode)) {
            if (!color[neighbor] && !this.colorGraph(neighbor, color, newColor == 2 ? 1 : 2)) {
                return false;
            } else if (color[neighbor] == color[currentNode]) {
                return false;
            }
        }

        return true;
    }

    isBipartiteGraph(n, [...list]) {
        this.buildAdjacencyList(list);
        const color = Array.from({ length: n + 1 }, () => null);
        for (let i = 1; i <= n; i++) {
            if (color[i] == null && !this.colorGraph(i, color, 1)) {
                return "NO";
            }
        }

        return "YES";
    }
}


const n = 3;
let list = [[1, 2], [1, 3], [2, 3]]; // no
// list = [[1, 2], [1, 3], [2, 4], [4, 3]];
const graph = new Graph();
console.log(graph.isBipartiteGraph(n, list));
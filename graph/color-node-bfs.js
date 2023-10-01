class Graph {
    adj = new Map();
    buildAdjacencyList([...list]) {
        for (const [u, v] of list) {
            this.adj.set(u, [...this.adj.get(u) ?? [], v]);
            this.adj.set(v, [...this.adj.get(v) ?? [], u]);
        }
    }

    colorGraph(node, color) {
        color[node] = 1;
        let queue = [node];
        while (queue.length != 0) {
            const currentNode = queue.shift();
            for (const neighbor of this.adj.get(currentNode)) {
                if (!color[neighbor]) {
                    color[neighbor] = color[currentNode] == 1 ? 2 : 1;
                    queue.push(neighbor);
                } else if (color[neighbor] == color[currentNode]) {
                    return false;
                }
            }
        }

        return true;
    }

    isBipartiteGraph(n, [...list]) {
        this.buildAdjacencyList(list);
        const color = Array.from({ length: n + 1 }, () => null);

        for (let i = 1; i <= n; i++) {
            if (!color[i] && !this.colorGraph(i, color)) {
                return "NO";
            }
        }

        console.log("colored nodes are : ", color);
        return "YES";
    }
}

const n = 3;
let list = [[1, 2], [1, 3], [2, 3]]; // no
list = [[1, 2], [1, 3], [2, 4], [4, 3]];
const graph = new Graph();
console.log(graph.isBipartiteGraph(n, list));
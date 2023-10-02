const PriorityQueue = require('js-priority-queue');
const pq = new PriorityQueue({ comparator: (a, b) => a[0] - b[0] });

class Graph {
    adjacencyList = new Map();
    makeAdjacencyList(edges) {
        for (const edge of edges) {
            const v = edge[0];
            const u = edge[1];
            this.adjacencyList.set(v[0], [...this.adjacencyList.get(v[0]) ?? [], u]);
            this.adjacencyList.set(u[0], [...this.adjacencyList.get(u[0]) ?? [], v]);
        }
    }

    dijkstra(v, source, edges) {
        this.makeAdjacencyList(edges);
        const distance = Array.from({ length: v }, () => 1e9);
        pq.queue([0, source]);
        while (pq.length != 0) {
            const edge = pq.dequeue();
            const node = edge[1];
            const weight = edge[0];
            for (const neighbor of this.adjacencyList.get(node) ?? []) {
                const neighborNode = neighbor[0];
                const neighborWeight = neighbor[1];
                if (neighborWeight + weight < distance[neighborNode]) {
                    distance[neighborNode] = neighborWeight + weight;
                    pq.queue(neighbor);
                    //case when already this node exist, try to handle them ( removeThem and push new node with perticular distance)
                }
            }
        }

        return distance;
    }
}

const graph = new Graph();
const n = 5;
const edges = [
    [[0, 1], [1, 4]],   // Edge from node 0 to node 1 with weight 4
    [[0, 3], [2, 2]],   // Edge from node 0 to node 3 with weight 2
    [[1, 2], [3, 1]],   // Edge from node 1 to node 2 with weight 3
    [[2, 1], [3, 5]],   // Edge from node 2 to node 1 with weight 2
    [[3, 7], [4, 2]],   // Edge from node 3 to node 4 with weight 5 
];
const distance = graph.dijkstra(n, 0, edges);
console.log(distance);
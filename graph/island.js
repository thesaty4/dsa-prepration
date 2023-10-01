class Graph {
    isValidMove(moves, island, visited) {
        return moves[0] >= 0 && moves[0] < island.length && moves[1] >= 0 && moves[1] < island[0].length && !visited[moves[0]][moves[1]] && island[moves[0]][moves[1]] == 1;
    }

    solveMe(row, col, island, visited) {
        visited[row][col] = true;
        const direction = [[-1, 0], [0, +1], [+1, 0], [0, -1]];
        for (let move = 0; move < 4; move++) {
            const moveRowCol = [row + direction[move][0], col + direction[move][1]];
            if (this.isValidMove(moveRowCol, island, visited)) {
                this.solveMe(moveRowCol[0], moveRowCol[1], island, visited);
            }
        }
    }
    countIsland(island) {
        let count = 0;
        const rowSize = island.length;
        const colSize = island[0].length;
        const visited = Array.from({ length: rowSize }, () => Array.from({ length: colSize }, () => false));

        for (let row = 0; row < rowSize; row++) {
            for (let col = 0; col < colSize; col++) {
                if (!visited[row][col] && island[row][col] === 1) {
                    this.solveMe(row, col, island, visited);
                    count++;
                }
            }
        }
        return count;
    }
}

const island = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 1, 1],
]
const graph = new Graph();
const count = graph.countIsland(island);
console.log(count);

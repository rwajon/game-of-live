class Grid {
  constructor(cellSize, width, height) {
    this.cellSize = cellSize;
    this.numberOfColumns = Math.ceil(width / cellSize);
    this.numberOfRows = height - cellSize;
    this.cells = Array.from(
      Array(this.numberOfRows),
      () => new Array(this.numberOfColumns),
    );
    for (let column = 0; column < this.numberOfColumns; column++) {
      for (let row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize);
      }
    }
  }
  draw() {
    this.cells.forEach(cells => {
      cells.forEach(cell => {
        cell.draw();
      });
    });
  }
  randomize() {
    this.cells.forEach(cells => {
      cells.forEach(cell => {
        cell.setIsAlive(Math.floor(Math.random() * 2));
      });
    });
  }
  updatePopulation(numberOfGenerations) {
    let generations = numberOfGenerations;
    this.cells.forEach(cells => {
      cells.forEach(cell => {
        generations = cell.liveOrDie(numberOfGenerations);
      });
    });
    return { numberOfGenerations: generations };
  }
  getNeighbors(currentCell) {
    let neighbors = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        let neighborColumn = currentCell.column + xOffset;
        let neighborRow = currentCell.row + yOffset;
        if (this.isValidPosition(neighborColumn, neighborRow)) {
          let neighborCell = this.cells[neighborColumn][neighborRow];
          neighbors.push(neighborCell);
        }
      }
    }
    return neighbors.filter(
      ({ row, column }) =>
        row !== currentCell.row || column !== currentCell.column,
    );
  }
  isValidPosition(column, row) {
    if (
      column >= 0 &&
      column < this.numberOfColumns &&
      row >= 0 &&
      row < this.numberOfRows
    ) {
      return true;
    }
    return false;
  }
  updateNeighborCounts() {
    this.cells.forEach(cells => {
      cells.forEach(cell => {
        cell.liveNeighborCount = 0;
        let neighbors = this.getNeighbors(cell);
        neighbors.forEach(neighbor => {
          if (neighbor.isAlive) {
            cell.liveNeighborCount += 1;
          }
        });
      });
    });
  }
  stop() {
    this.cells.forEach(cells => {
      cells.forEach(cell => {
        cell.setIsAlive(false);
      });
    });
  }
  replay() {
    this.randomize();
  }
}
//# sourceMappingURL=Grid.js.map

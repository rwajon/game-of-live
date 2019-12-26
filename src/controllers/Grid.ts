interface Window {
  loop: () => void;
  noLoop: () => void;
}

class Grid {
  public cellSize: number;
  public numberOfColumns: number;
  public numberOfRows: number;
  public cells: Array<Object>;
  public numberOfLivingCells: number;

  constructor(cellSize: number, width: number, height: number) {
    this.cellSize = cellSize;
    this.numberOfColumns = Math.ceil(width / cellSize);
    this.numberOfRows = height - cellSize;
    this.cells = new Array(this.numberOfColumns);
    this.numberOfLivingCells = 0;

    for (var i = 0; i < this.numberOfColumns; i = i + 1) {
      this.cells[i] = new Array(this.numberOfRows);
    }
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize);
      }
    }
  }
  public draw() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
  }

  public randomize() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].setIsAlive(Math.floor(Math.random() * 2));
      }
    }
  }

  public updatePopulation() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }

  public getNeighbors(currentCell) {
    var neighbors = [];
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;

        if (this.isValidPosition(neighborColumn, neighborRow)) {
          var neighborCell = this.cells[neighborColumn][neighborRow];
          neighbors.push(neighborCell);
        }
      }
    }

    for (var i = 0; i < neighbors.length; i++) {
      if (
        neighbors[i].column === currentCell.column &&
        neighbors[i].row === currentCell.row
      ) {
        neighbors.splice(i, 1);
      }
    }

    return neighbors;
  }

  public isValidPosition(column, row) {
    if (
      column >= 0 &&
      column < this.numberOfColumns &&
      row >= 0 &&
      row < this.numberOfRows
    ) {
      return true;
    } else {
      return false;
    }
  }

  public updateNeighborCounts() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveNeighborCount = 0;
        var neighbors = this.getNeighbors(this.cells[column][row]);
        for (var i = 0; i < neighbors.length; i++) {
          if (neighbors[i].isAlive) {
            this.cells[column][row].liveNeighborCount++;
          }
        }
      }
    }
  }

  public countLivingCells() {
    this.numberOfLivingCells = 0;
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        if (this.cells[column][row].isAlive) {
          this.numberOfLivingCells++;
        }
      }
    }
  }

  public stop() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].setIsAlive(false);
      }
    }
  }

  public replay() {
    this.randomize();
  }
}

class Cell {
    constructor(column, row, size) {
        this.column = column;
        this.row = row;
        this.size = size;
        this.isAlive = false;
        this.liveNeighborCount = 0;
    }
    draw() {
        if (this.isAlive) {
            window.fill(window.color(255, 0, 0));
        }
        else {
            window.fill(240);
        }
        window.noStroke();
        window.rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
    }
    setIsAlive(value) {
        this.isAlive = value;
    }
    liveOrDie() {
        if (this.isAlive && this.liveNeighborCount < 2) {
            this.isAlive = false;
        }
        else if (this.isAlive &&
            this.liveNeighborCount >= 2 &&
            this.liveNeighborCount < 4) {
            this.isAlive = true;
        }
        else if (this.isAlive && this.liveNeighborCount > 3) {
            this.isAlive = false;
        }
        else if (!this.isAlive && this.liveNeighborCount === 3) {
            this.isAlive = true;
        }
        else {
            this.isAlive = false;
        }
    }
}
//# sourceMappingURL=Cell.js.map
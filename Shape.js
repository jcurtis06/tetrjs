class Shape {
  constructor(shapeMap, originX, originY) {
    this.shapeMap = shapeMap;

    console.log(this.shapeMap);

    this.x = originX;
    this.y = originY;

    this.width = shapeMap.length;
    this.height;

    this.changedCells = [];

    this.set = false;

    document.addEventListener("keyup", (e) => {
      this.keyPressed(e);
    });
  }

  startGravity() {
    setInterval(() => {
      this.addGravity(1);
    }, 1000);
  }

  keyPressed(e) {
    if (e.code == "ArrowLeft") this.move(-1, false);
    else if (e.code == "ArrowRight") this.move(1, true);
    else if (e.code == "ArrowUp" && !this.set) {
      this.shapeMap = this.rotateRight(this.shapeMap);
      this.destroy();
      this.place();
    } else if (e.code == "ArrowDown") {
      this.shapeMap = this.rotateLeft(this.shapeMap);
      this.destroy();
      this.place();
    }
  }

  place() {
    for (let i = 0; i < this.shapeMap.length; i++) {
      this.height = this.shapeMap[i].length;
      for (let j = 0; j < this.shapeMap[i].length; j++) {
        if (this.shapeMap[i][j] == 1) {
          grid.getCellAt(this.x + i, this.y + j).div.style.backgroundColor =
            "red";
          this.changedCells.push(grid.getCellAt(this.x + i, this.y + j));
        }
      }
    }
  }

  rotateRight(matrix) {
    let result = [];
    matrix.forEach(function (a, i, aa) {
      a.forEach(function (b, j, bb) {
        result[bb.length - j - 1] = result[bb.length - j - 1] || [];
        result[bb.length - j - 1][i] = b;
      });
    });
    return result;
  }

  rotateLeft(matrix) {
    let result = [];
    matrix.forEach(function (a, i, aa) {
      a.forEach(function (b, j) {
        result[j] = result[j] || [];
        result[j][aa.length - i - 1] = b;
      });
    });
    return result;
  }

  destroy() {
    for (let i = 0; i < this.changedCells.length; i++) {
      this.changedCells[i].reset();
    }
  }

  addGravity(value) {
    if (this.y + value + this.height <= grid.rowCount && !this.set) {
      this.y += value;
      this.destroy();
      this.place();
    } else {
      this.set = true;
    }
  }

  move(x, right) {
    if (right && this.x + x + this.width > grid.columnCount) return;
    if (!right && this.x + x < grid.columnCount) return;

    this.x += x;
    this.destroy();
    this.place();
  }
}

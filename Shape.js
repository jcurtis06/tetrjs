class Shape {
  constructor(shapeMap, originX, originY) {
    this.shapeMap = shapeMap;
    this.x = originX;
    this.y = originY;

    this.width = shapeMap.length;
    this.height;

    this.changedCells = [];

    document.addEventListener("keyup", (e) => {
      this.keyPressed(e);
    });
  }

  startGravity() {
    console.log("started gravity");
    setInterval(() => {
      this.addGravity(1);
    }, 1000);
  }

  keyPressed(e) {
    if (e.code == "ArrowLeft") this.move(-1);
    else if (e.code == "ArrowRight") this.move(1);
  }

  place() {
    for (let i = 0; i < this.shapeMap.length; i++) {
      console.log(this.shapeMap[i]);
      for (let j = 0; j < this.shapeMap[i].length; j++) {
        console.log(this.shapeMap[i][j]);

        if (this.shapeMap[i][j] == 1) {
          grid.getCellAt(this.x + i, this.y + j).div.style.backgroundColor =
            "red";
          this.changedCells.push(grid.getCellAt(this.x + i, this.y + j));
        }
      }
    }
  }

  destroy() {
    for (let i = 0; i < this.changedCells.length; i++) {
      this.changedCells[i].reset();
    }
  }

  addGravity(value) {
    if (this.y + value + this.width + 1 <= grid.rowCount) {
      this.y += value;
      console.log(this.y);
      this.destroy();
      this.place();
    }
  }

  move(x) {
    this.x += x;
    this.destroy();
    this.place();
  }
}

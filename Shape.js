class Shape {
  constructor(shapeMap, originX, originY) {
    this.shapeMap = shapeMap;
    this.x = originX;
    this.y = originY;
  }

  place() {
    for (let i = 0; i < this.shapeMap.length; i++) {
      console.log(this.shapeMap[i]);
      for (let j = 0; j < this.shapeMap[i].length; j++) {
        console.log(this.shapeMap[i][j]);

        if (this.shapeMap[i][j] == 0) {
          grid.getCellAt(this.x + i, this.x + j).div.style.backgroundColor =
            "pink";
        }

        if (this.shapeMap[i][j] == 1) {
          grid.getCellAt(this.x + i, this.x + j).div.style.backgroundColor =
            "red";
        }
      }
    }
  }
}

class Cell {
  constructor(id) {
    this.id = id;
    this.cellType = 0;

    this.x;
    this.y;
  }

  generateDiv(row) {
    if (this.div) return;

    this.div = document.createElement("div");
    this.div.className = "cell";
    this.div.id = this.id;

    this.y = this.id % grid.rowCount;

    this.x = Number(row.getAttribute("index"));

    this.div.setAttribute("x", this.x);
    this.div.setAttribute("y", this.y);

    row.appendChild(this.div);
  }
}

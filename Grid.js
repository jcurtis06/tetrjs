let gridElement = document.getElementById("grid");

class Grid {
  constructor(rows, columns) {
    this.rowCount = rows;
    this.columnCount = columns;

    this.rows = [];
    this.cells = [];

    this.leftClick;
    this.keepAcrossResets;
  }

  generate() {
    gridElement.style.display = "flex";

    for (let i = 0; i < this.rowCount * this.columnCount; i++) {
      this.cells.push(new Cell(i));
    }

    let rowID = 0;

    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.setAttribute("index", rowID);

    this.rows.push(rowDiv);

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].generateDiv(rowDiv);
      if ((i + 1) % this.rowCount == 0) {
        rowID++;
        rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.setAttribute("index", rowID);
      }
      gridElement.appendChild(rowDiv);
    }

    let test = new Shape(Shapes.Z, 5, 5);

    test.place();
    test.startGravity();
  }

  regenerate() {
    gridElement.innerHTML = "";
    this.generate();

    if (this.leftClick && this.keepAcrossResets)
      this.addLeftClickListeners(this.leftClick);
  }

  addLeftClickListeners(method, keepAcrossResets) {
    this.leftClick = method;
    this.keepAcrossResets = keepAcrossResets;

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].div.addEventListener("click", (e) => {
        method(this.cells[i]);
      });
    }
  }

  getCellAt(x, y) {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].x == x && this.cells[i].y == y) return this.cells[i];
    }
  }
}

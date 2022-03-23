let borders = document.getElementsByClassName("tile");

let dubsteppin = false;

function startDubsteppin() {
  if (dubsteppin) return;
  dubsteppin = true;
  document.getElementById("background-music").play();
  setInterval(() => {
    for (let i = 0; i < borders.length; i++) {
      borders[i].style.borderColor = randomRgb();
    }
  }, 416.67);
}

function randomRgb() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + +o(r() * s) + ")";
}

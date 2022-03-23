import { figures } from "./Figures.js";
import { renderer } from "./Renderer.js";
import {
  canFigureBeRotatedAsNewFigure,
  canTranslateFigureByVector,
  getBoardAfterPoppingRows,
  getFigureBlockPositions,
  getFullRows,
  getRotatedFigure,
  getSlammedFigure,
  isFigurePartiallyAboveBoard,
} from "./utils.js";

const boardWidth = 10;
const boardHeight = 15;

let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

let boardRows = getNewBoardRows();
let currentFigure = getRandomFigure();

function getNewBoardRows() {
  return [...Array(boardHeight)].map(() => Array(boardWidth).fill(""));
}

function restartGame() {
  score = 0;
  boardRows = getNewBoardRows();
  currentFigure = getRandomFigure();
  renderer.recreateBoardHtmlElement({ width: boardWidth, height: boardHeight });
  renderer.renderScore(score);
}

function getRandomFigure() {
  let figure = { ...figures[Math.floor(Math.random() * figures.length)] };

  return {
    shape: [...figure.shape],
    className: figure.className,
    rotable: figure.rotable,
    y: figure.y,
    x: Math.floor(boardWidth / 2 - figure.shape[0].length / 2),
  };
}

function moveCurrentFigureByVectorIfPossible(vector, boardRows) {
  if (canTranslateFigureByVector(currentFigure, vector, boardRows)) {
    currentFigure = {
      ...currentFigure,
      x: currentFigure.x + vector.x,
      y: currentFigure.y + vector.y,
    };
  }

  renderer.renderBoardAndCurrentFigure(boardRows, currentFigure);
}

function placeFigureInBoard(figure, boardRows) {
  getFigureBlockPositions(figure).forEach(({ x, y }) => {
    boardRows[y][x] = figure.className;
  });

  currentFigure = getRandomFigure();
  renderer.renderBoardAndCurrentFigure(boardRows, currentFigure);
}

function slamCurrentFigure() {
  currentFigure = getSlammedFigure(currentFigure, boardRows);

  if (isFigurePartiallyAboveBoard(currentFigure)) {
    gameOver();
  } else {
    placeFigureInBoard(currentFigure, boardRows);
    popFullRows();
    renderer.renderBoardAndCurrentFigure(boardRows, currentFigure);
  }
}

function initKeyEventListener() {
  document.addEventListener("keypress", ({ key }) => {
    if (["ArrowLeft", "a", "A"].includes(key)) {
      moveCurrentFigureByVectorIfPossible({ x: -1, y: 0 }, boardRows);
    } else if (["ArrowRight", "d", "D"].includes(key)) {
      moveCurrentFigureByVectorIfPossible({ x: 1, y: 0 }, boardRows);
    } else if (["ArrowDown", "s", "S"].includes(key)) {
      slamCurrentFigure();
    } else if (["ArrowUp", "w", "W"].includes(key)) {
      rotateFigure(currentFigure, boardRows);
    }
  });
}

function initButtons() {
  document.getElementById("move-left-btn").onclick = () => {
    moveLeft();
  };

  document.getElementById("move-right-btn").onclick = () => {
    moveRight();
  };

  document.getElementById("rotate-btn").onclick = () => {
    rotate();
  };

  document.getElementById("slam-btn").onclick = () => {
    slamCurrentFigure();
  };
}

function moveLeft() {
  moveCurrentFigureByVectorIfPossible({ x: -1, y: 0 }, boardRows);
}

function moveRight() {
  moveCurrentFigureByVectorIfPossible({ x: 1, y: 0 }, boardRows);
}

function rotate() {
  rotateFigure(currentFigure, boardRows);
}

function popFullRows() {
  const fullRows = getFullRows(boardRows);
  boardRows = getBoardAfterPoppingRows(fullRows, boardRows);
  score += fullRows.length;
  bestScore = Math.max(bestScore, score);
  localStorage.setItem("bestScore", bestScore);
  renderer.renderScore(score);
}

function tick() {
  if (canTranslateFigureByVector(currentFigure, { x: 0, y: 1 }, boardRows)) {
    currentFigure = {
      ...currentFigure,
      y: currentFigure.y + 1,
    };
  } else if (isFigurePartiallyAboveBoard(currentFigure)) {
    gameOver();
  } else {
    placeFigureInBoard(currentFigure, boardRows);
    popFullRows();
  }
}

function gameOver() {
  alert(`Game over, your score: ${score}`);
  restartGame();
}

function gameLoop() {
  tick();
  renderer.renderBoardAndCurrentFigure(boardRows, currentFigure);
}

function rotateFigure(figure, boardRows) {
  if (!figure.rotable) {
    return;
  }

  const rotatedFigure = getRotatedFigure(figure);

  if (!canFigureBeRotatedAsNewFigure(rotatedFigure, boardRows)) {
    return;
  }

  currentFigure = rotatedFigure;

  renderer.renderBoardAndCurrentFigure(boardRows, currentFigure);
}

function setPortraitModeIfPossible() {
  try {
    screen.orientation.lock("portrait");
  } catch {}
}

export function main() {
  setPortraitModeIfPossible();
  setInterval(gameLoop, 500);
  initKeyEventListener();
  initButtons();
  restartGame();
}

const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 10;
const rows = Math.ceil(canvas.height / cellSize);
const columns = Math.ceil(canvas.width / cellSize);

let grid = [];

function createGrid() {
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < columns; x++) {
      row.push(Math.random() < 0.5 ? 0 : 1);
    }
    grid.push(row);
  }
}

createGrid();

function rule30(a, b, c) {
  return a ^ (b || c);
}

function updateGrid() {
  const newGrid = [];

  for (let y = 0; y < rows; y++) {
    const newRow = [];
    for (let x = 0; x < columns; x++) {
      const left = grid[y][(x - 1 + columns) % columns];
      const center = grid[y][x];
      const right = grid[y][(x + 1) % columns];
      newRow.push(rule30(left, center, right));
    }
    newGrid.push(newRow);
  }

  grid = newGrid;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      ctx.fillStyle = grid[y][x] ? `hsl(${(x * y) % 360}, 100%, 50%)` : 'black';
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  updateGrid();
  requestAnimationFrame(draw);
}

draw();

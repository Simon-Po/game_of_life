const WIDTH = 800;
const HEIGHT = 800;
const divisor = 4

const grid = new Array(HEIGHT / divisor);
let supportGrid = new Array (HEIGHT / divisor);

function setup() {
  gridSetup()
  
  createCanvas(WIDTH, HEIGHT);
  console.table(grid);
  for (let i = 0; i < 6000; i++) {
    fillRandomGridPoint();
  }
  createP('<p id="fps" >Hello</p>');


  
}

function draw() {
  
  drawGrid();
  checkRules();
  document.getElementById("fps").innerHTML = "Fps: " + Math.round(frameRate());
  
}


const gridSetup = () => {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(HEIGHT);
    supportGrid[i] = new Array(HEIGHT);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
      supportGrid[i][j] = 0;
    }
    
  }
}

const drawGrid = () => {
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      noStroke()
      if(grid[i][j] == 1) {
        fill(0)
      } else {
        fill(255,20)
      }
      rect((i*divisor),(j*divisor),WIDTH / grid.length,HEIGHT / grid.length)
    }
    
  }

}

const fillRandomGridPoint = () => {
  const randX = floor(random(WIDTH / divisor));
  const randY = floor(random(HEIGHT / divisor));
  
  grid[randX][randY] = 1;
}

const checkRules = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        supportGrid[i][j] = grid[i][j];
    }}
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        
          const N = countLiveNeighbours(i,j);
          if(grid[i][j] == 1 && (N < 2 || N > 3)) {
            supportGrid[i][j] = 0;
          }else if(grid[i][j] == 0 && N == 3){
            supportGrid[i][j] = 1;
          } 
        
        
      }
      
    }
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = supportGrid[i][j];
    }}
  
}

const countLiveNeighbours = (i,j) => {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) {
        continue; // skip the cell itself
      }
      const ni = (i + di + numRows) % numRows; // wrap around the rows
      const nj = (j + dj + numCols) % numCols; // wrap around the columns
      if (grid[ni][nj]) {
        count++;
      }
    }
  }
  return count;


}
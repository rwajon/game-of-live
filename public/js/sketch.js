/* eslint-disable no-unused-vars */
let grid;
let isPaused = false;
let frameRate = 5;
const [width, height] = [500, 500];

function setup() {
  window.frameRate(frameRate);
  let cnv = window.createCanvas(width, height);
  cnv.parent(document.querySelector('#grids'));
  grid = new Grid(20, width, height);
  grid.randomize();
}

function draw() {
  window.background(250);
  grid.updateNeighborCounts();
  grid.updatePopulation();
  grid.draw();
  grid.countLivingCells();
}

function pause() {
  if (isPaused) {
    window.loop();
  } else {
    window.noLoop();
  }
  isPaused = !isPaused;
  document.querySelector('.play-pause-btn').innerHTML = isPaused
    ? '<span class="fa fa-play"></span> Play'
    : '<span class="fa fa-pause"></span> Pause';
  return isPaused;
}

function stop() {
  grid.stop();
}

function replay() {
  grid.replay();
}

function forward() {
  frameRate += 5;
  window.frameRate(frameRate);
}

function backward() {
  frameRate = frameRate > 5 ? frameRate - 5 : 5;
  window.frameRate(frameRate);
}

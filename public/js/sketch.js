/* eslint-disable no-unused-vars */
let grid;
let isPaused = false;
let frameRate = 5;
let [cellSize, width, height] = [25, 500, 500];

function setup() {
  window.frameRate(frameRate);
  let cnv = window.createCanvas(width, height);
  cnv.parent(document.querySelector('#grids'));
  grid = new Grid(cellSize, width, height);
  grid.randomize();
}

function draw() {
  window.background(250);
  grid.updateNeighborCounts();
  grid.updatePopulation();
  grid.draw();
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

function onInputChange({ name, value }) {
  if (name === 'width') {
    width = value;
  } else if (name === 'height') {
    height = value;
  } else if (name === 'cellSize') {
    cellSize = value;
  }
  return { name, value };
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
  document.querySelector('#frame-rate').innerHTML = frameRate;
}

function backward() {
  frameRate = frameRate > 5 ? frameRate - 5 : 5;
  window.frameRate(frameRate);
  document.querySelector('#frame-rate').innerHTML = frameRate;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#frame-rate').innerHTML = frameRate;
  document.querySelector('form').cellSize.value = cellSize;
  document.querySelector('form').width.value = width;
  document.querySelector('form').height.value = height;

  document.querySelector('form[name="canvas-setup"]').onsubmit = e => {
    setup();
    return false;
  };
});

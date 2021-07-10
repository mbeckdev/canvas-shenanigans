'use strict';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
let heightOfCanvas = 300;
canvas.height = heightOfCanvas;
let numberOfDots = 20;

let c = canvas.getContext('2d');

c.beginPath();
c.arc(100, 100, 50, 0, Math.PI * 2, false);
c.fillStyle = 'purple';
c.fill();

function Circle(x, y, dx, dy, radius, colorString) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorString;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.updatePosition = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  };
}

function drawALine(x1, y1, x2, y2, colorString) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.strokeStyle = colorString;
  c.stroke();
}

function drawLinesToCloseDots(circleArrayIndex) {
  // we're in the middle of cycling through circleArray (all dots)
  // so, we drew one dot, now check all x and y positions of dots with
  //   i's that are less than this
  // that way we'll check all dot to dot lengths
  // then draw a line if they're close.
  if (circleArrayIndex > 0) {
    // check length to dots before this one

    let x2 = circleArray[circleArrayIndex].x;
    let y2 = circleArray[circleArrayIndex].y;
    for (let i = 1; i < circleArrayIndex + 1; i++) {
      let x1 = circleArray[circleArrayIndex - i].x;
      let y1 = circleArray[circleArrayIndex - i].y;

      let lengthBetweenDots = 0;
      lengthBetweenDots = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      );

      let colorString = '';
      let colorAlpha = 0.5;
      let endHue = 480;
      let minDistanceToDraw = 50;
      let maxDistanceToDraw = 100;

      let drawLineRange = maxDistanceToDraw - minDistanceToDraw;

      if (
        lengthBetweenDots < maxDistanceToDraw &&
        lengthBetweenDots > minDistanceToDraw
      ) {
        colorAlpha = (maxDistanceToDraw - lengthBetweenDots) / drawLineRange;

        colorString = chooseLineColor(
          120,
          endHue,
          minDistanceToDraw,
          maxDistanceToDraw,
          lengthBetweenDots
        );
        // draw line between two dots
        drawALine(x1, y1, x2, y2, colorString);
        // drawALine(x1, y1, x2, y2, 'hsla(270, 50%, 100%, 0.5)');
      } else if (lengthBetweenDots < minDistanceToDraw) {
        colorAlpha = 1;
        colorString = 'hsla(' + endHue + ', 100%, 100%, ' + colorAlpha + ')';
        drawALine(x1, y1, x2, y2, colorString);
      }
    }
  } else {
    // first dot, nothing to draw a line to
  }
}

function chooseLineColor(
  hueMin,
  hueMax,
  minDistanceToDraw,
  maxDistanceToDraw,
  lengthBetweenDots
) {
  let colorString = '';
  let drawLineRange = maxDistanceToDraw - minDistanceToDraw;
  let colorAlpha = (maxDistanceToDraw - lengthBetweenDots) / drawLineRange;

  let hueRange = hueMax - hueMin;
  let hue = colorAlpha * hueRange + hueMin;
  colorString = 'hsla(' + hue + '270, 100%, 100%, ' + colorAlpha + ')';
  return colorString;
}

function chooseCircleColor() {
  let circleColorArray = [
    'hsla(37, 96%, 55%, 1)',
    'hsla(5, 84%, 61%, 1)',
    'hsla(204, 46%, 31%, 1)',
    'hsla(187, 81%, 36%, 1)',
    'hsla(174, 73%, 45%, 1)',
  ];

  let aColor = '';
  let aColorIndex = 0;
  aColorIndex = Math.floor(Math.random() * circleColorArray.length);
  aColor = circleColorArray[aColorIndex];
  return aColor;
}

let circleArray = [];
function init() {
  decideHowManyDots();
  circleArray = [];
  for (let i = 0; i < numberOfDots; i++) {
    let radius = Math.random() * 7 + 1;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;

    // velocity
    let dx = (Math.random() - 0.5) * 2 * 0.35;
    let dy = (Math.random() - 0.5) * 2 * 0.35;

    let color = chooseCircleColor();
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].updatePosition();
    drawLinesToCloseDots(i);
  }
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
  }
}

function decideHowManyDots() {
  numberOfDots = 10;
  let bodyWidth = document.body.offsetWidth;
  let bodyHeight = document.body.offsetHeight;
  let area = bodyWidth * bodyHeight;
  numberOfDots = Math.floor(area * (10 / (300 * 300)));

  // console.log('width = ' + bodyWidth);
  // console.log('height = ' + bodyHeight);
  // .offsetWidth, .offsetHeight
  //300 300 10
  //300 600 20
}

init();
animate();

// resizing canvas when window is resized
window.addEventListener('resize', windowJustResized);
function windowJustResized() {
  canvas.width = window.innerWidth;
  canvas.height = heightOfCanvas;

  init();
}

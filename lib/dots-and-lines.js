'use strict';
// document.querySelector('body').style.background = 'hsla(180,10%,10%,1)';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.height = 300;

let c = canvas.getContext('2d');

c.beginPath();
c.arc(100, 100, 50, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
c.fillStyle = 'purple';
c.fill();
// c.stroke();

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

    // this.draw();
  };
}

function drawALine(x1, y1, x2, y2, colorString) {
  // this.x1 = x1;
  // this.y1 = y1;
  // this.x2 = x2;
  // this.y2 = y2;
  // this.color = colorString;

  // this.draw = function () {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.strokeStyle = colorString;
  c.stroke();
  // };
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

  // let hueMin = 0;
  // let hueMax = 270;
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
  circleArray = [];
  for (let i = 0; i < 10; i++) {
    let radius = Math.random() * 7 + 1;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2 * 0.35; // velocity
    let dy = (Math.random() - 0.5) * 2 * 0.35; // velocity
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
    // circleArray[i].draw();
  }
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
  }
}

init();
animate();

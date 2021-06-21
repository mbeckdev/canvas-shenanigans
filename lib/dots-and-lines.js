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

  this.update = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
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
  let number = circleArrayIndex;
  let yanumber = circleArrayIndex > 0;
  if (circleArrayIndex > 0) {
    // check length to dots before this one
    let lengthBetweenDots = 0;
    let x1 = circleArray[circleArrayIndex - 1].x;
    let y1 = circleArray[circleArrayIndex - 1].y;
    let x2 = circleArray[circleArrayIndex].x;
    let y2 = circleArray[circleArrayIndex].y;

    lengthBetweenDots = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    if (lengthBetweenDots < 500) {
      // draw line between two dots
      drawALine(x1, y1, x2, y2, 'white');
    }
  } else {
    // first dot, nothing to draw a line to
  }
}

let circleArray = [];
function init() {
  circleArray = [];
  for (let i = 0; i < 2; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2 * 0.5; // velocity
    let dy = (Math.random() - 0.5) * 2 * 0.5; // velocity
    circleArray.push(new Circle(x, y, dx, dy, radius, 'blue'));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    drawLinesToCloseDots(i);
  }
}

init();
animate();

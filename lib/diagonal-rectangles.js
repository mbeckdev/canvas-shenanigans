'use strict';

// let blob = (function () {
let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for context
// c will be our magic brush that can draw circles and squares and stuff
let c = canvas.getContext('2d');

// for interactivity
let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;
let minRadius = 2;

let colorArray = ['#331832', '#D81E5B', '#F0544F', '#C6D8D3', '#FDF0D5'];
// let colorArray = ['#ffaa33', '#99ffaa', '#00ff00', '#4411aa', '#ff1100'];

// // ***************
// // RECTANGLES
// // ***************
// // color the rectangle
// c.fillStyle = 'rgba(255,0,0,.5)';
// // c.fillRect(x, y, width, height); from top left of screen
// c.fillRect(100, 10, 20, 20);
// c.fillStyle = 'rgba(0,0,255,.5)';
// c.fillRect(100, 100, 20, 20);
// c.fillStyle = 'rgba(0,255,0,.5)';
// c.fillRect(100, 500, 20, 20);
// console.log(canvas);

// // ***************
// // LINES
// // ***************
// c.beginPath();
// // c.moveTo(x, y); start of line
// c.moveTo(50, 300);
// // c.lineTo(x, y); end of line
// c.lineTo(300, 100);
// // a third point for the line to go to
// c.lineTo(400, 300);
// // color the line
// // c.strokeStyle = "rgba()" or "#eee" or any css color
// c.strokeStyle = '#fa34a3';
// c.stroke();

// // ***************
// // ARC / CIRCLE
// // ***************
// c.beginPath();
// // c.arc(x,y,r,startAngle in rad,endAngle in rad,drawCounterClockwise)
// c.arc(300, 300, 30, 0, Math.PI * 1.5, false);
// c.strokeStyle = 'blue';
// c.stroke();

// // ***************
// // PRACTICE
// // ***************
// c.fillStyle = 'rgb(0,255,255)';
// c.fillRect(200, 200, 30, 30);

// c.beginPath();
// c.moveTo(1, 1);
// c.lineTo(100, 100);
// c.lineTo(200, 1);
// c.strokeStyle = '#abc';
// c.stroke();

// c.strokeStyle = 'red';
// for (let i = 0; i < 1000; i++) {
//   c.beginPath();
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.arc(x, y, 20, 0, Math.PI * 2 * Math.random(), false);
//   let dur = (i * 30) % 255;
//   let astr = 'rgb(' + (i % 255) + ',' + Math.random() * 255 + ',' + dur + ')';
//   // console.log(astr);
//   c.strokeStyle = astr;
//   c.stroke();
// }

// // ***************
// // MOVING A CIRCLE  - VIDEO 3
// // ***************
// // c.clearRect(x,y,width,height)

function Line(x1, y1, dx1, dy1, x2, y2, dx2, dy2) {
  this.x1 = x1;
  this.y1 = y1;
  this.dx1 = dx1;
  this.dy1 = dy1;
  this.x2 = x2;
  this.y2 = y2;
  this.dx2 = dx2;
  this.dy2 = dy2;

  this.draw = function () {
    c.beginPath();
    // c.moveTo(x, y); start of line
    c.moveTo(this.x1, this.y1);
    // c.lineTo(x, y); end of line
    c.lineTo(this.x2, this.y2);
    // color the line
    // c.strokeStyle = "rgba()" or "#eee" or any css color
    c.strokeStyle = 'rgba(0,255,0,.25)';
    c.stroke();
  };

  this.update = function () {
    if (this.x1 > innerWidth || this.x1 < 0) {
      this.dx1 = -this.dx1;
    }
    if (this.y1 > innerHeight || this.y1 < 0) {
      this.dy1 = -this.dy1;
    }
    if (this.x2 > innerWidth || this.x2 < 0) {
      this.dx2 = -this.dx2;
    }
    if (this.y2 > innerHeight || this.y2 < 0) {
      this.dy2 = -this.dy2;
    }
    this.x1 += this.dx1;
    this.y1 += this.dy1;
    this.x2 += this.dx2;
    this.y2 += this.dy2;

    this.draw();
  };
}

// FOR PASTEL COLORS
// function Circle(x, y, dx, dy, radius, r, g, b) {

// FOR USING A colorArray of colors that is set above
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  // this.dur = ;
  this.randomIndex = Math.floor(Math.random() * colorArray.length);
  this.color = colorArray[this.randomIndex];
  // console.log(this.dur);

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = 'rgba(0,0,0,0)';
    // c.stroke();

    // for PASTEL COLORS
    // c.fillStyle = `rgba(${r},${g},${b},0.5)`;

    // for using colorArray of colors
    c.fillStyle = this.color;

    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
        console.log(this.dur);
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

// set up circle for the first time
let circleArray = [];
function init() {
  circleArray = [];
  for (let i = 0; i < 2000; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2 * 0.5; // velocity
    let dy = (Math.random() - 0.5) * 2 * 0.5; // velocity
    circleArray.push(
      new Circle(x, y, dx, dy, radius)

      // PASTEL COLORS
      // new Circle(
      //   x,
      //   y,
      //   dx,
      //   dy,
      //   radius,
      //   Math.random() * 255,
      //   (Math.random() * 255) / 2 + 255 / 2,
      //   (Math.random() * 255) / 2 + 255 / 2
      // )
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  // for (let i = 0; i < lineArray.length; i++) {
  //   lineArray[i].update();
  // }
}

init();
animate();

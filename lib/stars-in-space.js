'use strict';
// document.querySelector('body').style.background = 'hsla(180,10%,10%,1)';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
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
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

let circleArray = [];
function init() {
  circleArray = [];
  for (let i = 0; i < 100; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
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
  }
}

init();
animate();

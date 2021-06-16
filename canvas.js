'use strict';

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for context
// c will be our magic brush that can draw circles and squares and stuff
let c = canvas.getContext('2d');

// ***************
// RECTANGLES
// ***************
// color the rectangle
c.fillStyle = 'rgba(255,0,0,.5)';
// c.fillRect(x, y, width, height); from top left of screen
c.fillRect(100, 10, 20, 20);
c.fillStyle = 'rgba(0,0,255,.5)';
c.fillRect(100, 100, 20, 20);
c.fillStyle = 'rgba(0,255,0,.5)';
c.fillRect(100, 500, 20, 20);
console.log(canvas);

// ***************
// LINES
// ***************
c.beginPath();
// c.moveTo(x, y); start of line
c.moveTo(50, 300);
// c.lineTo(x, y); end of line
c.lineTo(300, 100);
// a third point for the line to go to
c.lineTo(400, 300);
// color the line
// c.strokeStyle = "rgba()" or "#eee" or any css color
c.strokeStyle = '#fa34a3';
c.stroke();

// ***************
// ARC / CIRCLE
// ***************
c.beginPath();
// c.arc(x,y,r,startAngle in rad,endAngle in rad,drawCounterClockwise)
c.arc(300, 300, 30, 0, Math.PI * 1.5, false);
c.strokeStyle = 'blue';
c.stroke();

// ***************
// PRACTICE
// ***************
c.fillStyle = 'rgb(0,255,255)';
c.fillRect(200, 200, 30, 30);

c.beginPath();
c.moveTo(1, 1);
c.lineTo(100, 100);
c.lineTo(200, 1);
c.strokeStyle = '#abc';
c.stroke();

c.strokeStyle = 'red';
for (let i = 0; i < 1000; i++) {
  c.beginPath();
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  c.arc(x, y, 20, 0, Math.PI * 2 * Math.random(), false);
  let dur = (i * 30) % 255;
  let astr = 'rgb(' + (i % 255) + ',' + Math.random() * 255 + ',' + dur + ')';
  // console.log(astr);
  c.strokeStyle = astr;
  c.stroke();
}

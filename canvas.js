'use strict';

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for context
// c will be our magic brush that can draw circles and squares and stuff
let c = canvas.getContext('2d');

// c.fillRect(x, y, width, height); from top left of screen
c.fillRect(100, 200, 300, 400);
c.fillRect(10, 10, 300, 10);
c.fillRect(10, 50, 10, 10);
console.log(canvas);

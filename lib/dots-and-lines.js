'use strict';
document.querySelector('body').style.background = 'hsla(180,10%,10%,1)';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = 300;

let c = canvas.getContext('2d');

c.beginPath();
c.arc(100, 100, 50, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
c.fillStyle = 'red';
c.fill();
// c.stroke();

function animate() {
  requestAnimationFrame(animate);
}
animate();

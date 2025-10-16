let song;
let stars = [];
let fft;
let amp;
let level;
let starsImg; 
let angle = 0;
let time = 0;
let baseRadius;

// loop: 3:22 -> 3:52 (202s -> 232s) => 50s duration
const loopStartSec = 3 * 60 + 22;
const loopDuration = 50;

function preload() {
  // load Midnight from the assets folder
  song = loadSound('assets/Midnight.mp3');
  //load images
  starsImg = loadImage('assets/stars.png');
}

function setup() {
  createCanvas(1000, 1000);
  amp= new p5.Amplitude();
  amp.setInput(song);
  baseRadius = width/2.3;

//40 stars generated
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(50, 150),
      angle: random(TWO_PI),
      rotationSpeed: random(-0.01, 0.01),
      //velocities for x and y
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5)
    });
  }
}

function draw() {
background(39, 53, 81);

 //gradient circle in the background
  let centerX = width/2;
  let centerY = height/2;
 // Make radius grow and shrink using sin()
 //amount of growth/shrink
  let radiusOffset = sin(time) * 75; 
  let radius = baseRadius + radiusOffset;
  
  // Draw gradient using concentric circles for loop
  for (let r = radius; r > 0; r -= 2) {
    let inter = map(r, 0, radius, 0, 1);
    let c = lerpColor(color(87, 129, 158), color(39, 53, 81), inter); // light blue to background color
    noStroke();
    fill(c);
    circle(centerX, centerY, r * 2);
  }
  //timing for radius animation
  time += 0.02;

 if (song.isPlaying()) {
   level = amp.getLevel();
   starSize = map(level, 0, 1, 30, 250);

   //for loop to make 40 stars randomly move on canvas
   for (let i = 0; i < 40; i++) {
     stars[i].x += stars[i].vx;
     stars[i].y += stars[i].vy;

      // edge collision detection (not very exact since the stars vary in size but it works)
      if (stars[i].x < -starSize) stars[i].x = width + starSize;
      if (stars[i].x > width + starSize) stars[i].x = -starSize;
      if (stars[i].y < -starSize) stars[i].y = height + starSize;
      if (stars[i].y > height + starSize) stars[i].y = -starSize;

      let x = stars[i].x;
      let y = stars[i].y;

     push();
     translate(x, y);
     rotate(stars[i].angle);
     // Offset x and y by half the star size to center the image
     image(starsImg, -starSize/2, -starSize/2, starSize, starSize);
     pop();
   //the star angles for rotation
    stars[i].angle += stars[i].rotationSpeed;
 }
}
}
//if mouse is pressed, start or stop clip
 function mousePressed() {
   if (song.isPlaying()) {
     song.stop();
   } else {
     song.play(0, 1, 1, loopStartSec, loopDuration);
   }


 }

let song;
let stars = [];
let fft;
let amp;
let level;
let starsImg; 
let angle = 0;

// loop: 3:22 -> 3:52 (202s -> 232s) => 30s duration
const loopStartSec = 3 * 60 + 22;
const loopDuration = 30;

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
  
//40 stars generated 
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(50, 150),
      angle: random(TWO_PI),
      rotationSpeed: random(-0.01, 0.01)
    });
  }
}

function draw() {
background(39, 53, 81);
//if mouse is pressed, start loop
 if (song.isPlaying()) {
   level = amp.getLevel();
   starSize = map(level, 0, 1, 20, 250);

   //for loop to make 40 stars randomly placed on canvas vary in size
   for (let i = 0; i < 40; i++) {
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

 function mousePressed() {
   if (song.isPlaying()) {
     song.stop();
   } else {
     song.loop(0, 1, 1, loopStartSec, loopDuration);
   }


 }

function drawStars(){
    
   }

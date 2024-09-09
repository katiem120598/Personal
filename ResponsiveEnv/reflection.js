let angle = 0; // Initialize rotation angle
let dimx, dimy;
let mirstartx, mirstarty, mirdx, mirdy;
let sqsize=20
let rayslope = 2;
let projang = 0;

function setup() {
  pixelDensity(1);
  dimx = windowHeight - 200;
  dimy = dimx;
  createCanvas(dimx, dimy);
  background(255,255,255);
  frameRate(60);
  stroke(0);

  // Initializing values
  mirstartx = 50;
  mirstarty = dimy/2;
  mirdx = 150; // Adjusted for better visualization
  mirdy = 0; // Adjusted for better visualization
}

function draw() {
  background(255,255,255); // Clear the canvas on each draw


  //MIRROR 

  // Calculate the center of the line
  let mircentx = mirstartx+(mirdx) / 2;
  let mircenty = mirstarty+(mirdy) / 2;

  // Move the origin to the center of the line
  push();
  translate(mircentx, mircenty);

  // Check if the up arrow is pressed and increase the angle
  if (keyIsDown(RIGHT_ARROW)) {
    angle += 0.01; // Increase the angle to rotate
  }
  if (keyIsDown(LEFT_ARROW)){
    angle -= 0.01;
  }
  if (keyIsDown(UP_ARROW)) {
    mirstarty-=1; // Increase the angle to rotate
  }
  if (keyIsDown(DOWN_ARROW)){
    mirstarty+=1;
  }

  // Rotate around the center
  rotate(angle);
  // Draw the line
  let x1 = -mirdx / 2;
  let x2 = mirdx / 2;
  let y1 = -mirdy / 2;
  let y2 = mirdy / 2;
  let dx = x2-x1;
  let dy = y2-y1;
  let slope = tan(angle);
  console.log(slope)
  line(x1,y1,x2,y2);
  pop();


  //PROJECTOR
  push();
  fill(0);
  square(mircentx-sqsize/2,dimy-50,sqsize);
  pop();


  //CENTER LINE
  push();
  strokeWeight(0.5);
  stroke(0,0,0,100);
  //line(mircentx,dimy-50,mircentx,mircenty)

  //SIDE LINES
  translate(mircentx, dimy-50);

  rotate(projang);
  xint1 = -(mircenty-dimy+50)/(tan(angle)-rayslope);
  yint1 = rayslope*xint1;
  xint2 = -(mircenty-dimy+50)/(tan(angle)+rayslope);
  yint2 = -rayslope*xint2;

  //WATER LINES
  xnorm = 100;
  line(0,0,xint1,yint1);
  line(0,0,xint2,yint2);
  translate(xint1,yint1);
  let reflectionPoint1 = reflectAcrossLine(xint1, yint1, (tan(angle)), 0);
  line(0,0,reflectionPoint1.x,reflectionPoint1.y);
  pop();

  push();
  strokeWeight(0.5);
  stroke(0,0,0,100);
  translate(mircentx, dimy-50);
  translate(xint2,yint2);
  let reflectionPoint2 = reflectAcrossLine(xint2, yint2, (tan(angle)), 0);
  line(0,0,reflectionPoint2.x,reflectionPoint2.y);
  pop();

  //ROTATE PROJECTOR
  push();
  translate(mircentx,dimy-50);

  pop();

  //drawIntersectingLine(mircentx, dimy - 50, angle, mirstartx, mirstarty, mirdx, mirdy);
}

function reflectAcrossLine(x, y, m, c) {
  // For a point (x, y) and a line defined by y = mx + c
  // Formula for reflection across the line: (Derived from line reflection formulas)
  let d = (x + (y - c) * m) / (1 + m * m);
  let x2 = 2 * d - x;
  let y2 = 2 * d * m - y + 2 * c;
  
  return {x: x2, y: y2};
}
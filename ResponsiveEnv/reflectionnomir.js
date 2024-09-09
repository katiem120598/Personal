let angle = 0; // Initialize rotation angle
let dimx, dimy;
let mirstartx, mirstarty, mirdx, mirdy;
let sqsize=20
let rayslope = 2;
let projang = 0;
let rsnum1 = 0;
let rsdenom1 = 0;
let rpnum1 =0;
let rpdenom1 =0;
let rs1 = 0;
let rp1 = 0;
let intensity1 =1;
let rsnum2 = 0;
let rsdenom2 = 0;
let rpnum2 =0;
let rpdenom2 =0;
let rs2 = 0;
let rp2 = 0;
let intensity2 =1;
let angchange = 0.523599;

function setup() {
  pixelDensity(1);
  dimx = 500;
  dimy = 500;
  createCanvas(dimx, dimy);
  background(255,255,255);
  frameRate(60);
  stroke(0);

  // Initializing values
  mirstartx = 25;
  mirstarty = dimy/2;
  mirdx = 25; // Adjusted for better visualization
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
  if (keyIsDown(LEFT_ARROW)) {
    angle += 0.01; // Increase the angle to rotate
  }
  if (keyIsDown(RIGHT_ARROW)){
    angle -= 0.01;
  }
  if (keyIsDown(68)) {
    mirstarty-=2; // Increase the angle to rotate
  }
  if (keyIsDown(70)){
    mirstarty+=2;
  }
  if (keyIsDown(83)) {
    mirstartx+=2; // Increase the angle to rotate
  }
  if (keyIsDown(65)){
    mirstartx-=2;
  }


  // Rotate around the center
  rotate(angle);
  console.log(angle);
  // Draw the line
  let x1 = -mirdx / 2;
  let x2 = mirdx / 2;
  let y1 = -mirdy / 2;
  let y2 = mirdy / 2;
  let dx = x2-x1;
  let dy = y2-y1;
  let slope = tan(angle);
  //console.log(slope)
  fill(0,0,0);
  let projwidth = 30;
  rect(-projwidth/2,0,projwidth,-10);
  //line(x1,y1,x2,y2);
  strokeWeight(0.5);
  stroke(0,0,0,100);

  xint1 = -(mircenty-dimy+50)/(tan(angle)-rayslope);
  yint1 = rayslope*xint1;
  xint2 = -(mircenty-dimy+50)/(tan(angle)+rayslope);
  yint2 = -rayslope*xint2;
  pop();

  push();
    //WATER LINES
    xnorm = 100;
    fill(105,190,247,150);
    stroke(105,190,247);
    rect(0,dimy-50,dimx,dimy);
    //line(0,dimy-50,dimx,dimy-50);
    stroke(50,50,255);
    //console.log(dimy-mircenty);
    projx1 = (dimy-mircenty-50)/(tan(1.0472+angle));
    projy1 = dimy-mircenty-50;
    slope1 = projy1/projx1;
    projx2 = (dimy-mircenty-50)/(-tan(1.0472-angle));
    projy2 = dimy-mircenty-50;
    slope2 = projy2/projx2;
    midang = tan(1.0472+angle)/2-tan(1.0472-angle)/2;
    projx3 = (dimy-mircenty-50)/tan(angle+1.5708);
    projy3 = dimy-mircenty-50;
    //line(0,0,50,rayslope*50);
    line(mircentx,mircenty,mircentx+projx1,mircenty+projy1);
    stroke(255,50,50);
    line(mircentx,mircenty,mircentx+projx2,mircenty+projy2);
    stroke(152.5,50,152.5);
    line(mircentx,mircenty,mircentx+projx3,mircenty+projy3);
    
    translate(mircentx+projx1,mircenty+projy1);

    
    rsnum1 = cos(-angle+angchange)-1.33*Math.sqrt(1-0.75*(sin(-angle+angchange))**2);
    rsdenom1 = cos(-angle+angchange)+1.33*Math.sqrt(1-0.75*(sin(-angle+angchange))**2);
    rpnum1 = Math.sqrt(1-0.75*(sin(-angle+angchange))**2)-1.33*cos(-angle+angchange);
    rpdenom1 = Math.sqrt(1-0.75*(sin(-angle+angchange))**2)+1.33*cos(-angle+angchange);
    rs1 = (Math.abs(rsnum1/rsdenom1))**2;
    rp1 = (Math.abs(rpnum1/rpdenom1))**2;
    intensity1 = 0.5*(rs1+rp1);

    rsnum2 = cos(-angle-angchange)-1.33*Math.sqrt(1-0.75*(sin(-angle-angchange))**2);
    rsdenom2 = cos(-angle-angchange)+1.33*Math.sqrt(1-0.75*(sin(-angle-angchange))**2);
    rpnum2 = Math.sqrt(1-0.75*(sin(-angle-angchange))**2)-1.33*cos(-angle-angchange);
    rpdenom2 = Math.sqrt(1-0.75*(sin(-angle-angchange))**2)+1.33*cos(-angle-angchange);
    rs2 = (Math.abs(rsnum2/rsdenom2))**2;
    rp2 = (Math.abs(rpnum2/rpdenom2))**2;
    intensity2 = 0.5*(rs2+rp2);

    rsnum3 = cos(-angle-angchange)-1.33*Math.sqrt(1-0.75*(sin(-angle-angchange))**2);
    rsdenom3 = cos(-angle-angchange)+1.33*Math.sqrt(1-0.75*(sin(-angle-angchange))**2);
    rpnum3 = Math.sqrt(1-0.75*(sin(-angle-angchange))**2)-1.33*cos(-angle-angchange);
    rpdenom3 = Math.sqrt(1-0.75*(sin(-angle-angchange))**2)+1.33*cos(-angle-angchange);
    rs3 = (Math.abs(rsnum3/rsdenom3))**2;
    rp3 = (Math.abs(rpnum3/rpdenom3))**2;
    intensity3 = 0.5*(rs3+rp3);

    stroke(50,50,255,intensity1*255);
    newx1 = dimx-mircentx-projx1-25;
    if(mircentx+projx1>mircentx){
        line(0,0,newx1,-slope1*newx1);
    }
    else{
        line(0,0,-mircentx,slope1*mircentx);
    }
    translate(-mircentx-projx1,-mircenty-projy1);

    translate(mircentx+projx2,mircenty+projy2);
    stroke(255,50,50,intensity2*255);
    newx2 = dimx-mircentx-projx2-25;
    if(mircentx+projx2>mircentx){
        line(0,0,newx2,-slope2*newx2);
    }
    else{
        line(0,0,-mircentx,slope2*mircentx);
    }
    

    //line(0,0,reflectionPoint2.x,reflectionPoint2.y);
  pop();

    line(dimx-25,dimy-50,dimx-25,0);


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
var capture;
var currentFilter;

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  // Set Color of Background
  clear();
  // Capture Video
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment",
      },
    },
  };
  capture = createCapture(constraints);
  capture.size(width / 1.65, height / 1.5);
  capture.hide(capture);
  // Set Title Text and location of bottom left corner
  textSize(48);
  let txt = "How Does My Pet See?";
  text(txt, width / 2 - textWidth(txt) / 2, 25, 600, 100);

  // Create Reset button
  buttonReset = createButton("Back to Beginning");
  buttonReset.style("font-size", "18px");
  // Set Reset button bottom left corner
  var buttonBody = buttonReset.width / 2;
  buttonReset.position(width / 2 - buttonBody, 100);
  // Set what happens when you press reset button
  buttonReset.mousePressed(changeBack);

  // Create Dog button
  buttonDog = createButton("DOG");
  buttonDog.size(190, 75);
  buttonDog.position(
    width / 2 - capture.width / 3 - buttonDog.width / 2,
    height / 2 + capture.height / 1.58
  );
  buttonDog.style("font-size", "24px");
  buttonDog.mousePressed(changeDog);

  // Create Bird button
  buttonBird = createButton("BIRD");
  buttonBird.size(190, 75);
  buttonBird.position(
    width / 2 - buttonBird.width / 2,
    height / 2 + capture.height / 1.58
  );
  buttonBird.style("font-size", "24px");
  buttonBird.mousePressed(changeBird);

  // Create Fish button
  buttonFish = createButton("FISH");
  buttonFish.size(190, 75);
  buttonFish.position(
    width / 2 + capture.width / 3 - buttonFish.width / 2,
    height / 2 + capture.height / 1.58
  );
  buttonFish.style("font-size", "24px");
  buttonFish.mousePressed(changeFish);

  currentFilter = 0;
}

function draw() {
  // Set image location to start from Center
  imageMode(CENTER);

  // Default mode
  if (currentFilter == 0) {
    drawingContext.restore();
    image(capture, width / 2, height / 1.5 - capture.height / 8);

    // Dog Filter
  } else if (currentFilter == 1) {
    capture.loadPixels();
    for (var index = 0; index < capture.pixels.length; index += 4) {
      var r = capture.pixels[index + 0];
      var g = capture.pixels[index + 1];
      var b = capture.pixels[index + 2];
      var a = capture.pixels[index + 3];

      var tr = r * 0.32 + g * 0.85 + b * 0.01;
      var tg = r * 0.25 + g * 0.68 + b * 0.07;
      var tb = r * 0.01 + g * 0.01 + b * 0.9;
      capture.pixels[index + 0] = tr;
      capture.pixels[index + 1] = tg;
      capture.pixels[index + 2] = tb;
      capture.pixels[index + 3] = a * 0.85;
    }
    capture.updatePixels();
    image(capture, width / 2, height / 1.5 - capture.height / 8);
    // Blur effect, increase by making the number bigger (causes the screen to move down somewhat)
    drawingContext.filter = "blur(2px";
    // Bird Filter
  } else if (currentFilter == 2) {
    drawingContext.restore();
    capture.loadPixels();
    for (var index = 0; index < capture.pixels.length; index += 4) {
      var r = capture.pixels[index + 0];
      var g = capture.pixels[index + 1];
      var b = capture.pixels[index + 2];
      var a = capture.pixels[index + 3];

      var tr = r * 1 + g * 0.1 + b * 0.2;
      var tg = r * 0.1 + g * 0.9 + b * 0.1;
      var tb = r * 0.25 + g * 0.25 + b * 1;

      capture.pixels[index + 0] = tr - 10;
      capture.pixels[index + 1] = tg;
      capture.pixels[index + 2] = tb - 10;
      capture.pixels[index + 3] = a * 2;
    }
    capture.updatePixels();
    image(capture, width / 2, height / 1.5 - capture.height / 8);
    // Fish Filter
  } else if (currentFilter == 3) {
    drawingContext.restore();
    capture.loadPixels();
    // Set the Offset, without this it makes the lens in the top left corner
    let x = int(capture.width / 2);
    let y = int(capture.height * 1.2);
    // Size of the lens
    var lSize = int(sqrt(capture.width * capture.height * 1.5)),
      lSize2 = lSize * lSize;
    // Magnification amount
    var mag = 1.0;
    // Controls the amount of distortion
    var k = 0.000001;
    var u, v, r2;
    // This creates the Lens
    for (var vd = -lSize; vd < lSize; vd++) {
      for (var ud = -lSize; ud < lSize; ud++) {
        r2 = ud * ud + vd * vd;
        if (r2 <= lSize2) {
          var f = mag + k * r2;
          u = floor(ud / f) + x;
          v = floor(vd / f) + y;
          var px = ud + x;
          var py = vd + y;
          if (px >= 0 && px < width && py >= 0 && py < height) {
            if (u >= 0 && u < capture.width && v >= 0 && v < capture.height) {
              // Convert where the lens currently is on the video to a pixels[] index, multiply by 4 to cover the whole video
              let index = (px + capture.width * py) * 4;
              // Convert what the lens wants to be to a pixels[] index, must multiply by 4 or you get static
              let temp = (u + capture.width * v) * 4;
              capture.pixels[index + 0] = capture.pixels[temp + 0];
              capture.pixels[index + 1] = capture.pixels[temp + 1];
              capture.pixels[index + 2] = capture.pixels[temp + 2];
              capture.pixels[index + 3] = capture.pixels[temp + 3];
            }
          }
        }
      }
    }
    for (var index = 0; index < capture.pixels.length; index += 4) {
      var r = capture.pixels[index + 0];
      var g = capture.pixels[index + 1];
      var b = capture.pixels[index + 2];
      var a = capture.pixels[index + 3];

      var tr = r * 1 + g * 0.1 + b * 0.2;
      var tg = r * 0.1 + g * 0.9 + b * 0.1;
      var tb = r * 0.25 + g * 0.25 + b * 1;

      capture.pixels[index + 0] = tr - 10;
      capture.pixels[index + 1] = tg;
      capture.pixels[index + 2] = tb - 10;
      capture.pixels[index + 3] = a * 2;
    }
    capture.updatePixels();
    image(capture, width / 2, height / 1.5 - capture.height / 8);
  }
}

function changeBack() {
  // Resets the page
  setup();
}

function changeDog() {
  currentFilter = 1;
}

function changeBird() {
  currentFilter = 2;
}

function changeFish() {
  currentFilter = 3;
}

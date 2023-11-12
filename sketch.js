var capture;
var currentFilter;

function setup() {
  createCanvas(500, 500);
  // Set Color of Background
  clear();
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment",
      },
    },
  };
  // Capture Video
  capture = createCapture(constraints);
  capture.size(320, 240);
  capture.hide();
  // Set Title Text and location of bottom left corner
  let txt = createDiv("How Does My Pet See?");
  txt.position(200, 15);
  // Create Reset button
  buttonReset = createButton("Back to Beginning");
  // Set Reset button bottom left corner
  buttonReset.position(210, 35);
  // Set what happens when you press reset button
  buttonReset.mousePressed(changeBack);

  // Create Dog button
  buttonDog = createButton("DOG");
  buttonDog.position(0, 500);
  buttonDog.mousePressed(changeDog);

  // Create Bird button
  buttonBird = createButton("BIRD");
  buttonBird.position(150, 500);
  buttonBird.mousePressed(changeBird);

  // Create Fish button
  buttonFish = createButton("FISH");
  buttonFish.position(350, 500);
  buttonFish.mousePressed(changeFish);

  currentFilter = 0;
}

function draw() {
  image(capture, 100, 100, 320, 240);
  if (currentFilter == 1) {
    loadPixels();
    for (var y = 0; y < height * 3; y++) {
      for (var x = 0; x < width; x++) {
        var index = (x + y * width) * 4;
        var r = pixels[index + 0];
        var g = pixels[index + 1];
        var b = pixels[index + 2];
        var a = pixels[index + 3];

        var bw = (r + g + b) / 3;

        pixels[index + 0] = bw;
        pixels[index + 1] = bw;
        pixels[index + 2] = bw;
      }
    }
    updatePixels();
  } else if (currentFilter == 2) {
    loadPixels();
    for (var y = 0; y < height * 3; y++) {
      for (var x = 0; x < width; x++) {
        var index = (x + y * width) * 4;
        var r = pixels[index + 0];
        var g = pixels[index + 1];
        var b = pixels[index + 2];
        var a = pixels[index + 3];

        pixels[index + 0] = r;
        pixels[index + 1] = g;
        pixels[index + 2] = b;
        pixels[index + 3] = a * 0.5;
      }
    }
    updatePixels();
  } else if (currentFilter == 3) {
    loadPixels();
    for (var y = 0; y < height * 3; y++) {
      for (var x = 0; x < width; x++) {
        var index = (x + y * width) * 4;
        var r = pixels[index + 0];
        var g = pixels[index + 1];
        var b = pixels[index + 2];
        var a = pixels[index + 3];

        pixels[index + 0] = 255 - r;
        pixels[index + 1] = 255 - g;
        pixels[index + 2] = 255 - b;
      }
    }
    updatePixels();
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

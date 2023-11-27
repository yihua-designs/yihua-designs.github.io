var capture;
var currentFilter;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
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
  capture.size(width / 1.75, height / 1.5);
  console.log(capture.width);
  console.log(capture.height);
  capture.hide();
  // Set Title Text and location of bottom left corner
  let txt = createDiv("How Does My Pet See?");
  txt.style("font-size", "48px");
  var textbody = txt.width / 8;
  txt.position(width / 2 - textbody, 50);
  console.log(txt.width);

  // Create Reset button
  buttonReset = createButton("Back to Beginning");
  // Set Reset button bottom left corner
  buttonReset.size(300, 50);
  buttonReset.position(width / 2 - 150, 150);
  buttonReset.style("font-size", "18px");
  // Set what happens when you press reset button
  buttonReset.mousePressed(changeBack);

  // Create Dog button
  buttonDog = createButton("DOG");
  buttonDog.position(width / 2 - 400, height / 2 + 300);
  buttonDog.size(200, 100);
  buttonDog.style("font-size", "24px");
  buttonDog.mousePressed(changeDog);

  // Create Bird button
  buttonBird = createButton("BIRD");
  buttonBird.size(200, 100);
  buttonBird.position(width / 2 - 100, height / 2 + 300);
  buttonBird.style("font-size", "24px");
  buttonBird.mousePressed(changeBird);

  // Create Fish button
  buttonFish = createButton("FISH");
  buttonFish.position(width / 2 + 200, height / 2 + 300);
  buttonFish.size(200, 100);
  buttonFish.style("font-size", "24px");
  buttonFish.mousePressed(changeFish);

  currentFilter = 0;
}

function draw() {
  imageMode(CENTER);
  if (currentFilter == 0) {
    image(capture, width / 2, height / 2);
  }
  // Dog Filter
  if (currentFilter == 1) {
    image(capture, width / 2, height / 2);
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
    // Bird Filter
  } else if (currentFilter == 2) {
    image(capture, width / 2, height / 2);
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
    // Fish Filter
  } else if (currentFilter == 3) {
    let img = capture.get();
    loadPixels();
    let x = 225;
    let y = 200;
    var lsize = 50,
      lsize2 = lsize * lsize;
    var mag = 2.0;
    var k = -0.00016;
    var u, v, r2;
    for (var vd = -lsize; vd < lsize; vd++) {
      for (var ud = -lsize; ud < lsize; ud++) {
        r2 = ud * ud + vd * vd;
        if (r2 <= lsize2) {
          var f = mag + k * r2;
          u = floor(ud / f) + x;
          v = floor(vd / f) + y;
          var px = ud + x;
          var py = vd + y;
          if (px >= 0 && px < width && py >= 0 && py < height) {
            if (u >= 0 && u < img.width && v >= 0 && v < img.height) {
              set(ud + x, vd + y, img.get(u, v));
            } else {
              set(ud + x, vd + y);
            }
          }
        }
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

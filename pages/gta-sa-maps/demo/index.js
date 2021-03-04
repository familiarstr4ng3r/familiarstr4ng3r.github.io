
// ! https://www.youtube.com/watch?v=Aew5auHUzLY
// ! https://dev.to/stackfindover/zoom-image-point-with-mouse-wheel-11n3

const maxZoomValue = 10;
const zoomValue = 0.2;

let scale = 1;
let isPanning = false;
let pointVector = createVector(0, 0);
let startVector = createVector(0, 0);

const zoom = document.querySelector(".zoom");

// ! vectors

function createVector(x, y) {
  return { x, y };
}

function subtractVectors(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

function multiplyVector(a, value) {
  return { x: a.x * value, y: a.y * value };
}

function divideVector(a, value) {
  return { x: a.x / value, y: a.y / value };
}

// ! events

zoom.addEventListener("mousedown", event => {
  isPanning = true;

  const mouseVector = getMouseVector(event);
  startVector = subtractVectors(mouseVector, pointVector);
});

zoom.addEventListener("mouseup", event => {
  isPanning = false;
});

zoom.addEventListener("mouseleave", event => {
  isPanning = false;
});

zoom.addEventListener("mousemove", event => {
  if (!isPanning) return;

  const mouseVector = getMouseVector(event);
  pointVector = subtractVectors(mouseVector, startVector);

  setTransform();
});

zoom.addEventListener("mousewheel", event => {
  event.preventDefault();

  // my
  const temp = subtractVectors(getMouseVector(event), pointVector);
  const value = divideVector(temp, scale);

  // other
  //const xs = (event.clientX - pointVector.x) / scale;
  //const ys = (event.clientY - pointVector.y) / scale;

  const sign = Math.sign(event.deltaY);
  scale += sign * zoomValue;

  if (scale < 1) scale = 1;
  else if (scale > maxZoomValue) scale = maxZoomValue;

  // other
  //pointVector.x = event.clientX - xs * scale;
  //pointVector.y = event.clientY - ys * scale;

  // my
  pointVector = subtractVectors(getMouseVector(event), multiplyVector(value, scale));
  
  setTransform();
});

function getMouseVector(event) {
  return createVector(event.clientX, event.clientY);
}

function setTransform() {
  // pointVector.x = ~~pointVector.x;
  // pointVector.y = ~~pointVector.y;

  const value = `translate(${pointVector.x}px, ${pointVector.y}px) scale(${scale})`;
  zoom.style.transform = value;

}
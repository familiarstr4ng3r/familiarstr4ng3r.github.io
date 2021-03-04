
// ! dom

//const content = document.getElementById("content");

const container = document.querySelector(".container");
const mapOverflow = document.querySelector("#map-overflow")
const mapContainer = document.querySelector("#map-container");

// ! panning variables

const useShiftKey = false;

let isKeyPressed = false;
let isPanning = false;
let startVector;
let scrollVector;

// ! vectors

function createVector(x, y) {
  return { x, y };
}

function subtractVectors(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

function getMouseVector(event) {
  const pageVector = createVector(event.pageX, event.pageY);
  const offsetVector = createVector(mapContainer.offsetLeft, mapContainer.offsetTop);
  return subtractVectors(pageVector, offsetVector);
}

// ! events

mapContainer.addEventListener("mousedown", event => {

  if (useShiftKey) {
    if (!isKeyPressed) return;
  }

  isPanning = true;
  container.classList.add("active");

  startVector = getMouseVector(event);
  scrollVector = createVector(mapOverflow.scrollLeft, mapOverflow.scrollTop);
});

mapContainer.addEventListener("mouseup", event => {
  onDisable();
});

mapContainer.addEventListener("mouseleave", event => {
  onDisable();
});

mapContainer.addEventListener("mousemove", event => {
  if (!isPanning) return;

  const temp = getMouseVector(event);
  const walk = subtractVectors(temp, startVector);

  mapOverflow.scrollLeft = scrollVector.x - walk.x;
  mapOverflow.scrollTop = scrollVector.y - walk.y;
});

function onDisable() {
  isPanning = false;
  container.classList.remove("active");
}

// ! use keyboards events if needed

mapContainer.addEventListener("mousewheel", event => {
  event.preventDefault();
  // console.log(event.deltaY);
});

if (useShiftKey) {

  mapContainer.addEventListener("keydown", event => {
    if (event.shiftKey) {
      isKeyPressed = true;
    }
  });
  
  mapContainer.addEventListener("keyup", event => {
    isKeyPressed = false;
    onDisable();
  });

}
// ! markers 

const markers = [];
const states = new Array(100).fill(false);

main();

async function main() {
  const response = await fetch("../json/map-tags.json");
  const tags = await response.json();

  const parent = document.getElementById("map-container");

  if (!parent) return;
  
  tags.forEach((tag, index) => {
    const rect = tag.coords.split(",").map(value => +value);
    const [left, top, ...rest] = rect;

    const div = document.createElement("div");
    div.className = "marker";

    div.style.left = left + "px";
    div.style.top = top + "px";

    div.innerHTML = `
      <span>${index + 1}</span>
    `;

    div.addEventListener("click", event => onMarkerClick(index));

    markers.push(div);
    
    parent.appendChild(div);
  });

  updateMarkers();
}

function onMarkerClick(index) {
  states[index] = !states[index];
  updateMarkers();
}

function updateMarkers() {
  markers.forEach((marker, index) => {
    const classList = ["marker"];
    classList.push(states[index] ? "green" : "red");
    marker.className = classList.join(" ");
  });
}
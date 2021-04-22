

const fileList = document.querySelector("#file-list");
const btnClear = document.querySelector("#btn-clear");

const inputGridX = document.querySelector("#input-grid-x");
const inputGridY = document.querySelector("#input-grid-y");
const inputPivotX = document.querySelector("#input-pivot-x");
const inputPivotY = document.querySelector("#input-pivot-y");

const btnPackGrid = document.querySelector("#btn-pack-grid");
const btnPackHorizontal = document.querySelector("#btn-pack-horizontal");
const btnPackVertical = document.querySelector("#btn-pack-vertical");

const style = document.querySelector(":root").style;
const gridContent = document.querySelector("#grid-content");
const gridCheckbox = document.querySelector("#checkbox-grid");

let packer = null;

const loadedFiles = [];

clearChildrens(fileList);

btnClear.addEventListener("click", event => {
  clearChildrens(fileList);
  loadedFiles.splice(0, loadedFiles.length);
});

btnPackGrid.addEventListener("click", event => {
  if (alertAction()) return;

  loadImages().then(images => {
    packer = new AtlasPacker(images);
    const { grid, pivot } = getOptions();  
    packer.createGrid(grid, pivot).then(value => onImageCreated(value));
  });
});

btnPackHorizontal.addEventListener("click", event => {
  if (alertAction()) return;

  loadImages().then(images => {
    packer = new AtlasPacker(images);
    const { grid, pivot } = getOptions();
    packer.createHorizontal(pivot).then(value => onImageCreated(value));
  });
});

btnPackVertical.addEventListener("click", event => {
  if (alertAction()) return;

  loadImages().then(images => {
    packer = new AtlasPacker(images);
    const { grid, pivot } = getOptions();
    packer.createVertical(pivot).then(value => onImageCreated(value));
  });
});

gridCheckbox.addEventListener("change", event => {
  const value = gridCheckbox.checked;
  gridContent.className = value ? "grid visible" : "grid";
});

// !

function alertAction() {
  if (loadedFiles.length == 0) {
    alert("Please load files!");
    return true;
  }
  return false;
}

function clearChildrens(element) {
  while (element.firstElementChild) element.firstElementChild.remove();
}

function addFiles(fileArray) {
  fileArray.forEach(file => loadedFiles.push(file));
  fileArray.forEach(file => {
    const li = document.createElement("li");
    fileList.appendChild(li);
    li.textContent = file.name;
  });
}

function loadImages() {
  return new Promise((resolve, reject) => {
    const promises = loadedFiles.map(file => getImage(file));
    Promise.all(promises).then(buffers => {
      const jimps = buffers.map(buffer => Jimp.read(buffer));
      Promise.all(jimps).then(images => resolve(images));
    });
  });
}

function getImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    }
  });
};

function getOptions() {
  const grid = {
    x: +inputGridX.value,
    y: +inputGridY.value
  }
  const pivot = {
    x: +inputPivotX.value, 
    y: +inputPivotY.value
  };
  pivot.y = 1 - pivot.y;

  return { grid, pivot };
}

function onImageCreated(value) {
  document.querySelector("#img-result").src = value;
  applyStyle(packer.options);
}

function applyStyle(options) {
  const { grid, frame, pivot } = options;
  style.setProperty("--grid-x", grid.x);
  style.setProperty("--grid-y", grid.y);
  style.setProperty("--frame-width", frame.width+"px");
  style.setProperty("--frame-height", frame.height+"px");
  style.setProperty("--pivot-x", pivot.x);
  style.setProperty("--pivot-y", pivot.y);

  clearChildrens(gridContent);

  for(let i = 0; i < loadedFiles.length; i++) {
    const div = document.createElement("div");
    gridContent.appendChild(div);
    div.className = "frame";
    div.innerHTML = `
      <div class="circle">
        <span>${i}</span>
      </div>
      <div class="pivot"></div>
    `;
  }
}

// !

// https://www.html5rocks.com/ru/tutorials/file/dndfiles//

const fileInput = document.querySelector("#input-file");
const dropZone = document.getElementById("drop-zone");

fileInput.addEventListener("change", event => {
  const files = Array.from(fileInput.files);
  addFiles(files);
});

function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();

  const files = Array.from(event.dataTransfer.files);
  addFiles(files);
}

function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
}

dropZone.addEventListener("click", event => fileInput.click());

dropZone.addEventListener("dragover", handleDragOver, false);
dropZone.addEventListener("drop", handleFileSelect, false);
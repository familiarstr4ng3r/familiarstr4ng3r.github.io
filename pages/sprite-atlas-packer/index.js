

const fileList = document.querySelector("#file-list");
const btnClear = document.querySelector("#btn-clear");

const inputGridX = document.querySelector("#input-grid-x");
const inputGridY = document.querySelector("#input-grid-y");
const btnCreate = document.querySelector("#btn-create");

const style = document.querySelector(":root").style;
const gridContent = document.querySelector("#grid-content");
const gridCheckbox = document.querySelector("#checkbox-grid");

const loadedFiles = [];

clearChildrens(fileList);

btnClear.addEventListener("click", event => {
  clearChildrens(fileList);
  loadedFiles.splice(0, loadedFiles.length);
});

btnCreate.addEventListener("click", event => {
  if (loadedFiles.length == 0) {
    alert("Please load files!");
    return;
  }
  onClickCreateAtlas();
});

gridCheckbox.addEventListener("change", event => {
  const value = gridCheckbox.checked;
  gridContent.className = value ? "grid visible" : "grid";
});

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

function onClickCreateAtlas() {
  const promises = loadedFiles.map(file => getImage(file));
  Promise.all(promises).then(buffers => {
    const jimps = buffers.map(buffer => Jimp.read(buffer));
    Promise.all(jimps).then(images => handleImages(images));
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

function handleImages(images) {
  const grid = {
    x: +inputGridX.value,
    y: +inputGridY.value
  }
  const pivot = { x: 0.5, y: 0.5 };

  const frame = images[0].bitmap;
  
  const w = frame.width * grid.x;
  const h = frame.height * grid.y;

  new Jimp(w, h, (err, image) => {
      
    if (err) throw err;
    // image.opacity(0);

    createAtlas(grid, image, images, frame);

    image.getBase64(Jimp.MIME_PNG, (err, src) => {
      document.querySelector("#img-result").src = src;
      const options = { grid, frame, pivot };
      applyStyle(options);
    });
  });
}

function createAtlas(grid, background, images, frame) {
  
  for (let y = 0; y < grid.y; y++) {
    for (let x = 0; x < grid.x; x++) {
      const index = y * grid.x + x;
      const img = images[index];
      if (!img) break;
      background.composite(img, x * frame.width, y * frame.height);
    }
  }
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
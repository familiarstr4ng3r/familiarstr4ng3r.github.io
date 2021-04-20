
// https://www.html5rocks.com/ru/tutorials/file/dndfiles//

const fileInput = document.querySelector("#input-file");
const fileList = document.querySelector("#file-list");
const btnClear = document.querySelector("#btn-clear");

const loadedFiles = [];

clearList();

function clearList() {
  while (fileList.firstElementChild) fileList.firstElementChild.remove();
}

function addToList(fileArray) {
  fileArray.forEach(file => {
    const li = document.createElement("li");
    fileList.appendChild(li);
    li.textContent = file.name;
  });
}

fileInput.addEventListener("change", event => {
  const files = Array.from(fileInput.files);
  files.forEach(file => loadedFiles.push(file));

  addToList(files);
});

btnClear.addEventListener("click", event => {
  clearList();
  loadedFiles.splice(0, loadFiles.length);
});

// function save(textContent, fileName) {
//   const file = new File([textContent], fileName, {
//     type: "text/plain",
//   });
  
//   const a = document.createElement("a");
//   a.download = file.name;
//   a.href = URL.createObjectURL(file);
//   a.click();

//   URL.revokeObjectURL(a.href);
// }

function loadFiles(files)
{
  Array.from(files).forEach(file => {

    //console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      //save(reader.result, `${file.name}.txt`);
    };
  });
}

// !

const dropZone = document.getElementById("drop-zone");

function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();

  //const files = event.dataTransfer.files;
  //console.log(files);
}

function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

dropZone.addEventListener("click", event => fileInput.click());

dropZone.addEventListener("dragover", handleDragOver, false);
dropZone.addEventListener("drop", handleFileSelect, false);
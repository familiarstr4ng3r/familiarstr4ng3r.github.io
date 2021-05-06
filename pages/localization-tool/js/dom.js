
document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  const selectGame = document.getElementById("select-game");
  const inputZipId = document.getElementById("input-zip-id");
  const btnFetch = document.getElementById("btn-fetch");

  const fileContainer = document.getElementById("file-container");
  
  const outputCSV = document.getElementById("output-csv");
  const outputJSON = document.getElementById("output-json");

  const btnSaveCSV = document.getElementById("btn-save-csv");
  const btnSaveJSON = document.getElementById("btn-save-json");

  const userAlert = document.getElementById("user-alert");

  populateSelect();
  removeFiles();

  inputZipId.addEventListener("input", event => {
    btnFetch.disabled = getId().length === 0;
  });

  selectGame.addEventListener("change", event => {
    const selectedIndex = selectGame.selectedIndex;
    if (selectedIndex === 0) {
      inputZipId.value = "";
    }
    else if (selectedIndex > 0) {
      const index = selectedIndex - 1;
      inputZipId.value = CONTENT[index].id;
    }
  });

  btnFetch.addEventListener("click", onClickFetch);

  btnSaveCSV.addEventListener("click", event => saveContent(outputCSV.value, "cucumber.csv"));
  btnSaveJSON.addEventListener("click", event => saveContent(outputJSON.value, "cucumber.json"));

  function getId() {
    return inputZipId.value.trim();
  }

  function populateSelect() {
    CONTENT.forEach(item => {
      const option = document.createElement("option");
      option.textContent = item.display_name;
      selectGame.appendChild(option);
    });
  }

  function removeFiles() {
    while(fileContainer.firstElementChild) fileContainer.firstElementChild.remove();
  }

  function addFile(zip, f) {
    const btn = document.createElement("button");
    const classList = ["list-group-item", "list-group-item-action"];
    if (f.name.endsWith(".html")) {
      classList.push("list-group-item-success");
      btn.addEventListener("click", event => {
        zip.file(f.name).async("string")
          .then(content => handleContent(content))
          .then(result => proceedContent(result));
      });
    }
    btn.className = classList.join(" ");
    btn.textContent = f.name;

    fileContainer.appendChild(btn);
  }

  function proceedContent(result) {
    const csv = getCSV(result);
    const json = csvToJson(csv);

    outputCSV.textContent = csv;
    outputJSON.textContent = json;
  }

  async function onClickFetch() {
    removeFiles();
    const [success, zip] = await downloadZip(getId());
    
    if (success) {
      const files = Object.values(zip.files);
      files.forEach(f => addFile(zip, f));
    }

    updateStatus(success);
  }

  function updateStatus(success) {
    const message = success ? "Good!" : "Fetch error";
    const classList = ["alert"];
    classList.push(success ? "alert-success" : "alert-danger");
    userAlert.className = classList.join(" ");
    userAlert.textContent = message;
  }
}
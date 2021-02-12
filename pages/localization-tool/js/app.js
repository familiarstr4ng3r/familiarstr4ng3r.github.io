

const zipLink = "https://docs.google.com/spreadsheets/export?format=zip&id="

// http://localhost:5500/?game=galaxyrunner&output=json


// TODO:
// const urlParams = new URLSearchParams(window.location.search);

// console.log(urlParams.has("game"), urlParams.get("game"));
// console.log(urlParams.has("output"), urlParams.get("output"));

// showSaveFilePicker()

const IGNORE_SYMBOL = "#";

async function downloadZip(id) {
  const url = `${zipLink}${id}`;
  const response = await fetch(url);

  if (response.ok) {
    const blob = await response.blob();
    const zip = await JSZip.loadAsync(blob);
    return [true, zip];
  }
  else {
    return [false, null];
  }
}

function handleContent(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const data = getData(doc);

  const result = getFiltered(data);

  return result;
}

function getData(doc) {
  const trs = doc.querySelector("tbody").querySelectorAll("tr");

  const data = Array.from(trs).map(tr => {
    const tds = tr.querySelectorAll("td");
    const row = Array.from(tds).map(td => td.textContent);
    return row;
  });

  return data;
}

function getFiltered(data) {
  const result = data.filter(subRowArray => {
    const isComment = subRowArray[0].startsWith(IGNORE_SYMBOL);
    const isEmpty = subRowArray.every(e => e.length === 0);
    
    if (!isComment && !isEmpty) {
      return subRowArray;
    }
  });

  return result;
}

function getCSV(data, separator = ";") {
  const result = data.map(subRowArray => subRowArray.join(separator));

  const csv = result.join("\n");

  return csv;
}

function csvToJson(csvText) {
  const separator = csvText[0];
  const lines = csvText.split("\n");

  const languages = lines[0].split(separator).filter(e => !e.startsWith(IGNORE_SYMBOL) && e);

  const localization = {};

  // ! i-index starts from 1 because of 1st (zero-index) element is empty
  // ! or i-index starts from 0 if empty entry was ignored as now

  for (i = 0; i < languages.length; i++)
  {
    const dict = {};
    
    // ! k-index starts from 1 because of 1st line contains languages 
    for (k = 1; k < lines.length; k++)
    {
      const row = lines[k].split(separator);
      const key = row[0];
      const value = row[i + 1]; // fixed

      dict[key] = value;
    }

    const lang = languages[i];
    localization[lang] = dict;
  }

  return JSON.stringify(localization, null, "    ");
}


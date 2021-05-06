const CONTENT = [
  {
    display_name: "Galaxy Runner",
    url_param: "galaxyrunner",
    id: "1liqJ34DsWhKAnYmGVYkRkbHYMZ_W8LOP_4p7QWm5-1s"
  },
  {
    display_name: "Space World",
    url_param: "spaceworld",
    id: "1BFaDYt_96wAQcdGS5rdNoIAVlvtuyh4Bm_JMdjoF7Po"
  }
];

function saveContent(content, fileName) {
  // ! https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server

  const a = document.createElement("a");
  const file = new Blob([content], {type: "text/plain"});
    
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}


const mapTags = document.querySelector("map[name=tags]");

main();

async function main() {
  const response = await fetch("json/map-tags.json");
  const tags = await response.json();

  tags.forEach(tag => {
    const area = document.createElement("area");
    area.shape = "rect";
    area.coords = tag.coords;
    //area.href = tag.href;
    area.target = "_blank";

    //const rect = tag.coords.split(",");
    //console.log(rect[2] - rect[0], rect[3] - rect[1]);

    mapTags.appendChild(area);
  });
}
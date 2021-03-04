(function (){
  const mapTags = document.querySelector("map[name=tags]");
  const areas = mapTags.querySelectorAll("area");
  console.log(areas.length);

  const data = Array.from(areas).map(area => {
    return { href: area.href, coords: area.coords };
  });

  const str = JSON.stringify(data, null, 2);
  console.log(str);
})();
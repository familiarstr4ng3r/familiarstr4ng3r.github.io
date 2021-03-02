const CONTENT = [
  {
    href: "https://github.com/familiarstr4ng3r/familiarstr4ng3r.github.io",
    name: "Main Repository",
  },
  {
    href: "pages/demo/index.html",
    name: "Demo",
  },
  {
    href: "pages/security-project/index.html",
    name: "Security Project",
  },
  {
    href: "pages/music-player-cucumber/index.html",
    name: "Music Player Cucumber",
  },
  {
    href: "pages/localization-tool/index.html",
    name: "Localization Tool",
  }
];

main();

function main()
{
  const items = document.getElementById("content");

  CONTENT.forEach(e => {

    const li = document.createElement("li");

    li.innerHTML = `
      <a target="_blank" href=${e.href} title="Open in new tab">${e.name}</a>
      <div></div>
    `;

    items.appendChild(li);
  });
}

function createElement(e) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.target = "_blank";
  a.href = e.href;
  a.textContent = e.name;
  li.appendChild(a);

  return li;
}

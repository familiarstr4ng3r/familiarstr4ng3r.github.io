document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
  const root = document.querySelector(":root");
  const button = document.querySelector("#btn-change");
  const colorInput = document.querySelector("#color");
  const label = document.querySelector("#bg-label");

  const bgUrl = "https://wizzley.com/static/img/bg/texture*.png"

  let index = 0;
  const maxIndex = 14;

  button.addEventListener("click", onClick);

  colorInput.addEventListener("input", event => {
    setBackgroundColor(colorInput.value);
  });

  setBackgroundImage(maxIndex);

  function onClick()
  {
    if (index++ === maxIndex) index = 1;
    setBackgroundImage(index);
  }

  function setBackgroundImage(index) {
    const url = bgUrl.replace("*", index);

    label.textContent = label.href = url;
    const value = `url(${url})`;
    root.style.setProperty("--overlay-image", value);
  }

  function setBackgroundColor(value) {
    root.style.setProperty("--bg-color", value);
  }
}
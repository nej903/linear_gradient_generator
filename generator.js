const btn = document.querySelector("button");
const gradient = document.querySelector("div.gradient");
const inputs = document.querySelectorAll("input[type='color']");
const pTag = document.querySelector(".result > .result-left > p");
const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const copyBtn = document.getElementById("copy");
const radioBtns = Array.from(
  document.querySelectorAll("input[name='direction']")
);
let prevGradient;

btn.addEventListener("click", (event) => {
  getGradient(event);
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRGB = () => {
  const colors = [getRandomInt(256), getRandomInt(256), getRandomInt(256)].join(
    ", "
  );
  return "rgb(" + colors + ")";
};

const getGradient = (event) => {
  let leftColor;
  let rightColor;
  ["input", "change", "load"].includes(event.type)
    ? (leftColor = leftInput.value) & (rightColor = rightInput.value)
    : (leftColor = getRGB()) & (rightColor = getRGB());
  const direction = getDirection();
  const fullGradient =
    "linear-gradient(to " +
    direction +
    ", " +
    leftColor +
    ", " +
    rightColor +
    ")";
  gradient.style.backgroundImage = pTag.innerText = prevGradient = fullGradient;
};

const getDirection = () => {
  return radioBtns.find((btn) => btn.checked).id;
};

radioBtns.forEach((radio) => {
  radio.addEventListener("click", () => {
    const newGradient = prevGradient.replace(prevDirection, getDirection());
    prevDirection = getDirection();
    gradient.style.backgroundImage = pTag.innerText = prevGradient = newGradient;
  });
});

copyBtn.addEventListener("click", () => {
  textToClipboard(pTag.innerText);
  console.log("gradient copied to clipboard");
  alert("gradient copied to clipboard");
});

const textToClipboard = (text) => {
  const dummy = document.createElement("textarea");
  dummy.style.display = "none";
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

const randHexColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    getGradient(event);
  });
  input.addEventListener("change", () => {
    getGradient(event);
  });
});

window.addEventListener("load", (event) => {
  leftInput.value = randHexColor();
  rightInput.value = randHexColor();
  getGradient(event);
});

let prevDirection = getDirection();

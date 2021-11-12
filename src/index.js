const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const container = document.querySelector("#dog-image-container");
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const ulContainer = document.querySelector("#dog-breeds");
const dropDown = document.querySelector("#breed-dropdown");
let breedsArray = [];

ulContainer.addEventListener("click", handleClick);
dropDown.addEventListener("change", handleChange);

function getImages() {
  fetch(imgUrl)
    .then((resp) => resp.json())
    .then((images) => {
      const imgs = images.message;
      let imgsArray = createImgElement(imgs);
      renderImgs(imgsArray);
    });
}

function createImgElement(imgs) {
  return imgs.map((img) => {
    let i = `<img src=${img}>`;
    return i;
  });
}

function renderImgs(imgsArray) {
  imgsArray.forEach((element) => {
    renderElement(element);
  });
}

function renderElement(element) {
  container.innerHTML += element;
}

function getBreeds() {
  fetch(breedUrl)
    .then((resp) => resp.json())
    .then((breeds) => {
      breedsArray = Object.keys(breeds.message);
      const breedsLis = createLiElement(breedsArray);
      renderLis(breedsLis);
    });
}

function createLiElement(breedsArray) {
  return breedsArray.map((breed) => {
    let li = `<li>${breed}</li>`;
    return li;
  });
}

function renderLis(breedsLis) {
  breedsLis.forEach((element) => {
    renderLis(element);
  });
}

function renderLis(element) {
  ulContainer.innerHTML += element;
}

function handleClick(event) {
  if (event.target.style.color === "red") {
    event.target.style.color = "black";
  } else {
    event.target.style.color = "red";
  }
}

function handleChange(event) {
  const letter = event.target.value;
  const filteredBreeds = breedsArray.filter((breed) =>
    breed.startsWith(letter)
  );
  const filteredBreedsLis = createLiElement(filteredBreeds);
  ulContainer.innerHTML = "";
  renderLis(filteredBreedsLis);
}

getImages();
getBreeds();

import "./css/styles.css";
import { fetchCountries } from "./fetchCountries";
import debounce from "lodash.debounce";
import Notiflix from "notiflix";
import confetti from "canvas-confetti";

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("input");
const list = document.querySelector("ul.country-list");
const info = document.querySelector("div.country-info");
const modal = document.querySelector(".modal");

const fireConfetti = (particleRatio, opts) => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  return confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
};

const startConfetti = () => {
  fireConfetti(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fireConfetti(0.2, {
    spread: 60,
  });
  fireConfetti(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fireConfetti(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fireConfetti(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const changeBorderList = () => {
  input.addEventListener("blur", event => {
    list.style.border = "1px solid #212121";
    list.style.borderTop = "none";
  });
  input.addEventListener("focus", event => {
    list.style.border = "2px solid mediumseagreen";
    list.style.borderTop = "none";
  });
};
const clearList = () => {
  list.innerHTML = "";
  list.style.transform = "translateY(-500%)";
};

const clearInfo = () => {
  modal.firstElementChild.innerHTML = "";
};

const modalClick = () => {
  input.disabled = "false";
  modal.classList.toggle("hidden");
};

const modalKeydown = event => {
  const isHidden = modal.classList.contains("hidden");
  if ((event.currentTarget = modal && !isHidden && event.code === "Escape")) {
    input.disabled = "false";
    modal.classList.toggle("hidden");
    return;
  }
  return;
};

const renderList = data => {
  clearList();
  clearInfo();
  const markup = data
    .map(element => {
      return `<li class="country__item"><span  class="flag" style="background-image:url('${element.flags.svg}')"></span><span class="country">${element.name}</span></li>`;
    })
    .join("");
  list.insertAdjacentHTML("beforeend", markup);

  setTimeout(() => {
    list.style.transform = "translateY(0%)";
  }, 300);
};

const renderInfo = data => {
  clearInfo();
  clearList();
  input.disabled = "true";
  const languages = data[0].languages
    .map(element => {
      return element.name;
    })
    .join(", ");

  const markup = data
    .map(element => {
      return `<p class="title"><span  class="flag--Big" style="background-image:url('${element.flags.svg}')"></span> <span class="country--Big">${element.name}</span></p>
  <p>Capital:<span>${element.capital}</span></p>
  <p>Population:<span>${element.population}</span></p>
  <p>Languages:<span>${languages}</span></p>`;
    })
    .join("");
  modal.classList.toggle("hidden");
  setTimeout(startConfetti, 500);
  setTimeout(() => {
    modal.firstElementChild.insertAdjacentHTML("beforeend", markup);
    modal.firstElementChild.style.opacity = "1";
  }, 1000);
};
const deb = debounce(event => {
  const inputValue = event.target.value.trim();
  const pattern = /[[a-zA-Z]/;

  if (inputValue === "") return;

  fetchCountries(`${inputValue}`)
    .then(data => {
      if (data.length < 11 && data.length >= 2) return renderList(data);
      if (data.length < 2) return renderInfo(data);
      return Notiflix.Notify.info(
        "Too many matches found. Please enter a more specific name."
      );
    })
    .catch(error => {
      clearList();
      if (!pattern.test(input.value)) {
        return Notiflix.Notify.info("The value should contain only letters");
      }
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}, DEBOUNCE_DELAY);

input.addEventListener("input", deb);
changeBorderList();
modal.addEventListener("click", modalClick);
document.addEventListener("keydown", modalKeydown);

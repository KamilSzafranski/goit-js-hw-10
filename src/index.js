import "./css/styles.css";
import { fetchCountries } from "./fetchCountries";
import debounce from "lodash.debounce";
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("input");
const list = document.querySelector("ul.country-list");
const info = document.querySelector("div.country-info");


const changeBorderList = () => {
  input.addEventListener("blur", event => {
    list.style.border = "1px solid #212121";
    list.style.borderTop = "none";
  })
    input.addEventListener("focus", event => {
      list.style.border = "2px solid mediumseagreen";
      list.style.borderTop = "none";
    });
  

}
const clearList = () => {
  list.innerHTML = "";
  list.style.transform = "translateY(-500%)";
};

const clearInfo = () => {
  info.innerHTML = "";
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
  const languages = data[0].languages
    .map(element => {
      return element.name;
    })
    .join(",");

  const markup = data
    .map(element => {
      return `<p><span  class="flag--Big" style="background-image:url('${element.flags.svg}')"></span> <span class="country--Big">${element.name}</span></p>
  <p>Capital:<span>${element.capital}</span></p>
  <p>Population:<span>${element.population}</span></p>
  <p>Languages:<span>${languages}</span></p>`;
    })
    .join("");
  info.insertAdjacentHTML("beforeend", markup);
};
const deb = debounce(event => {
  const inputValue = event.target.value.trim();
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
      console.error(error);
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}, DEBOUNCE_DELAY);

input.addEventListener("input", deb);
changeBorderList();

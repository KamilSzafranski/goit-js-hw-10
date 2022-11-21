import "./css/styles.css";
import { fetchCountries } from "./fetchCountries";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("input");
const list = document.querySelector("ul.country-list");
const info = document.querySelector("div.country-info");

clearList = () => (list.innerHTML = "");

renderList = data => {
  clearList();
  const markup = data
    .map(element => {
      return `<li><p data-flag=${element.flags.svg}>${element.name}</p></li>`;
    })
    .join("");

  list.insertAdjacentHTML("beforeend", markup);
};

const deb = debounce(event => {
  fetchCountries(`${event.target.value}`).then(data => renderList(data));
}, DEBOUNCE_DELAY);

input.addEventListener("input", deb);

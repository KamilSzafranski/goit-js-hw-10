const selectParameters = (...parameters) => {
  const selected = parameters.map(element => `${element}`);
  return selected.join(",");
};

export const fetchCountries = name => {
  const searchParms = name.toLowerCase();
  const selectedParm = selectParameters(
    "name",
    "capital",
    "population",
    "flags",
    "languages"
  );


  return fetch(
    `https://restcountries.com/v2/name/${searchParms}?fields=${selectedParm}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

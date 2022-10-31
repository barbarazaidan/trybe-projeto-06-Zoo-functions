const data = require('../data/zoo_data');
// console.log(data.prices); - retorna um grande objeto

// filter e find
const especies = data.species;

function getSpeciesByIds(...ids) {
  console.log(ids);
  if (ids.length === 0) {
    return [];
  }
  return especies.filter((especie) => especie.id === ids.find((id) => id === especie.id));
}

// console.log(getSpeciesByIds('baa6e93a-f295-44e7-8f70-2bcdc6f6948d', 'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'));

module.exports = getSpeciesByIds;

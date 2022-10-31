const data = require('../data/zoo_data');
// console.log(data); - retorna um grande objeto

// filter e find
const especies = data.species; // retorna um array de objetos

function getSpeciesByIds(...ids) {
  console.log(ids);
  if (ids.length === 0) {
    return [];
  }
  return especies.filter((especie) => especie.id === ids.find((id) => id === especie.id));
}

// console.log(getSpeciesByIds('baa6e93a-f295-44e7-8f70-2bcdc6f6948d', 'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'));
// na saída aparece o residents: [ [object], [object], [object] ]. Isso ocorre apenas na saída do console.log, para encurtar as informações, porém o objeto inteiro continua lá e vai passar nos testes.

module.exports = getSpeciesByIds;

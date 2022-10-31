const data = require('../data/zoo_data');
// console.log(data); - retorna um grande objeto

// find e every
const especies = data.species; // retorna um array de objetos
// console.log(especies);

function getAnimalsOlderThan(animal, age) {
  const especieEncontrada = especies.find((especie) => especie.name === animal);
  const residentes = especieEncontrada.residents; // retorna array de objetos
  return residentes.every((residente) => residente.age >= age);
}

// console.log(getAnimalsOlderThan('penguins', 10));

module.exports = getAnimalsOlderThan;

const { species } = require('../data/zoo_data');
// species é um array de objetos com todas as espécies

// ---------------------------------------------------------------------------
// A função abaixo retorna o seguintes objeto:
// {
//   id: 'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5',
//   name: 'elephants',
//   popularity: 5,
//   location: 'NW',
//   availability: [ 'Friday', 'Saturday', 'Sunday', 'Tuesday' ],
//   residents: [
//     { name: 'Ilana', sex: 'female', age: 11 },
//     { name: 'Orval', sex: 'male', age: 15 },
//     { name: 'Bea', sex: 'female', age: 12 },
//     { name: 'Jefferson', sex: 'male', age: 4 }
//   ]
// }
const getElephants = () =>
  species.find((specie) => specie.name === 'elephants');

// ---------------------------------------------------------------------------
// A função abaixo recebe como parâmetro o retorno da função getElephants(). A  partir do objeto elefante, é feita a soma das idades de todos os animais dessa espécie com o reduce() e o resultado divido pela quantidade de animais, gerando a média de idade. O resultado é:
// 10.5
// ---------------------------------------------------------------------------

const averageAge = ({ residents }) =>
  residents.reduce((sum, elephant) => sum + elephant.age, 0) / residents.length;

// ---------------------------------------------------------------------------
// O argumento elephants representa o objeto retornado na função getElephants() e o param representa a string 'name', 'count' ou 'averageAge'. A partir do valor do param, eu tenho um switch.
// Caso o param seja 'count', será retornado a quantidade de animais que correspondem a espécie elefante.
// Caso o param seja 'name", o map() vai retornar o array abaixo:
// [ 'Ilana', 'Orval', 'Bea', 'Jefferson' ]
// Caso o param seja 'averageAge", o retorno será igual ao da função averageAge(), ou seja, a média das idades dos elefantes: 10.5

const computeData = (param, elephants) => {
  switch (param) {
  case 'count':
    return elephants.residents.length;
  case 'names':
    return elephants.residents.map((elephant) => elephant.name);
  case 'averageAge':
    return averageAge(elephants);
  default:
    return null;
  }
};

// ---------------------------------------------------------------------------
// Na função abaixo, o param representa uma string, que tem relação com as chaves do objeto retornado na função getElephants(). Sendo assim, o param pode ser: 'id', 'names', 'popularity',  'location', 'availability', 'residents'. Se o param informado for igual a alguma das chaves do objeto etornado na função getElephants(), o resultado da função handlerElephants() será o valor correspondente à chave. Se o param não corresponder a nenhuma chave, ele vai chamar a função computeData().

const handlerElephants = (param) => {
  if (param === undefined) {
    return undefined;
  }
  if (typeof param !== 'string') {
    return 'Parâmetro inválido, é necessário uma string';
  }
  const elephants = getElephants();
  if (Object.keys(elephants).includes(param)) {
    return elephants[param];
  }
  return computeData(param, elephants);
};

console.log(handlerElephants(''));

module.exports = handlerElephants;

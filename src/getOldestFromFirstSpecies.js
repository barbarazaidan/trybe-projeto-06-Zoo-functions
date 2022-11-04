const data = require('../data/zoo_data');

// ---------------------------------------------------------------- ANOTAÇÕES GERAIS ---------------------------------------------------------------------------------
// A função getOldestFromFirstSpecies retorna um array no seguinte formato: ['Maxwell', 'male', 15].
// ---------------------------------------------------------------------------------
// Especies retorna um array de objetos, onde cada index tem o seguinte formato:
// {
//   id: '0938aa23-f153-4937-9f88-4858b24d6bce',
//   name: 'lions',
//   popularity: 4,
//   location: 'NE',
//   availability: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
//   residents: [ [Object], [Object], [Object], [Object] ]
// },
// ---------------------------------------------------------------------------------
// Funcionarios retorna um array de objetos, onde cada index tem o seguinte formato:
// {
//   id: 'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//   firstName: 'Nigel',
//   lastName: 'Nelson',
//   managers: [
//     '0e7b460e-acf4-4e17-bcb3-ee472265db83',
//     'fdb2543b-5662-46a7-badc-93d960fdc0a8'
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     'e8481c1d-42ea-4610-8e11-1752cfc05a46'
//   ]
// },
// ---------------------------------------------------------------------------------
// A função whatEmployee() vai retornar os dados do funcionário passado por parâmetro. O retorno será no formato de objeto:
// {
//   id: 'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//   firstName: 'Nigel',
//   lastName: 'Nelson',
//   managers: [
//     '0e7b460e-acf4-4e17-bcb3-ee472265db83',
//     'fdb2543b-5662-46a7-badc-93d960fdc0a8'
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     'e8481c1d-42ea-4610-8e11-1752cfc05a46'
//   ]
// }
// ---------------------------------------------------------------------------------
// Na função firstAnimal({ responsibleFor }), estou passando o funcionário como parâmetro, porém já desestruturando sua propriedade responsibleFor. Essa função tem o obejtivo de retornar o primeiro animal pelo qual o funcionário é responsável, qualquer que seja ele.
// Dessa maneira, primeiro usei o find() sem variável de comparação. Assim, idDoAnimal retorna apenas a string com o número de id do animal, por exemplo: '0938aa23-f153-4937-9f88-4858b24d6bce'.
// A partir do retorno de idDoAnimal, faço um novo find() para iterar sobre o array de objetos especies e já desestruturo a chave id de cada objeto. Com isso, o resultado final da função é o objeto completo correspondente ao animal. Por exemplo:
// {
//   id: '0938aa23-f153-4937-9f88-4858b24d6bce',
//   name: 'lions',
//   popularity: 4,
//   location: 'NE',
//   availability: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
//   residents: [
//     { name: 'Zena', sex: 'female', age: 12 },
//     { name: 'Maxwell', sex: 'male', age: 15 },
//     { name: 'Faustino', sex: 'male', age: 7 },
//     { name: 'Dee', sex: 'female', age: 14 }
//   ]
// }
// ---------------------------------------------------------------------------------
// Na getOldestFromFirstSpecies(), nesta parte do código const { residents } = firstAnimal(funcionario), eu peguei o objeto todo que firstAnimal(funcionario) retorna e desestruturei a propriedade residents. Então, usei o sort() para ordenar o array residents em ordem descrescente, do animal mais velho ao mais novo. O resultado para lions, por exemplo, foi este:
// [
//   { name: 'Maxwell', sex: 'male', age: 15 },
//   { name: 'Dee', sex: 'female', age: 14 },
//   { name: 'Zena', sex: 'female', age: 12 },
//   { name: 'Faustino', sex: 'male', age: 7 }
// ]
// A partir daí, usei o map() para transformar todos os objetos do array anterior em arrays. Afinal, a saída da função precisa ser um array. Sendo assim, o retorno do map() é esse:
// [
//   [ 'Maxwell', 'male', 15 ],
//   [ 'Dee', 'female', 14 ],
//   [ 'Zena', 'female', 12 ],
//   [ 'Faustino', 'male', 7 ]
// ]
// Entretanto, eu quero que a saída final seja apenas do animal mais velho. Então retornei o elemento que está no index 0 do array anterior, que é [ 'Maxwell', 'male', 15 ].
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const especies = data.species;
const funcionarios = data.employees;

function whatEmployee(identity) {
  return funcionarios.find(({ id }) => id === identity);
}

function firstAnimal({ responsibleFor }) {
  const idDoAnimal = responsibleFor.find((animal) => animal);
  return especies.find(({ id }) => id === idDoAnimal);
}

function getOldestFromFirstSpecies(id) {
  const funcionario = whatEmployee(id);
  const { residents } = firstAnimal(funcionario);
  const listaDecrescenteAnimais = residents.sort((b, a) => (a.age - b.age));
  return listaDecrescenteAnimais.map(({ name, sex, age }) => [name, sex, age])[0];
}

// console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

module.exports = getOldestFromFirstSpecies;

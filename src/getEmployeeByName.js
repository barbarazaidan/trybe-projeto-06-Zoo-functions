const data = require('../data/zoo_data');
// console.log(data); - retorna um grande objeto

// find
const empregados = data.employees; // retorna um array de objetos
// console.log(empregados);

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return empregados
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);// eu desestruturei o objeto 'empregado' para pegar apenas as suas propriedades first e last name. O objetivo foi encurtar a frase para que ela tivesse menos de 100 caracteres de comprimento, pois o lint barra quando ela tem mais do que isso. Por conta do lint, também coloquei o find() para baixo, de modo a diminuir o tamanho da linha. Tentei fazer com return normal, mas por ele ser de apenas uma linha, o lint também não permite eu descer o corpo da função.
}

// console.log(getEmployeeByName('Emery'));

module.exports = getEmployeeByName;

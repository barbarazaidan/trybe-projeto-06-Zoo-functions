const data = require('../data/zoo_data');
// console.log(data); - retorna um grande objeto

const empregados = data.employees; // retorna um array de objetos
// console.log(empregados);

// some e find
function isManager(id) {
  return empregados
    .some(({ managers }) => id === managers.find((manager) => manager === id));
  // a propriedade managers é um array, sendo assim, uso o método find() para verificar cada item dentro do array até encontrar aquele que seja igual ao id. Quando encontro, aí sim consigo fazer a comparação direta dentro do some()
}
// ------------------------------------------------------------------------------

// se eu faça a função abaixo, ela vai retornar todo o array 'empregados', pois não estou pegando o retorno no find().

// function getRelatedEmployees(managerId) {
//   if (isManager(managerId)) {
//     return empregados.filter(({ managers, firstName, lastName }) => {
//       managerId === managers.find((manager) => manager === managerId)
//       return `${firstName} ${lastName}`
//     });
//   }
// }

// ------------------------------------------------------------------------------

function getRelatedEmployees(managerId) {
  if (isManager(managerId)) {
    const subordinados = empregados // a constante subordinado retorna um array de objetos com todos os funcionários subordinados ao gerente passado no managerID.
      .filter(({ managers }) => managerId === managers // o filter() vai fazer a filtragem e colocar em um array todos os colaboradores que são subordinados a cada gerente, mas, para isso, eu preciso comparar o managerID com o id dos gerente de cada colaborador e aí entra o find() para me retornar o valor que consigo comparar.
        .find((manager) => manager === managerId));
    return subordinados.map(({ firstName, lastName }) => `${firstName} ${lastName}`); // como não quero os objetos todos, apenas o nome e sobrenome, fiz o map() para me retornar um novo array apenas com essas informações.
  } throw new Error('O id inserido não é de uma pessoa colaboradora gerente!'); // o erro disparado caso seja inserido um id inválido
}

// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));

module.exports = { isManager, getRelatedEmployees };

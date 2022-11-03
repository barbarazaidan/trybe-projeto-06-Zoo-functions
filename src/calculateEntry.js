const data = require('../data/zoo_data');
// console.log(data); - retorna um grande objeto

// const entrants = [
//   { name: 'Lara Carvalho', age: 5 },
//   { name: 'Frederico Moreira', age: 5 },
//   { name: 'Pedro Henrique Carvalho', age: 5 },
//   { name: 'Maria Costa', age: 18 },
//   { name: 'Núbia Souza', age: 18 },
//   { name: 'Carlos Nogueira', age: 50 },
// ];

// --------------------------------------------------------------- ANOTAÇÕES GERAIS ------------------------------------------------------------------------------------------
// A comparação abaixo não funciona no caso do objeto, pois no Javascript, dois objetos distintos, nunca são iguais. É o mesmo que ocorre com um array. Portanto, uma das forma de fazer essa verificação é tranformando o objeto em um array e usando o .length.

// if (!entrants || entrants === {}) {
//   return 0;
// }
// --------------------------------------------------------------------------------------------------------------------------------------
// As constantes criancas, adultos e idosos vão filtrar os visitantes dos respectivos grupos e retorná-los em arrays separados:
// const criancas = entrants.filter(({ age }) => age < 18);

// [
//   { name: 'Lara Carvalho', age: 5 },
//   { name: 'Frederico Moreira', age: 5 },
//   { name: 'Pedro Henrique Carvalho', age: 5 }
// ]

// const idosos = entrants.filter(({ age }) => age >= 50);
// [ { name: 'Carlos Nogueira', age: 50 } ]

// const adultos = entrants.filter(({ age }) => age >= 18 && age < 50);
// [ { name: 'Maria Costa', age: 18 }, { name: 'Núbia Souza', age: 18 } ]

// A função countEntrants(entrants) retornará um objeto no seguinte formato:
// { child: 3, adult: 2, senior: 1 }

// const { prices } = data - isso é o mesmo que const prices = data.prices, só que o lint implicou com o dot notation e pediu desestruturação.
// { adult: 49.99, senior: 24.99, child: 20.99 }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function countEntrants(entrants) {
  const criancas = entrants.filter(({ age }) => age < 18);
  const adultos = entrants.filter(({ age }) => age >= 18 && age < 50);
  const idosos = entrants.filter(({ age }) => age >= 50);

  return {
    child: criancas.length,
    adult: adultos.length,
    senior: idosos.length,
  };
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const quantidadeVisitantes = countEntrants(entrants);
  const { prices } = data;
  const { child: precoKids, adult: precoAdults, senior: precoSenior } = prices;
  const { child, adult, senior } = quantidadeVisitantes;

  const soma = precoKids * child + precoAdults * adult + precoSenior * senior;
  return soma;
}

// console.log(countEntrants([{ name: 'ana', age: 18 }]));
// console.log(calculateEntry([{ name: 'ana', age: 18 }]));

module.exports = { calculateEntry, countEntrants };

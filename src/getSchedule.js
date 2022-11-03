const data = require('../data/zoo_data');

// ------------------------------------------------------------------- ANOTAÇÕES GERAIS ------------------------------------------------------------------------------------------------
// A função getSchedule() e getSchedule('não é animal, nem dia') retorna o mesmo resultado: um grande objeto, onde os dias da semana são chaves e os valores com dados de horário de funcionamento e animais em exibição.
// --------------------------------------------------------------------------------------------
// A função getSchedule('nome do animal') retorna um array com os dias da semana em que o animal está em exibição.
// --------------------------------------------------------------------------------------------
// const horarios = data.hours retorna o seguinte objeto:
// {
//   Tuesday: { open: 8, close: 6 },
//   Wednesday: { open: 8, close: 6 },
//   Thursday: { open: 10, close: 8 },
//   Friday: { open: 10, close: 8 },
//   Saturday: { open: 8, close: 10 },
//   Sunday: { open: 8, close: 8 },
//   Monday: { open: 0, close: 0 }
// }
// --------------------------------------------------------------------------------------------
// const especies = data.species retorna um array de objetos, onde cada index representa uma espécie. Ex:
// [
//  {
//   id: '01422318-ca2d-46b8-b66c-3e9e188244ed',
//   name: 'giraffes',
//   popularity: 4,
//   location: 'NE',
//   availability: [ 'Wednesday', 'Thursday', 'Tuesday', 'Friday' ],
//   residents: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
//  }
// ]
// --------------------------------------------------------------------------------------------
// A função abaixo vai verificar se o parâmetro passado é um animal, retornando true ou false. Caso verdadeiro, seguimos para o encontraEspecie().
// function isAnimal(animal) {
//   return especies.some(({ name }) => name === animal);
// }
// --------------------------------------------------------------------------------------------
// A função filtroAnimaisPorDia(dia) vai retornar um array de objetos com todos os animais que estão em exibição de acordo com cada dia da semana passado como parâmetro. Por exemplo, filtroAnimaisPorDia('Thursday') retorna:
// [
//   {
//     id: '0938aa23-f153-4937-9f88-4858b24d6bce',
//     name: 'lions',
//     popularity: 4,
//     location: 'NE',
//     availability: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
//     residents: [ [Object], [Object], [Object], [Object] ]
//   },
//   {
//     id: '533bebf3-6bbe-41d8-9cdf-46f7d13b62ae',
//     name: 'otters',
//     popularity: 4,
//     location: 'SE',
//     availability: [ 'Friday', 'Thursday', 'Wednesday', 'Saturday' ],
//     residents: [ [Object], [Object], [Object], [Object] ]
//   },
//   {
//     id: '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     name: 'frogs',
//     popularity: 2,
//     location: 'SW',
//     availability: [ 'Saturday', 'Friday', 'Thursday', 'Wednesday' ],
//     residents: [ [Object], [Object] ]
//   },
//   {
//     id: '78460a91-f4da-4dea-a469-86fd2b8ccc84',
//     name: 'snakes',
//     popularity: 3,
//     location: 'SW',
//     availability: [ 'Sunday', 'Saturday', 'Friday', 'Thursday' ],
//     residents: [ [Object], [Object] ]
//   },
//   {
//     id: '01422318-ca2d-46b8-b66c-3e9e188244ed',
//     name: 'giraffes',
//     popularity: 4,
//     location: 'NE',
//     availability: [ 'Wednesday', 'Thursday', 'Tuesday', 'Friday' ],
//     residents: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
//   }
// ]
// --------------------------------------------------------------------------------------------
// A função arrayDeAnimais(diaDaSemana) vai pegar o array de objetos acima e tranformá-lo em um array de strings por meio do map(). Assim, resultado de arrayDeAnimais(diaDaSemana), onde diaDaSemana é igual a Thursday é:
//
// [ 'lions', 'otters', 'frogs', 'snakes', 'giraffes' ]
// --------------------------------------------------------------------------------------------
// A constante diaPesquisado faz uma pesquisa por todos os dias da semana que aparecem como chave no objeto horários até encontrar o que foi passado como parâmetro. Para esse processo usei o Object.keys(), de modo a conseguir percorrer o array com o find(). O Object.keys() retorna:
//
// ['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday']
//
// A partir daí, o find() retorna apenas a string com o dia da semana.
// --------------------------------------------------------------------------------------------
// Para fazer a atribuição abaixo funcionar:
//
// const { open, close } = horarios[diaPesquisado];
//   return `Open from ${open}am until ${close}pm`;
//
// eu preciso usar a notação por colchetes [], pois apenas assim posso pegar o valor que está na variável diaPesquisado. Se eu utilizar a notação por ponto, a atribuição dá erro, pois o JS não identifica que quero pegar os valores da chave que está em diaPesquisado.
// --------------------------------------------------------------------------------------------
// Observe a comparação abaixo:
//
// if (!scheduleTarget (f)|| isDay(scheduleTarget) === false (f) || isAnimal(scheduleTarget) === false (v) ) {
//   return horariosCompletos;
// }
// return {[scheduleTarget]: cronogramaDeExibicao[scheduleTarget]};
//
// Ela estava dando um erro. Mesmo quando o scheduleTarget era um dia da semana, como Friday, por exemplo, ele entrava no if. Isso estava ocorrendo por conta da comparação do isAnimal(scheduleTarget) === false. Afinal, para a isDay() dar verdadeiro, o isAnimal() tinha que dar falso. Assim, ao comparar false com false, eu tinha uma parte do 'ou' sendo verdadeira e aí tudo sempre entrava nele.
// Para evitar esse problema, precisei retirar esta última parte da comparação. E como já tinha feito um isAnimal() com if antes e a função não caiu nele, quer dizer que o isAnimal() já é falso.
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const horarios = data.hours;
const especies = data.species;

function filtroAnimaisPorDia(diaDaSemana) {
  return especies
    .filter(({ availability }) => diaDaSemana === availability.find((dia) => dia === diaDaSemana));
}

function arrayDeAnimais(diaDaSemana) {
  if (diaDaSemana !== 'Monday') {
    return filtroAnimaisPorDia(diaDaSemana).map(({ name }) => name);
  } return 'The zoo will be closed!';
}

function horarioDeFuncionamento(diaDaSemana) {
  const diaPesquisado = Object.keys(horarios).find((dia) => dia === diaDaSemana);
  const { open, close } = horarios[diaPesquisado];
  if (diaDaSemana !== 'Monday') {
    return `Open from ${open}am until ${close}pm`;
  } return 'CLOSED';
}

const horariosCompletos = {
  Tuesday: {
    officeHour: horarioDeFuncionamento('Tuesday'),
    exhibition: arrayDeAnimais('Tuesday'),
  },
  Wednesday: {
    officeHour: horarioDeFuncionamento('Wednesday'),
    exhibition: arrayDeAnimais('Wednesday'),
  },
  Thursday: {
    officeHour: horarioDeFuncionamento('Thursday'),
    exhibition: arrayDeAnimais('Thursday'),
  },
  Friday: {
    officeHour: horarioDeFuncionamento('Friday'),
    exhibition: arrayDeAnimais('Friday'),
  },
  Saturday: {
    officeHour: horarioDeFuncionamento('Saturday'),
    exhibition: arrayDeAnimais('Saturday'),
  },
  Sunday: {
    officeHour: horarioDeFuncionamento('Sunday'),
    exhibition: arrayDeAnimais('Sunday'),
  },
  Monday: {
    officeHour: horarioDeFuncionamento('Monday'),
    exhibition: arrayDeAnimais('Monday'),
  },
};

function isAnimal(animal) {
  return especies.some(({ name }) => name === animal);
}

function isDay(diaDaSemana) {
  return Object.keys(horarios).some((dia) => dia === diaDaSemana);
}

function arrayDeEspecies(animal) {
  const especieSelecionada = especies.find(({ name }) => name === animal);
  const { name, availability } = especieSelecionada;
  if (animal === name) {
    return availability;
  }
}

function getSchedule(scheduleTarget) {
  if (isAnimal(scheduleTarget)) {
    return arrayDeEspecies(scheduleTarget);
  }

  if (!scheduleTarget || isDay(scheduleTarget) === false) {
    return horariosCompletos;
  }
  return { [scheduleTarget]: horariosCompletos[scheduleTarget] };
}

// console.log(getSchedule('Friday'));

module.exports = getSchedule;

const { hours } = require('../data/zoo_data');
// console.log(hours);

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dayError = 'The day must be valid. Example: Monday';

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A função abaixo vai validar a hora e os minutos, que foram desestruturados na função validateHour(), analisando se eles representam um número. Afinal, tudo foi passado como string no parâmetro original da função getOpeningHours().
// A expressão /^\d+$/ verifica se na string há apenas caracteres numéricos (\d+) [o \d+ pega valores de dezenas, centenas etc. ao invés dos números individualmente], do início (^) ao final ($) da string. Caso a expressão dê false, indicada pela !, aparece o error The ${what} should represent a number.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

const isStringRepresentNumber = (string, what) => {
  if (!/^\d+$/.test(string)) {
    throw new Error(`The ${what} should represent a number`);
  }
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  A função abaixo vai validar o AM e PM que foram desestruturados na função validateHour().
const validateAbbreviation = (abbreviation) => {
  if (!['AM', 'PM'].includes(abbreviation)) {
    throw new Error('The abbreviation must be \'AM\' or \'PM\'');
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A função abaixo é chamada para validar a hora passada como parâmetro para a função getOpeningHours(). Hour deve estar no seguinte formato: 08:42-AM. Ao usar o split('-'), eu separo o a hora em elementos de um array e uso o '-' para indicar onde será a separação. Sendo assim, ao dar o split em 08:42-AM, tenho o seguinte retorno: [ '08:42', 'AM' ].
// A constante [number, abbreviation] apenas desestruturou o array.
// A constante [dataHours, dataMinutes] pegou o elemento number da desestruturação anterior e fez uma nova desestruturação, agora no array originado pelo split, que é este aqui: [ '08', '42' ].
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// No switch case abaixo, ele não selecionou uma variável para comparar e sim o próprio valor booleano. Neste caso, o false. Sendo assim, se o primeiro case der falso, ele entra no erro, o mesmo vale para o segundo caso.
// O Number() usado dentro do case é um método que transforma strings ou outros valores em números. Portanto, Number('08'), que representa Number(dataHours), resulta em 08.

const validateHour = (hour) => {
  const [number, abbreviation] = hour.toUpperCase().split('-');
  const [dataHours, dataMinutes] = number.split(':');
  isStringRepresentNumber(dataHours, 'hour');
  isStringRepresentNumber(dataMinutes, 'minutes');
  validateAbbreviation(abbreviation);
  switch (false) {
  case Number(dataHours) >= 0 && Number(dataHours) <= 12:
    throw new Error('The hour must be between 0 and 12');
  case Number(dataMinutes) >= 0 && Number(dataMinutes) <= 59:
    throw new Error('The minutes must be between 0 and 59');
  default:
    return null;
  }
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A função abaixo vai pegar o parâmetro adjustedDay e verificar se ele está presente no array weekDays. Caso negativo, a função já retorna o erro estabelecido na consta dayError no início do arquivo.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

const validateDay = (day) => {
  if (!weekDays.includes(day)) {
    throw new Error(dayError);
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A função abaixo é chamada na função getOpeningHours() para verificar se os dois parâmetros desta última foram preenchidos.

const empty = (one, two) => !one && !two;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A função fix12 recebe três número como parâmetros, que podem variar de 0 até 12. O objetivo aqui é retornar um objeto com as chaves h, o, c. Em cada chave há uma condicional, caso qualquer um desses valores seja igual a 12, ele deve ser modificado para 0. Do contrário, mantem-se o valor informado.
const fix12 = (hour, open, close) => ({
  h: (hour === 12) ? 0 : hour,
  o: (open === 12) ? 0 : open,
  c: (close === 12) ? 0 : close,
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Os parâmetros abaixo correspondem a:
// period - AM ou PM
// hour - número entre 0 e 12
// open - número capturado na const { open, close } = hours[adjustedDay]
// close - número capturado na const { open, close } = hours[adjustedDay]
// O retorno da função fix12 é um objeto, por exemplo: {h: 9, o: 8, c: 6}. A partir daí, eu desestruturo esse objeto e uso suas chaves para fazer as comparações.
// O retorno da função openOrClosed() é um booleano.
const openOrClosed = (period, hour, open, close) => {
  const { o, c, h } = fix12(hour, open, close);
  return (period === 'AM' && h >= o) || (period === 'PM' && h < c);
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// A constante adjustedDay vai colocar um nome em um formato padrão: primeira letra maiúscula e minúscula a partir da segunda letra. O slice(1), ele retira a primeira letra da string.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Esta expressão -- if (empty(day, dataHour)) return hours -- verifica se ambos os parâmetros (day e dataHours) estão vazios. Em caso positivo, o retorno é o próprio objeto hours importado no início do arquivo:
// {
//   Tuesday: { open: 8, close: 6 },
//   Wednesday: { open: 8, close: 6 },
//   Thursday: { open: 10, close: 8 },
//   Friday: { open: 10, close: 8 },
//   Saturday: { open: 8, close: 10 },
//   Sunday: { open: 8, close: 8 },
//   Monday: { open: 0, close: 0 }
// }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Essa expressão const { open, close } = hours[adjustedDay] vai acessar e desestruturar as chaves que compõem o valor da propriedade que está no objeto hours.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// O if (empty(close, open)) vai verificar se o close e o open estão vazios. Caso sim, é retornado 'The zoo is closed'.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// O dataHour.split('-') vai retornar um array, por exemplo [ '8:45', 'PM' ]. A partir daí, a função pegou o último elemento e colocou todo em maiúsculo, para caso ele não estivesse.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// O dataHour.split(':') vai retornar um array, por exemplo [ '8', '45-PM' ]. a partir daí, a função pega o primeiro elemento e usa o Number() para tranformar em número.

const getOpeningHours = (day, dataHour) => {
  if (empty(day, dataHour)) return hours;
  const adjustedDay = `${day[0].toUpperCase()}${day.slice(1).toLowerCase()}`;
  validateDay(adjustedDay);
  validateHour(dataHour);
  const { open, close } = hours[adjustedDay];
  if (empty(close, open)) return 'The zoo is closed';
  const period = dataHour.split('-')[1].toUpperCase();
  const hour = Number(dataHour.split(':')[0]);
  let message = 'The zoo is ';
  message += openOrClosed(period, hour, open, close) ? 'open' : 'closed';
  return message;
};

// console.log(getOpeningHours('Friday', '10:00-zM'));

module.exports = getOpeningHours;

const data = require('../data/zoo_data');
// console.log(data); - retorna um grande objeto

const especies = data.species; // retorna um array de objetos
console.log(especies);

// ---------------------------------------------------------------- ANOTAÇÕES GERAIS ---------------------------------------------------------------------------------
// a função vai verificar a espécie e depois contar a quantidade de residentes daquela espécie. Se não houver parâmetro, a função retorna um objeto com todas as espécies com suas respectivas quantidades.

// function countAnimals(animal) {
//   const todasEspecies = especies.map(({ name, residents }) => ({ [name]: residents.length })); // retorna um array de objetos com os nomes das espécies como chave e a quantidade de animais em cada uma delas como valor.
// ---------------------------------------------------------------------------------
//   o objetivo no código abaixo foi transformar o array de objetos em um único objeto. Para isso, usei o reduce() e coloquei um objeto vazio como valor inicial. A partir daí, dei um Object.assign, que une um ou mais objetos em um só. Dessa forma, consegui ir 'somando' o curr dentro do acc. Com o console.log abaixo, é possível verificar melhor essa junção a cada iteração.
// ----------------------------------------------------------------
//   const todasEspeciesObjeto = todasEspecies.reduce((acc, curr) => {
//     // console.log('acc', acc, 'curr', curr)
//     return Object.assign(acc,curr)
//     }, {});
//   return todasEspeciesObjeto;
// }
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// No código abaixo, eu retornei um array de objetos, contendo a chave specie e nome da espécie como valor, e também a chave residents que tem como valor um array de objetos contendo nome de cada animal, idade e sexo.
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const especiesEResidentes = especies.map(({ name, residents }) => ({specie: name, residents}));
//   return console.log(especiesEResidentes);
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// No código abaixo, o find retorna um objeto com a chave specie e a chave residents(que é um array de objetos com informações de cada animal daquela espécie).
// {
//   especie: 'penguins',
//   residents: [
//     { name: 'Joe', sex: 'male', age: 10 },
//     { name: 'Tad', sex: 'male', age: 12 },
//     { name: 'Keri', sex: 'female', age: 2 },
//     { name: 'Nicholas', sex: 'male', age: 2 }
//   ]
// }
// Na função, preciso retornar o número de residentes da espécie passada por parâmetro e não o objeto inteiro referente a ela. Para acessar esse número, entro na propriedade residents e dou o length.
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// if (animal.specie && !animal.sex) {
//   return especiesEResidentes.find(({ especie }) => especie === animal.specie).residents.length;
// }
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// No código abaixo, o objeto encontrado representa:
// {
//   especie: 'penguins',
//   residents: [
//     { name: 'Joe', sex: 'male', age: 10 },
//     { name: 'Tad', sex: 'male', age: 12 },
//     { name: 'Keri', sex: 'female', age: 2 },
//     { name: 'Nicholas', sex: 'male', age: 2 }
//   ]
// }
// A parir desse resultado, preciso acessar a propriedade residents para fazer a verificação do sexo dos animais da espécie selecionada, por isso usei o objetoEncontrado.residents
// Na sequência, usei um filter() porque preciso retornar todos animais que são do sexo passado como parâmetro da função, que é o resultado abaixo:
// [
//   { name: 'Joe', sex: 'male', age: 10 },
//   { name: 'Tad', sex: 'male', age: 12 },
//   { name: 'Nicholas', sex: 'male', age: 2 }
// ]
// Para saber a quantidade de animais, que é o que a função precisa retornar é só acrescentar ao final do filter().length
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const objetoEncontrado = especiesEResidentes.find(({ especie }) => especie === animal.specie);
//   return objetoEncontrado.residents.filter(({ sex }) => sex === animal.sex).length;
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function countAnimals(animal) {
  const todasEspecies = especies.map(({ name, residents }) => ({ [name]: residents.length }));
  const todasEspeciesObjeto = todasEspecies.reduce((acc, curr) => Object.assign(acc, curr), {});
  const especiesEResidentes = especies.map(({ name, residents }) => ({ especie: name, residents }));

  if (!animal) {
    return todasEspeciesObjeto;
  }
  if (animal.specie && !animal.sex) {
    return especiesEResidentes.find(({ especie }) => especie === animal.specie).residents.length;
  }
  const objetoEncontrado = especiesEResidentes.find(({ especie }) => especie === animal.specie);
  return objetoEncontrado.residents.filter(({ sex }) => sex === animal.sex).length;
}

// console.log(countAnimals({ specie: 'penguins', sex: 'male' }));

module.exports = countAnimals;

const data = require('../data/zoo_data');

const { species } = data;
// console.log(species)

function filtroPorNome(arrayDeObjetos) {
  return arrayDeObjetos.map(({ name }) => name);
}

function filtrandoAnimais(localizacao) {
  const animaisFiltrados = species.filter(({ location }) => location === localizacao);
  return filtroPorNome(animaisFiltrados);
}

function especiesPorRegiao() {
  return {
    NE: filtrandoAnimais('NE'),
    NW: filtrandoAnimais('NW'),
    SE: filtrandoAnimais('SE'),
    SW: filtrandoAnimais('SW'),
  };
}

function nomeandoAnimais(nome) {
  const { residents } = species.find(({ name }) => name === nome);
  return residents.map(({ name }) => name);
}

function especiesPorNome() {
  const { NE, NW, SE, SW } = especiesPorRegiao();
  return {
    NE: NE.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
    NW: NW.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
    SE: SE.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
    SW: SW.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
  };
}

function especiesOrdenadas({ NE, NW, SE, SW }) {
  return {
    NE: NE.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
    NW: NW.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
    SE: SE.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
    SW: SW.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
  };
}

function nomeandoPorSexo(especie, sexo) {
  const { residents } = species.find(({ name }) => name === especie);
  const animaisPorSexo = residents.filter(({ sex }) => sex === sexo);
  return animaisPorSexo.map(({ name }) => name);
}

function especiesPorSexo(sexo) {
  const { NE, NW, SE, SW } = especiesPorRegiao();
  return {
    NE: NE.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
    NW: NW.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
    SE: SE.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
    SW: SW.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
  };
}

function analisandoOrdenacao(sex) {
  if (!sex) {
    return especiesOrdenadas(especiesPorNome());
  } return especiesOrdenadas(especiesPorSexo(sex));
}

function getAnimalMap(options) {
  if (!options || !options.includeNames) return especiesPorRegiao();

  const { sex, sorted } = options;

  if (sorted) return analisandoOrdenacao(sex);

  if (sex) return especiesPorSexo(sex);

  return especiesPorNome();
}

module.exports = getAnimalMap;

// ---------------------------------------------------------------- ANOTAÇÕES GERAIS ---------------------------------------------------------------------------------
// A função nomeandoAnimais(arrayDeObjetos) retorna:
//
// [ 'lions', 'giraffes' ]
//
// --------------------------------------------------------------------------------------------------
// A função filtrandoAnimais(localizacao) retorna:
//
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
//     id: '01422318-ca2d-46b8-b66c-3e9e188244ed',
//     name: 'giraffes',
//     popularity: 4,
//     location: 'NE',
//     availability: [ 'Wednesday', 'Thursday', 'Tuesday', 'Friday' ],
//     residents: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
//   }
// ]
//
//--------------------------------------------------------------------------------------------------
// A função especiesPorRegiao() retorna:
//
// {
//   NE: ['lions', 'giraffes'],
//   NW: ['tigers', 'bears', 'elephants'],
//   SE: ['penguins', 'otters'],
//   SW: ['frogs', 'snakes'],
// };
//
//--------------------------------------------------------------------------------------------------
// A função nomeandoAnimais(nome) retorna em residents:
//
// [
//   { name: 'Zena', sex: 'female', age: 12 },
//   { name: 'Maxwell', sex: 'male', age: 15 },
//   { name: 'Faustino', sex: 'male', age: 7 },
//   { name: 'Dee', sex: 'female', age: 14 }
// ]
//
// Na sequência, por meio da constante nomes, retorna:
//
// [ 'Zena', 'Maxwell', 'Faustino', 'Dee' ]
//
//--------------------------------------------------------------------------------------------------
// A função especiesPorNomeRegiao() desestrutura cada chave do objeto gerado em especiesPorRegiao(). O valor de cada chave é um array com os nomes das espécies. Sendo assim, posso usar o map() para percorrer os elementos.
//
// NE.map((nome) => ({ [nome]: nomeandoAnimais(nome)}))
//
// O objetivo do map() é gerar um objeto no lugar de cada string de nomes. A própria string será a chave do objeto e seu valor é o resultado da função nomeandoAnimais().
// O resultado é:
//
// {
//   NE: [ { lions: [Array] }, { giraffes: [Array] } ],
//   NW: [ { tigers: [Array] }, { bears: [Array] }, { elephants: [Array] } ],
//   SE: [ { penguins: [Array] }, { otters: [Array] } ],
//   SW: [ { frogs: [Array] }, { snakes: [Array] } ]
// }
//
//--------------------------------------------------------------------------------------------------
// A função nomeandoAnimais(nome) vai encontrar o objeto da espécie que está ligada ao nome por meio do find(). Desse retorno, só quero acessar a propriedade residents. Então já fiz a desestruturação direta:
//
// const { residents } = species.find(({ name }) => name === nome);
//
// A expressão acima retorna:
//
// [
//   { name: 'Zena', sex: 'female', age: 12 },
//   { name: 'Maxwell', sex: 'male', age: 15 },
//   { name: 'Faustino', sex: 'male', age: 7 },
//   { name: 'Dee', sex: 'female', age: 14 }
// ]
//
// Entretanto, só quero os nomes. Então, usei o map() para refazer o array.
//
// residents.map(({ name }) => name);
//
// O retorno do map() será:
//
// [ 'Zena', 'Maxwell', 'Faustino', 'Dee' ]
//
//--------------------------------------------------------------------------------------------------
// A função todosNomesOrdenados() vai pegar o objeto resultado da função especiesPorNomeERegiao() e ajustá-lo, ordenando os nomes dos bichos de cada espécie. Para isso, usei novamente o map() e os métodos Object.keys() e Object.values() para acessar as chaves e valores de cada objeto que está dentro do array que compõe as localizações.
//
// Como as chaves são o nome da espécie, não tenho um nome padrão para chamá-las. Assim, usei [Object.keys(objeto)] para fazer essa chamada. Depois, fiz Object.values(objeto) para acessar o valor da chave. Porém, o valor é um array e Object.values colocou esse array dentro de outro array: [ [ 'Zena', 'Maxwell', 'Faustino', 'Dee' ] ]. Sendo assim, precisei usar o [0] para acessar o array com os nomes e aí sim dar o sort().
//
//--------------------------------------------------------------------------------------------------
// Inicialmente, eu tinha colocado a função getAnimalMap() da seguinte forma:
//
// if (!options) {
//   return especiesPorRegiao();
// }

// const chaves = Object.keys(options);
// const valores = Object.values(options);
// const machoOuFemea = valores.find((elemento) => elemento === 'female' || elemento === 'male')

// if (chaves.includes('includeNames') && chaves.includes('sex') && chaves.includes('sorted')) {
//   return especiesOrdenadas(especiesPorSexo(machoOuFemea));
// }

// if (chaves.includes('includeNames') && chaves.includes('sex')) {
//   return especiesPorSexo(machoOuFemea);
// }

// if (chaves.includes('includeNames') && chaves.includes('sorted')) {
//   return especiesOrdenadas(especiesPorNome());
// }

// if (chaves.includes('includeNames')) {
//   return especiesPorNome();
// }

// return especiesPorRegiao();

// Precisei refatorar várias vezes, pois o Lint reclamava da complexidade e do número de linhas.

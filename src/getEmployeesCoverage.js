const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

// ---------------------------------------------------------------- ANOTAÇÕES GERAIS ---------------------------------------------------------------------------------
// A constante employees retorna um array com os dados dos funcionários, porém não no formato que a função getEmployeesCoverage() deve ter:
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
// ---------------------------------------------------------------------------------------------------------------
// A função getEmployeesCoverage() deve retornar objetos no seguinte formato:
//
// {
//   id: 'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//   fullName: 'Nigel Nelson',
//   species: [ 'lions', 'tigers' ],
//   locations: [ 'NE', 'NW' ],
// }
//
// Dependendo do parâmetro passado, ela retorna apenas um objeto ou um array de objetos, sendo que cada objeto contém as informações do funcionário.
// ---------------------------------------------------------------------------------
// A constante especies retorna um array de objetos com os dados de cada espécie. Cada objeto aparece da seguinte maneira:
// {
//   id: '01422318-ca2d-46b8-b66c-3e9e188244ed',
//   name: 'giraffes',
//   popularity: 4,
//   location: 'NE',
//   availability: [ 'Wednesday', 'Thursday', 'Tuesday', 'Friday' ],
//   residents: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
// }
// ---------------------------------------------------------------------------------
//
// Função qualAnimal()
//
// O find() dela retorna o objeto com todos os dados do animal, do mesmo jeito que consta na linha 32. Só que o que eu quero é o nome do animal, então desestruturei a chave name e retornei essa string. No exemplo: 'giraffes'.
// ---------------------------------------------------------------------------------
//
// Função identificandoEspecies()
//
// Esta função vai receber como parâmetro cada elemento do grande array de objetos employees. Ou seja, um objeto, como o apresentado na linha 6. Uma das chaves desse objeto é responsibleFor. Então já desestruturei ela no próprio parâmetro. A questão é que responsibleFor é um array com os ids das espécies dos bichos. O que quero é um array com os nomes dos bichos. Então, usei o map() para modificar todo o array, subtituindo o id pelo resultado da função qualAnimal(), ou seja, uma string. Passando como exemplo, o objeto da linha 6, meu resultada será:
//
// [ 'lions', 'tigers' ]
//
// Eu poderia fazer apenas responsibleFor.map((idAnimal) => qualAnimal(idAnimal)) para conseguir tal resultado. A questão é que identificandoEspecies() está dentro de um forEach. Então preciso fazer responsibleFor.map((idAnimal, index) => responsibleFor[index] = qualAnimal(idAnimal)) para transformar o array employees, já que o próprio forEach não tem retorno. O resultado final é:
// {
//   id: 'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//   firstName: 'Nigel',
//   lastName: 'Nelson',
//   managers: [
//     '0e7b460e-acf4-4e17-bcb3-ee472265db83',
//     'fdb2543b-5662-46a7-badc-93d960fdc0a8'
//   ],
//   responsibleFor: [ 'lions', 'tigers' ]
// }
// ---------------------------------------------------------------------------------
//
// Função insereLocalizacoes(arrayBichos)
//
// Esta função pega como parâmetro a chave desestruturada responsibleFor, com os valores já alterados para strings. A partir daí, eu preciso percorrer todo esse array com nomes de animais para depois verificar a localização. Então, fiz um forEach() no argumento species, que é o array do responsibleFor:
//
// arrayBichos.forEach((specie) => array.push(qualLocalizacao(bicho)));
//
// O forEach acima tem a função de dar push no array vazio criado dentro de insereLocalizacoes(). A quantidade de push() vai depender da quantidade de elementos em species. A cada push(), vou chamar a função qualLocalizacao(bicho). Sendo assim, o retorno para species sendo [ 'lions', 'tigers' ], por exemplo, será [ 'NE', 'NW' ].
//
// ---------------------------------------------------------------------------------
//
// Função qualLocalizacao(bicho)
//
// Nesta função, eu usei o find() para encontrar a espécie que desejo. Para isso, comparei o nome de specie (correspondente a cada iteração do forEach), com os nomes que estão listado no array de espécies, que possui os dados completos de todas as espécie. O find() vai me trazer o objeto completo, mas só quero o valor da chave location, portanto ao final da expressão coloquei o .location
// O retorno neste caso é apenas o NE, NW, SE etc.
// const location = especies.find(({ name }) => specie === name).location;
//
//---------------------------------------------------------------------------------
//
// Função function dadosDosFuncionarios()
//
// Esta função guarda os dados alterados de todos os funcionários, no formato de um array com objetos do tipo:
//
// {
//   id: 'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//   fullName: 'Nigel Nelson',
//   species: [ 'lions', 'tigers' ],
//   locations: [ 'NE', 'NW' ],
// }
//
// Só que dadosDosFuncionarios() não pode ser chamada mais uma vez, pois daria erro. Afinal, eu estaria querendo modificar o objeto que já está modificado. O erro iria aparecer na hora de tranformar os id dos animais que estão em responsibleFor para nomes, porque eles já estão como nomes agora. Então na hora de rodar a função qualAnimal() apareceria o seguinte erro: Cannot destructure property 'name' of 'especies.find(...)' as it is undefined.
//---------------------------------------------------------------------------------
//
// Função function getEmployeesCoverage()
//
// Inicialmente, tinha organizado esta função da seguinte maneira:
//
// if (!pessoa) {
//   return dadosDosFuncionarios();
// }
// if (Object.keys(pessoa).includes('id')) {
//   return dadosDosFuncionarios().find(({ id }) => id === pessoa.id)
// }
// if (Object.keys(pessoa).includes('name')) {
//   return dadosDosFuncionarios().find(({ fullName }) => fullName.includes(pessoa.name))
// }
//
// Só que aí o programa quebrava depois da primeira chamada getEmployeesCoverage(). Afinal, a partir da segunda vez, a função chamava de novo dadosDosFuncionarios(), dando o erro que indiquei na linha 95. Para evitar o problema, atribui o retorno de dadosDosFuncionarios() à constante listaFuncionarios, que está fora da função getEmployeesCoverage(), sendo chamada apenas uma vez.
//
// Para evitar fazer dois if comparando id e nome, resolvi isolar o valor do objeto passado por parâmetro usando o const valorPessoa = Object.values(pessoa). Aqui vou ter um array de um único elemento contendo uma string. Na sequência, faço a validação do dado do parâmetro usando o some:
//
// const dadosValidos = listaFuncionarios.some(({ id, fullName }) => valorPessoa.includes(id) || fullName.includes(valorPessoa[0]));
//
// Depois, uso o if para dar o retorno com o filtro por funcionário ou o erro do Throw caso os dados do parâmetro sejam inválidos.
//
// ATENÇÃO --- depois que tirei os forEach, não tem mais problema chamar a função dadosDosFuncionarios() várias vezes, pois o array original employees não sofre alteração.--- ATENÇÃO
//
//---------------------------------------------------------------------------------
//
// MUDANÇAS POR CONTA DO LINT
//
// Eu precisei ajustar uma parte do código porque o lint deu erro na função identificandoEspecies (agora nomeandoEspecies). A função estava assim:
//
// responsibleFor.map((idAnimal, index) => responsibleFor[index] = qualAnimal(idAnimal))
//
// Mas o lint dizia  Arrow function should not return assignment. Ou seja, eu não podia usar o index passado por parâmetro como retorno da função. O problema é que não fazer isso quebrava todo o meu código, pois nomeandoEspecies estava dentro de um forEach, que não tem retorno por si só. Para resolver a situação do lint, tirei o forEach e chamei a função nomeandoEspecies na hora de passar o valor para a chave species, na constante dadosCompletos. Em insereLocalizacoes, fiz um pequeno ajuste. Afinal, o responsibleFor passado por parâmetro volta a ser somente de ids. Portanto, dentro de insereLocalizacoes, chamo novamente a função nomeandoEspecies e coloco seu resultado na constante arrayComNomes. Agora, a partir desta constante é que sigo o processo de encontrar a localização. Inclusive, vi que era mais prático usar o map em vez do forEach.

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const { employees } = data;

function qualAnimal(idDoAnimal) {
  const { name } = species.find(({ id }) => id === idDoAnimal);
  return name;
}

function nomeandoEspecies(arrayId) {
  return arrayId.map((idAnimal) => qualAnimal(idAnimal));
}

function qualLocalizacao(bicho) {
  const animal = species.find(({ name }) => bicho === name);
  const { location } = animal;
  return location;
}

function insereLocalizacoes(arrayId) {
  const arrayComNomes = nomeandoEspecies(arrayId);
  return arrayComNomes.map((bicho) => qualLocalizacao(bicho));
}

function dadosDosFuncionarios() {
  const dadosCompletos = employees.map(({ id, firstName, lastName, responsibleFor }) => {
    const listaAtualizada = {
      id,
      fullName: `${firstName} ${lastName}`,
      species: nomeandoEspecies(responsibleFor),
      locations: insereLocalizacoes(responsibleFor),
    };
    return listaAtualizada;
  });
  return dadosCompletos;
}

function getEmployeesCoverage(pessoa) {
  if (!pessoa) {
    return dadosDosFuncionarios();
  }

  const valorPessoa = Object.values(pessoa);

  const dadosValidos = dadosDosFuncionarios()
    .some(({ id, fullName }) => valorPessoa.includes(id) || fullName.includes(valorPessoa[0]));

  if (dadosValidos) {
    return dadosDosFuncionarios()
      .find(({ id, fullName }) => valorPessoa.includes(id) || fullName.includes(valorPessoa[0]));
  } throw new Error('Informações inválidas');
}

// console.log(getEmployeesCoverage({ name: 'Sharonda' }));
// console.log(getEmployeesCoverage({ name: 'Spry' }));
// console.log(getEmployeesCoverage({ id: 'c1f50212-35a6-4ecd-8223-f835538526c2' }));
// console.log(getEmployeesCoverage());
// console.log(getEmployeesCoverage({ id: 'Id inválido' }));

module.exports = getEmployeesCoverage;

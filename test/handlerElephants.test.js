const handlerElephants = require('../src/handlerElephants');
// a função handlerElephants é case sensitive

describe('Testes da função HandlerElephants', () => {
  it('Não passando argumentos a função deve retornar undefined', () => {
    expect(handlerElephants()).toBeUndefined();
  });
  it('Para o argumento -averageAge-, a função deve retornar um número próximo a 10.5', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('Para o argumento -names-, a função deve retornar um array de nomes que possui o nome Jefferson', () => {
    expect(handlerElephants('names')).toEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
  });
  it('Para o argumento -count- deve retornar o número inteiro 4', () => {
    expect(handlerElephants('count')).toBe(4);
  });
  it('Para o argumento -location-, a função deve retornar a string NW', () => {
    expect(handlerElephants('location')).toMatch('NW');
  });
  it('Se o argumento passado não for uma string, a função deve retornar a mensagem: Parâmetro inválido, é necessário uma string', () => {
    expect(handlerElephants(true)).toMatch('Parâmetro inválido, é necessário uma string');
    expect(handlerElephants(5)).toMatch('Parâmetro inválido, é necessário uma string');
    expect(handlerElephants([])).toMatch('Parâmetro inválido, é necessário uma string');
    expect(handlerElephants({})).toMatch('Parâmetro inválido, é necessário uma string');
  });
  it('Para o argumento -availability-, a função deve retornar um array de dias da semana que não contém Monday', () => {
    expect(handlerElephants('availability')).toEqual(['Friday', 'Saturday', 'Sunday', 'Tuesday']);
  });
  it('Para o argumento -id-, a função deve retornar uma string igual bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5', () => {
    expect(handlerElephants('id')).toMatch('bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5');
  });
  it('Para o argumento -residents-, a função deve retornar um array de objetos contendo todos os animais da espécie', () => {
    const residentes = [
          { name: 'Ilana', sex: 'female', age: 11 },
          { name: 'Orval', sex: 'male', age: 15 },
          { name: 'Bea', sex: 'female', age: 12 },
          { name: 'Jefferson', sex: 'male', age: 4 }
        ]
    expect(handlerElephants('residents')).toEqual(residentes);
  });
  it('Para o argumento -id-, a função deve retornar uma string igual bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5', () => {
    expect(handlerElephants('id')).toMatch('bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5');
  });
});

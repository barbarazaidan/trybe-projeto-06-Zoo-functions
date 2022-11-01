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
  it('Para o argumento -popularity-, a função deve retornar um número igual ou maior a 5', () => {
    expect(handlerElephants('popularity')).toBeGreaterThanOrEqual(5);
  });
  it('Para o argumento -availability-, a função deve retornar um array de dias da semana que não contém Monday', () => {
    expect(handlerElephants('availability')).toEqual(['Friday', 'Saturday', 'Sunday', 'Tuesday']);
  });
});

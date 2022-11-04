const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Não passando argumentos, a função deve retornar um objeto', () => {
    const result = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(getOpeningHours()).toEqual(result);
  });

  it('Passando Monday como um dos argumentos, a função deve retornar The zoo is closed', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toMatch('The zoo is closed');
  });

  it('Passando como argumentos Wednesday e 09:00-PM, a função deve retornar a string The zoo is closed', () => {
    expect(getOpeningHours('Wednesday', '09:00-PM')).toMatch('The zoo is closed');
  });

  it('Passando como argumentos Tuesday e 09:00-AM, a função deve retornar a string The zoo is open', () => {
    expect(getOpeningHours('Tuesday', '09:00-AM')).toMatch('The zoo is open');
  });

  // it('Passando como rgumentos Thu e 09:00-AM, a função deve lançar uma exceção com a mensagem: The day must be valid. Example: Monday', () => {
  //   expect(getOpeningHours('Thu', '09:00-AM')).toThrow(new Error('The day must be valid. Example: Monday'));
  // });

  // it('Passando argumentos Friday e 09:00-ZM, a função deve lançar uma exceção com a mensagem: The abbreviation must be \'AM\' or \'PM', () => {
  //   expect(getOpeningHours('Friday', '09:00-ZM')).toThrow(new Error(/^The abbreviation must be \'AM\' or \'PM'$/));
  // });

  it('Verifica se a função não faz diferenciação entre maiúsculas e minúsculas', () => {
    expect(getOpeningHours('FRidAY', '10:00-aM')).toMatch('The zoo is open');
  });

  it('', () => {
  });
});

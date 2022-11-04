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

  // --------------------------------------------------------OBSERVAÇÃO-------------------------------------------------------------------------------------------------------
  // Para capturar o erro da função, eu não posso usar o o expect diretamente, por exemplo: expect(getOpeningHours('Thu', '09:00-AM')).toThrow(). Afinal, a função vai falhar e não conseguirei fazer a análise do erro. Quando ela está dentro de outra função, o erro vai ocorrer na arrow function e aí sim ficará armazenado no expect para ser comparado com o toThrow.
  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  it('Passando como rgumentos Thu e 09:00-AM, a função deve lançar uma exceção com a mensagem: The day must be valid. Example: Monday', () => {
    expect(() => getOpeningHours('Thu', '09:00-AM')).toThrow(new Error('The day must be valid. Example: Monday'));
  });

  it('Passando como argumentos Sunday e 09:c0-AM, a função deve lançar uma exceção com a mensagem: The minutes should represent a number', () => {
    expect(() => getOpeningHours('Sunday', '09:c0-AM')).toThrow(new Error('The minutes should represent a number'));
  });

  // --------------------------------------------------------OBSERVAÇÃO-------------------------------------------------------------------------------------------------------
  // Quando uso toThrow(new Error('The day must be valid. Example: Monday')) preciso colocar a string entre aspas. Quando uso apenas toThrow, posso colocar a string somente entre aspas ou usar a seguinte formatação /^The abbreviation must be \'AM\' or \'PM'$/.
  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  it('Passando argumentos Friday e 09:00-ZM, a função deve lançar uma exceção com a mensagem: The abbreviation must be \'AM\' or \'PM', () => {
    expect(() => getOpeningHours('Friday', '09:00-ZM')).toThrow(/^The abbreviation must be 'AM' or 'PM'$/);
  });

  it('Passando como argumentos Saturday e C9:00-AM, a função deve lançar uma exceção com a mensagem: The hour should represent a number', () => {
    expect(() => getOpeningHours('Saturday', 'C9:00-AM')).toThrow('The hour should represent a number');
  });

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  it('Verifica se a função não faz diferenciação entre maiúsculas e minúsculas', () => {
    expect(getOpeningHours('FRidAY', '10:00-aM')).toMatch('The zoo is open');
  });
});

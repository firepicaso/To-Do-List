const { stringLength, reverseString, calculator } = require('./sum');

describe('testing string length', () => {
  test('string length of \'tree\' is 4', () => {
    expect(stringLength('tree')).toBe(4);
  });
  
  test('string length of \'\' is less than 1', () => {
    expect(() => stringLength('')).toThrow('string needs to have at least 1 character');
  });
  
  test('string length of \'totallynew line\' is greater than 10', () => {
    expect(() => stringLength('totallynew line')).toThrow('string needs to have less than 10 character');
  });
  
  test('reverse of tree is eert', () => {
    expect(reverseString('tree')).toEqual('eert');
  });
});

describe('testing calculator class', () => {
  const calc = new calculator();
  test('dividing 8 with 2 will result 4', () => {
    expect(calc.divide(8,2)).toBe(4);
  });
  test('dividing 8 with 0 will throw an error', () => {
    expect(() => calc.divide(8,0)).toThrow('cannot divide by zero');
  });
});
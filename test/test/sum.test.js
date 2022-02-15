const sum = require('../sum');

test("sum 1,2 to 3",() => {
  expect(sum(1,2)).toBe(3);
})
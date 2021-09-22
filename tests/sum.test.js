function sum(a, b) {
  return a + b;
}
module.exports = sum;

test('adds 1 + 2 to equal three', () => {
  expect(sum(1, 2)).toBe(3);
});

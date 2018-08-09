import { isValidSummonerName } from './summonerHelpers';

test('isValidSummonerName should be false for invalid characters', () => {
  const summonerName = 'My Cool Name!';
  const result = isValidSummonerName(summonerName);
  expect(result).toBe(false);
});

test('isValidSummonerName should be false if empty', () => {
  const summonerName = '';
  const result = isValidSummonerName(summonerName);
  expect(result).toBe(false);
});

test('isValidSummonerName should be false if too long', () => {
  const summonerName = 'This is my really long name';
  const result = isValidSummonerName(summonerName);
  expect(result).toBe(false);
});

test('isValidSummonerName should be true for a common name', () => {
  const summonerName = 'BFY Meowington';
  const result = isValidSummonerName(summonerName);
  expect(result).toBe(true);
});

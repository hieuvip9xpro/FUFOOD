import 'react-native';
import React from 'react';
import Main from '../components/Main';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Main snapshot', () => {
  const snap = renderer.create(
    <Main />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

it('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});

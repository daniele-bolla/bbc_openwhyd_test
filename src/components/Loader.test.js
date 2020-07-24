import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';

import { render } from '@testing-library/react';

import Loader from './Loader';

function selectGenre(genre) {
  return genre;
}
const wrapper = (isLoading, message) =>
  render(
    <ThemeProvider theme={theme}>
      <Loader isLoading={isLoading} message={message} />
    </ThemeProvider>
  );

it('renders a overlay-alert when is loading', () => {
  const isLoading = true;
  const message = 'Is Loading...';
  const { queryByTestId, queryByText } = wrapper(isLoading, message);
  expect(queryByTestId('overlay')).toBeTruthy();
  expect(queryByText(message)).toBeTruthy();
});

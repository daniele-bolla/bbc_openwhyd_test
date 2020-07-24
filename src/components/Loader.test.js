import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';
import { render } from '@testing-library/react';
import Loader from './Loader';

const wrapper = (isLoading, message) =>
  render(
    <ThemeProvider theme={theme}>
      <Loader isLoading={isLoading} message={message} />
    </ThemeProvider>
  );

describe('The Loader component', () => {
  it('renders a overlay-alert when is loading', () => {
    const isLoading = true;
    const message = 'Is Loading...';
    const { queryByTestId, queryByText } = wrapper(isLoading, message);
    expect(queryByTestId('overlay')).toBeTruthy();
    expect(queryByText(message)).toBeTruthy();
  });

  it('not renders a overlay-alert when is not loading', () => {
    const isLoading = false;
    const message = 'Is Loading...';
    const { queryByTestId, queryByText } = wrapper(isLoading, message);
    expect(queryByTestId('overlay')).toBeFalsy();
    expect(queryByText(message)).toBeFalsy();
  });
});

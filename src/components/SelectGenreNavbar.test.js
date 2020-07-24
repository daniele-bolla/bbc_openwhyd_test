import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';
import { render, fireEvent, screen } from '@testing-library/react';
import SelectGenreNavbar from './SelectGenreNavbar';

const selectGenre = jest.fn();

const wrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <SelectGenreNavbar selectGenre={selectGenre} />
    </ThemeProvider>
  );

describe('The SelectGenreNavbar component', () => {
  it('renders a label and a select', () => {
    const { queryByLabelText, getByTestId } = wrapper();
    expect(getByTestId('select')).toBeTruthy();
    expect(queryByLabelText('Select a genre')).toBeTruthy();
  });

  it('updates the value and use the parent function', () => {
    const { getByTestId } = wrapper();
    fireEvent.change(getByTestId('select'), { target: { value: 'indie' } });
    expect(getByTestId('select').value).toBe('indie');
    expect(selectGenre).toHaveBeenCalled();
  });
});

import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';
import { render, fireEvent, screen } from '@testing-library/react';
import SelectGenreNavbar from './SelectGenreNavbar';

const selectGenre = jest.fn((genre) => genre);

const wrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <SelectGenreNavbar selectGenre={selectGenre} />
    </ThemeProvider>
  );

describe('The SelectGenreNavbar component', () => {
  it('renders a label and a select', () => {
    const { getByLabelText, getByTestId } = wrapper();
    expect(getByTestId('select')).toBeTruthy();
    expect(getByLabelText('Select a genre')).toBeTruthy();
  });

  it('updates the select value and use the parent function', () => {
    const { getByTestId } = wrapper();
    const select = getByTestId('select');
    const value = 'indie';
    fireEvent.change(select, { target: { value } });
    expect(select.value).toBe(value);
    expect(selectGenre).toHaveBeenCalled();
    //  expect(selectGenre).toHaveBeenCalledWith('indie');
    // expect(selectGenre).toHaveReturnedWith('indie');
  });
});

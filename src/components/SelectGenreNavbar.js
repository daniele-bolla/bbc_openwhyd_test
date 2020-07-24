import React from 'react';
import BaseSelect from './BaseSelect';
import PropTypes from 'prop-types';
import Stickyfill from 'stickyfilljs';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const navbarEl = document.querySelectorAll('.sticky');
Stickyfill.add(navbarEl);

const genreTags = [
  'all',
  'electro',
  'hip hop',
  'indie',
  'folk',
  'rock',
  'punk',
  'metal',
  'blues',
  'r&b',
  'soul',
  'jazz',
  'classical',
  'reggae',
  'pop',
  'latin',
  'world',
];
const stickySearchBarStyle = (theme) => css`
  position: fixed;
  position: sticky;
  top: 0px;
  padding: 1rem;
  background: ${theme.colors.white};
  border: solid 0.2rem ${theme.colors.grey};
  display: flex;
  align-items: center;
  &:before,
  &:after {
    content: '';
    display: table;
  }
`;
const labelStyle = css`
  flex: 1;
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
`;
const selectStyle = css`
  flex: 1.5;
`;

export default function SelectGenreNavbar({ selectGenre }) {
  return (
    <nav className="sticky" css={stickySearchBarStyle}>
      <label
        data-testid="label-select"
        css={labelStyle}
        htmlFor="searchByGenre"
      >
        Select a genre
      </label>
      <BaseSelect
        data-testid="select"
        css={selectStyle}
        id="searchByGenre"
        placeholder="Select a genre"
        title="Select a Genre"
        onChange={(e) => selectGenre(e)}
        options={genreTags}
      />
    </nav>
  );
}
SelectGenreNavbar.propTypes = {
  selectGenre: PropTypes.func.isRequired,
};

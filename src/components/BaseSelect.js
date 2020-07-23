import React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const selectStyle = (theme) =>
  css`
     {
      display: block;
      height: 2.6rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};
      background-image: none;
      border: 0.1rem solid ${theme.colors.grey};
      border-radius: 0.2rem;
    }

    &:focus {
      border-color: orange;
      outline: none;
    }
  `;

export default function BaseSelect(props) {
  const { options } = props;
  return (
    <select css={selectStyle} {...props}>
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

BaseSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};

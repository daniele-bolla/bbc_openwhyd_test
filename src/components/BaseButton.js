import React from 'react';
import { css, jsx } from '@emotion/core';

const buttonClass = css`
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  margin: 0.6rem 0 0.4rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  display: inline-flex;

  &:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    pointer-events: all;
  }
`;

const BaseButton = (props) => (
  <button
    css={css`
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      margin: 0.6rem 0 0.4rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.2rem;
      display: inline-flex;

      &:focus {
        outline: 1px dotted;
        outline: 5px auto -webkit-focus-ring-color;
      }

      &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
        pointer-events: all;
      }
    `}
    {...props}
  />
);
export default BaseButton;

import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const loaderStyle = css`
  z-index: 999;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Loader({ isLoading, message }) {
  if (!isLoading) return null;
  return (
    <div data-testid="overlay" role="alert" css={loaderStyle}>
      <h3>{message}</h3>
    </div>
  );
}
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

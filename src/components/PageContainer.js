import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
const pageContainerStyle = css`
  width: 80vw;
  max-width: 1200px;
  margin: 1em auto 2em;
  padding: 0.8rem 1rem 1.2rem;
`;
export default function PageContainer({ children }) {
  return <main css={pageContainerStyle}>{children}</main>;
}

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

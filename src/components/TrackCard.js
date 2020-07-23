import React from 'react';
import PropTypes from 'prop-types';
import trackType from './types/trackType';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import LazyLoad from 'react-lazyload';

const trackCardStyle = (theme) => css`
  border: solid 0.2rem ${theme.colors.grey};
  margin: 0.8rem 0.4rem;
  width: 28%;
  padding: 1rem;
  @media screen and (max-width: 1200px) {
    width: 40%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const trackCardTitleStyle = css`
  margin-top: 1rem;
`;
const trackCardBodyStyle = css`
  min-height: 6em;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    height: auto;
  }
`;
const trackCardDescriptionStyle = css`
  text-align: left;
  flex: 1.5;
`;
const trackCardPortraitStyle = css`
  display: flex;
  flex: 1;
  justify-content: center;
`;
const trackCardPortraitImageStyle = css`
  height: 6rem;
  margin-right: 1rem;
  object-fit: contain;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 1.6rem;
  }
`;

export default function TrackCard({ track, children }) {
  const { img, name } = track;
  return (
    <div css={trackCardStyle}>
      <div css={trackCardBodyStyle}>
        <div css={trackCardPortraitStyle}>
          <LazyLoad>
            <img css={trackCardPortraitImageStyle} alt={name} src={img} />
          </LazyLoad>
        </div>
        <div css={trackCardDescriptionStyle}>
          <span css={trackCardTitleStyle}>{name}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

TrackCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
  track: trackType,
};

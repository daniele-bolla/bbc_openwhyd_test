import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const iframeStyle = css`
  width: 80vw;
  height: calc((60vw / 16) * 9);
`;
const formatCases = {
  yt: (url) => formatYoutubeLink(url),
  sc: (url) => formatSoundCloudLink(url),
  bc: (url) => `Not Implemented`,
  vi: (url) => `Not Implemented`,
  dz: (url) => `Not Implemented`,
  fi: (url) => `Not Implemented`,
};

const switchcase = (cases, pred, ...args) => {
  const withOrCasesKey = Object.keys(cases).find((key) => key.includes(pred));
  return withOrCasesKey ? cases[withOrCasesKey](...args) : null;
};

const getWidgetLink = (formatCases, format, urlParams) => {
  return switchcase(formatCases, format, urlParams);
};

const formatYoutubeLink = (urlParams) => {
  const trackUrl = urlParams[2];
  return `https://www.youtube.com/embed/${encodeURIComponent(
    trackUrl
  )}?autoplay=1`;
};

const formatSoundCloudLink = (urlParams) => {
  const trackUrl = urlParams[7];
  return `https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${trackUrl}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
};

export default function Widget({ track }) {
  if (!track) return <p>Track not found or selected</p>;

  const { eId, name } = track;
  const urlParams = eId.split('/');
  const format = urlParams[1];

  const link = getWidgetLink(formatCases, format, urlParams);
  return (
    <iframe
      title={name}
      css={iframeStyle}
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

Widget.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string,
    eId: PropTypes.string,
    img: PropTypes.string,
  }),
};

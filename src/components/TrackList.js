import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import TrackCard from './TrackCard';
import trackType from './types/trackType';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const trackListStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default function TrackList(props) {
  const { tracks, playThis } = props;
  if (!tracks || tracks.length === 0) return <p>No tracks, sorry</p>;
  return (
    <div css={trackListStyle}>
      {tracks.map((track) => {
        return (
          <TrackCard
            key={track._id}
            track={track}
            onClick={(e) => playThis(e, track)}
          >
            <BaseButton full="true" onClick={(e) => playThis(e, track)}>
              Play this
            </BaseButton>
          </TrackCard>
        );
      })}
    </div>
  );
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(trackType),
  playThis: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import LazyLoad from 'react-lazyload';

function List(props) {
  const { tracks, playThis } = props;
  if (!tracks || tracks.length === 0) return <p>No tracks, sorry</p>;
  return (
    <ul>
      {tracks.map((track) => {
        return (
          <li key={track._id} className="list">
            <LazyLoad>
              <img height="160" src={track.img} alt={track.name} />
            </LazyLoad>
            <span className="track-text">{track.name} </span>

            <BaseButton onClick={(e) => playThis(e, track)}>
              Play this
            </BaseButton>
          </li>
        );
      })}
    </ul>
  );
}
List.propTypes = {
  tracks: PropTypes.array,
  playThis: PropTypes.func.isRequired,
};
export default List;

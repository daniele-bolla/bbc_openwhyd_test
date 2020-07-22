import React, { useState, useEffect } from 'react';
import List from './List';
import BaseButton from './BaseButton';

import axios from 'axios';

const genreTags = [
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
const formatCases = {
  // yt: () => youtubePlayer(),
  // sc: () => youtubePlayer(),
  // bc: () => youtubePlayer(),
  // vi: () => youtubePlayer(),
  // vi: () => youtubePlayer(),
  // dz: () => youtubePlayer(),
  // fi: () => youtubePlayer(),
};
const switchcase = (cases, pred, ...args) => {
  const withOrCasesKey = Object.keys(cases).find((key) => key.includes(pred));
  return withOrCasesKey ? cases[withOrCasesKey](...args) : null;
};
function getPlatoform(str) {
  const regexp = /yt|sc|bc|vi|dz|dm|fi/g;
  const [[format]] = [...str.matchAll(regexp)];
  return format;
}
function getFormat(url) {
  return url.substring(1, 3);
}
function Widget({ track }) {
  if (!track) return <p>No tracks, sorry</p>;
  const { eId } = track;
  const urlParams = eId.split('/');
  //const format = urlParams[0];
  const url = urlParams[2];
  const link = `https://www.youtube.com/embed/${url}?autoplay=1`;
  console.log(link);
  return (
    <iframe
      width="600px"
      height="400px"
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
function Player() {
  const [appState, setAppState] = useState({
    loading: false,
    tracks: [],
  });

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(async () => {
    await fetchTracks();
  }, [setAppState]);

  const fetchTracks = async (genre) => {
    setAppState({ loading: true });
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
    };
    const apiUrl = genre
      ? `https://cors-anywhere.herokuapp.com/https://openwhyd.org/hot/${genre}?format=json`
      : `https://cors-anywhere.herokuapp.com/https://openwhyd.org/hot/?format=json`;
    try {
      const {
        data: { tracks },
      } = await axios.get(apiUrl, config);
      setAppState({
        loading: false,
        tracks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const playThis = (e, track) => {
    e.preventDefault();
    setSelectedTrack(track);
  };

  const selectGenre = async (e, genre) => {
    e.preventDefault();
    await fetchTracks(genre);
    setSelectedGenre(genre);
  };

  return (
    <div>
      <h1>Player</h1>
      {genreTags.map((genre, index) => {
        return (
          <BaseButton key={index} onClick={(e) => selectGenre(e, genre)}>
            {genre}
          </BaseButton>
        );
      })}
      <Widget track={selectedTrack}></Widget>

      <List tracks={appState.tracks} playThis={playThis} />
    </div>
  );
}

export default Player;

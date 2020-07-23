import React, { useState, useEffect } from 'react';
import TrackList from './TrackList';
import BaseSelect from './BaseSelect';
import BaseButton from './BaseButton';
import Widget from './Widget';
import Modal from 'react-modal';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import axios from 'axios';

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
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: 2,
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
};
const stickySearchBarStyle = (theme) => css`
  position: fixed;
  position: sticky;
  top: 0px;
  padding: 1rem;
  background: ${theme.colors.white};
  border: solid 0.2rem ${theme.colors.grey};
  display: flex;
  align-items: center;
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
Modal.setAppElement('#root');

function Player() {
  const [appState, setAppState] = useState({
    loading: false,
    tracks: [],
  });

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    fetchTracks();
  }, [setAppState]);

  const fetchTracks = async (genre) => {
    setAppState({ loading: true });

    const apiUrl = genre
      ? `/hot/${encodeURI(genre)}?format=json`
      : `/hot/?format=json`;
    try {
      const {
        data: { tracks },
      } = await axios.get(apiUrl);
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
    openModal();
    setSelectedTrack(track);
  };

  const selectGenre = async (e, genre) => {
    e.preventDefault();
    setSelectedGenre(e.target.value);
    await fetchTracks(e.target.value);
  };

  return (
    <article>
      {appState.loading ? (
        <div role="alert" css={loaderStyle}>
          <h3>Loading {selectedGenre} tracks...</h3>
        </div>
      ) : null}

      <navbar css={stickySearchBarStyle}>
        <label css={labelStyle} htmlFor="searchByGenre">
          Select a genre
        </label>
        <BaseSelect
          css={selectStyle}
          id="searchByGenre"
          placeholder="Select a genre"
          title="Select a Genre"
          onChange={(e) => selectGenre(e)}
          options={genreTags}
        />
      </navbar>
      <header>
        <h2>Top 20 {selectedGenre} tracks</h2>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <Widget track={selectedTrack}></Widget>
        <BaseButton full="true" onClick={() => closeModal()}>
          close player
        </BaseButton>
      </Modal>
      <TrackList tracks={appState.tracks} playThis={playThis} />
    </article>
  );
}

export default Player;

import React, { useState, useEffect } from 'react';
import TrackList from './TrackList';
import SelectGenreNavbar from './SelectGenreNavbar';
import BaseButton from './BaseButton';
import Loader from './Loader';
import Widget from './Widget';
import Modal from 'react-modal';
import axios from 'axios';

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

Modal.setAppElement('#root');

function Player() {
  const [tracksState, setTracksState] = useState({
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
  }, [setTracksState]);

  const fetchTracks = async (genre) => {
    setTracksState({ loading: true });

    const apiUrl = genre
      ? `/hot/${encodeURI(genre)}?format=json`
      : `/hot/?format=json`;
    try {
      const {
        data: { tracks },
      } = await axios.get(apiUrl);
      setTracksState({
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
      <Loader
        isLoading={tracksState.loading}
        message={`Loading ${selectedGenre} tracks...`}
      ></Loader>

      <SelectGenreNavbar selectGenre={selectGenre} />

      <header>
        <h2>Top 20 {selectedGenre} tracks</h2>
      </header>

      <TrackList tracks={tracksState.tracks} playThis={playThis} />

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
    </article>
  );
}

export default Player;

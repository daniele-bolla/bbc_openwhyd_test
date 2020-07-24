import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';
import { render, fireEvent, screen } from '@testing-library/react';
import TrackList from './TrackList';

const playThis = jest.fn(({ _id }) => _id);

const tracks = [
  {
    _id: '5c05b9675b1d901f32b6fe4b',
    uId: '4d94501d1f78ac091dbc9b4d',
    uNm: 'Adrien Joly',
    text: '',
    name: 'Mitski - Your Best American Girl',
    eId:
      '/sc/deadoceans/mitski-your-best-american-girl-3#https://api.soundcloud.com/tracks/249475048',
    img: 'https://i1.sndcdn.com/artworks-000149087394-z2wpob-t500x500.jpg',
    nbP: 6,
    nbR: 1,
    lov: [],
  },
  {
    _id: '5c0561f65b1d901f32b6fdf4',
    uId: '4d94501d1f78ac091dbc9b4d',
    uNm: 'Adrien Joly',
    text: 'merci @[Camille B](user:51483cad7e91c862b2ab6dc2) <3',
    name: 'The Posies, Burn & Shine',
    eId: '/yt/If8ChYjdFdE',
    ctx: 'bk',
    img: 'https://i.ytimg.com/vi/If8ChYjdFdE/default.jpg',
    src: {
      id: 'https://www.youtube.com/watch?v=If8ChYjdFdE',
      name: 'The Posies, Burn &amp; Shine - YouTube',
    },
    nbP: 8,
    lov: [],
  },
];

const wrapper = (tracks, playThis) =>
  render(
    <ThemeProvider theme={theme}>
      <TrackList tracks={tracks} playThis={playThis} />
    </ThemeProvider>
  );

describe('The TrackList component', () => {
  it('renders a list of tracks when tracks is not empty', () => {
    const { queryByText, queryByTestId } = wrapper(tracks, playThis);
    expect(queryByTestId('tracklist')).toBeTruthy();
    expect(queryByText('No tracks, sorry')).toBeFalsy();
  });

  it('renders a message when tracks is empty', () => {
    const { queryByText, queryByTestId } = wrapper([], playThis);
    expect(queryByTestId('tracklist')).toBeFalsy();
    expect(queryByText('No tracks, sorry')).toBeTruthy();
  });

  it('use the parent function on button click', () => {
    const {
      0: { _id },
    } = tracks;
    const { getByTestId } = wrapper(tracks, playThis);
    const button = getByTestId(`trackbutton-${_id}`);
    fireEvent.click(button);
    expect(playThis).toHaveBeenCalled();
    //expect(playThis).toHaveBeenCalledWith(_id);
    // expect(playThis).toHaveReturnedWith(_id);
  });
});

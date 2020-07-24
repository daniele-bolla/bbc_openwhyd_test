import React from 'react';
import { render } from '@testing-library/react';
import Widget from './Widget';

const wrapper = (track) => render(<Widget track={track} />);

const soundCloudTrack = {
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
};

const youtubeTrack = {
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
};

describe('The Widget component', () => {
  it('renders an iframe track prop is passed', () => {
    const { getByTestId } = wrapper(soundCloudTrack);
    expect(getByTestId('iframe')).toBeTruthy();
  });
  it('renders a youtube widget with autoplay, when the eId start with /yt/', () => {
    const { getByTestId } = wrapper(youtubeTrack);
    expect(getByTestId('iframe').src).toMatch(
      /^https:\/\/www.youtube.com\/embed\/\w{11}\?autoplay=1/
    );
  });
  it('renders a soundcloud widget with autoplay, when the eId start with /sc/', () => {
    const { getByTestId } = wrapper(soundCloudTrack);
    expect(getByTestId('iframe').src).toMatch(
      /^https:\/\/w.soundcloud.com\/player\/\?url=https:\/\/api.soundcloud.com\/tracks\/\d{9}&auto_play=true/
    );
  });
});

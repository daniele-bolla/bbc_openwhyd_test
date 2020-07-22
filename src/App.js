import React from 'react';
import Player from './components/Player';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css';
import { ThemeProvider } from 'emotion-theming';

import theme from './theme';
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          ${normalize}
          body {
            background-color: ${theme.colors.bg};
          }
        `}
      />
      <Player />
    </ThemeProvider>
  );
};

export default App;

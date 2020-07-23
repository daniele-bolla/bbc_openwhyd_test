import React from 'react';
import PageContainer from './components/PageContainer';
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
            background-color: ${theme.colors.white};
            color: ${theme.colors.black};
          }
        `}
      />
      <PageContainer>
        <header>
          <h1>Hot Tracks Player</h1>
        </header>
        <Player />
      </PageContainer>
    </ThemeProvider>
  );
};

export default App;

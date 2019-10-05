import React from 'react';
import styled from 'styled-components';
import AudioEngine from './components/AudioEngine'
import Base from './components/Base'



const AppContainer = styled.div`
 display:flex;
align-items:center;
 justify-content:center;
 min-height: 800px;
 height: 100vh;
 min-width:1200px;
`;


function App() {
  return (

    <AppContainer>
      <AudioEngine></AudioEngine>
      <Base></Base>
    </AppContainer>
  );
}



export default App;

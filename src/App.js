import React from 'react';
import styled from 'styled-components';
import AudioEngine from './components/AudioEngine'
import Base from './components/Base'



const AppContainer = styled.div`
 display:flex;
align-items:center;
 justify-content:center;
 height: 100%;
 width:100%;
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

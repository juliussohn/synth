import React from 'react';
import styled from 'styled-components';
import AudioEngine from './components/AudioEngine'
import Base from './components/Base'
import Onboarding from './components/Onboarding/Onboarding'



const AppContainer = styled.div`
 display:flex;
align-items:center;
 justify-content:center;
 height: 100%;
 width:100%;
 align-items: stretch;

`;

const SynthContainer = styled.div`
flex: 1;
overflow:hidden;
padding:50px;
align-items:center;
justify-content:center;

display:flex;

`


function App() {
  return (

    <AppContainer>
      <AudioEngine></AudioEngine>
      <SynthContainer>
        <Base></Base>
      </SynthContainer>

    </AppContainer>
  );
}
  
//       <Onboarding></Onboarding>



export default App;

import React from 'react';
import styled from 'styled-components';
import AudioEngine from './components/AudioEngine'
import Base from './components/Base'
import Onboarding from './components/Onboarding/Onboarding'
import { motion } from "framer-motion"
import { connect } from 'react-redux';


const AppContainer = styled.div`
align-items:center;
 /*justify-content:center;*/
 height: 100vh;
 width:100vw;
 align-items: stretch;
 overflow:hidden;

`;

const SynthContainer = styled(motion.div)`
width:100vw;
overflow:hidden;
padding:50px;
align-items:center;
justify-content:center;
display:flex;

`
const variants = {
  onboarding: { x: `45%` },
  default: { x: `0%` },
}

function App({ finished }) {
  return (

    <AppContainer>
      <AudioEngine></AudioEngine>
      <Onboarding></Onboarding>
      <SynthContainer 
      variants={variants} 
      initial={finished ? `default` : `onboarding`} 
      animate={finished ? `default` : `onboarding`}
      transition={{
        type: "spring", stiffness: 60, damping:22
     }}>
        <Base></Base>
      </SynthContainer>

    </AppContainer>
  );
}




const mapStateToProps = (state) => {

  return {
    ...state.state.onboarding
  }
}


export default connect(mapStateToProps, null)(App);






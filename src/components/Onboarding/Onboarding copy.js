import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip'
import ControlBar from './ControlBar'
import Headline from './Headline'
import { connect } from 'react-redux';



const Container = styled.div`
display:flex;
flex: 0.7;
min-width: 600px;
position:relative;
padding: 110px; 
justify-content:space-between;
flex-direction:column;

`
const Step = styled.div`

`

const Text = styled.p`
font-family: Arimo;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 1.55;
`



function Onboarding({ currentStep }) {
  return (
    <Container>
      <ControlBar></ControlBar>
      {currentStep == 0 &&
        <Step key={1}>
          <Headline isVisible={currentStep == 0}>What's up?</Headline>
          <Text>
            This is “NAME”, an <Tooltip text={`An analog (or analogue) synthesizer is a synthesizer that uses analog circuits and analog signals to generate sound electronically. The earliest analog synthesizers in the 1920s and 1930s, such as the Trautonium, were built with a variety of vacuum-tube (thermionic valve) and electro-mechanical technologies.`}>analog</Tooltip>  inspired, <Tooltip>substractive</Tooltip>, <Tooltip>monophonic</Tooltip> synthesizer, powered by 3 <Tooltip>oscillators</Tooltip> a <Tooltip>filter</Tooltip> and two <Tooltip>envelope generators</Tooltip>, controlling the <Tooltip>amplitude</Tooltip> and the filter. It’s completely written in JavaScript, using the Web Audio API.
        Before you start jamming, have a look at the following steps to get started.
    </Text>
        </Step>
      }
      {currentStep == 1 && <Step key={2}>
        <Headline>Playing a note</Headline>
        <Text isVisible={currentStep == 1}>
          This is “NAME”, an <Tooltip text={`An analog (or analogue) synthesizer is a synthesizer that uses analog circuits and analog signals to generate sound electronically. The earliest analog synthesizers in the 1920s and 1930s, such as the Trautonium, were built with a variety of vacuum-tube (thermionic valve) and electro-mechanical technologies.`}>analog</Tooltip>  inspired, <Tooltip>substractive</Tooltip>, <Tooltip>monophonic</Tooltip> synthesizer, powered by 3 <Tooltip>oscillators</Tooltip> a <Tooltip>filter</Tooltip> and two <Tooltip>envelope generators</Tooltip>, controlling the <Tooltip>amplitude</Tooltip> and the filter. It’s completely written in JavaScript, using the Web Audio API.
      Before you start jamming, have a look at the following steps to get started.
  </Text>
      </Step>
      }

      {currentStep == 2 && <Step key={3}>
        <Headline>Changing the sound</Headline>
        <Text>
          This is “NAME”, an <Tooltip text={`An analog (or analogue) synthesizer is a synthesizer that uses analog circuits and analog signals to generate sound electronically. The earliest analog synthesizers in the 1920s and 1930s, such as the Trautonium, were built with a variety of vacuum-tube (thermionic valve) and electro-mechanical technologies.`}>analog</Tooltip>  inspired, <Tooltip>substractive</Tooltip>, <Tooltip>monophonic</Tooltip> synthesizer, powered by 3 <Tooltip>oscillators</Tooltip> a <Tooltip>filter</Tooltip> and two <Tooltip>envelope generators</Tooltip>, controlling the <Tooltip>amplitude</Tooltip> and the filter. It’s completely written in JavaScript, using the Web Audio API.
      Before you start jamming, have a look at the following steps to get started.
  </Text>
      </Step>
      }

    </Container>

  );
}

const mapStateToProps = (state) => {

  return {
    ...state.state.onboarding
  }
}


export default connect(mapStateToProps, null)(Onboarding);




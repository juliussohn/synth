import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip'
import ControlBar from './ControlBar'
import AnimatedHeadline from './AnimatedHeadline'
import AnimatedParagraph from './AnimatedParagraph'

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
const HeadlineContainer = styled.div`
position:relative;
align-self:flex-start;
margin-bottom:40px;
`
const ParagraphContainer = styled.div`
position:relative;
align-self:flex-start;
margin-bottom:40px;
`


function Onboarding({ currentStep }) {
  return (
    <Container>
      <ControlBar></ControlBar>


      <div>
        {currentStep}
        <HeadlineContainer>
          <AnimatedHeadline key={0} isVisible={currentStep == 0}>Hey there!</AnimatedHeadline>
          <AnimatedHeadline key={1} isVisible={currentStep == 1}>Playing a note</AnimatedHeadline>
          <AnimatedHeadline key={2} isVisible={currentStep == 2}>Changing the sound</AnimatedHeadline>
        </HeadlineContainer>
        <ParagraphContainer>
          <AnimatedParagraph key={`p_0`} isVisible={currentStep === 0}>
            This is “NAME”, an anlaog inspired, substractive, monophonic synthesizer, powered by 3 oscillators a filter and two enveloper generators, controlling the amplitude and the filter. It’s completely written in JavaScript, using the Web Audio API.
        </AnimatedParagraph>
          <AnimatedParagraph key={`p_1`} isVisible={currentStep === 1}>
            As you see, there is no piano roll attached to the synthesizer. That’s a very common thing. These types of synthesizers are called modules and are controlled by external devices like keyboards or sequencers.
        </AnimatedParagraph>

          <AnimatedParagraph key={`p_2`} isVisible={currentStep === 2}>
            Analog synthesizers offer an indefinite amount of different sounds. You can create heavy bass sounds, bright bells, amospheric pads and so much more.
        </AnimatedParagraph>

        </ParagraphContainer>
      </div>
    </Container>

  );
}

const mapStateToProps = (state) => {

  return {
    ...state.state.onboarding
  }
}


export default connect(mapStateToProps, null)(Onboarding);




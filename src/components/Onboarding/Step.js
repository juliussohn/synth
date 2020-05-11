import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion"
import AnimatedText from './AnimatedText'


const HeadlineContainer = styled.div`
position:relative;
align-self:flex-start;
margin-bottom:40px;
`
const ParagraphContainer = styled.div`
position:relative;
align-self:flex-start;
`

const ImageContainer = styled.div`
position:relative;
display:flex;
align-self:flex-start;
margin-top:70px;
`

const Image = styled.div`
display:flex;
flex-direction:column;
text-align:center;
margin-right:90px;
`
const ImageLabel = styled.div`
margin-top:40px;

`

const Text = styled(motion.p)`
font-family: Arimo;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 1.55;
margin:0;
opacity:1;
`
const Headline = styled(motion.h1)`
`

class OnboardingStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: {
        headline: false,
        text: false,
        images: false
      }
    }
  }

  componentDidUpdate(prevProps) {

  }

  finish(element) {
    this.setState({
      finished: { [element]: true }
    })
  }




  render() {
    const { children, headline, images, current } = this.props

    return <React.Fragment >
      {this.state.finished.headline.toString()}
      {this.state.finished.text.toString()}
      <HeadlineContainer>
        <AnimatedText onExitFinished={()=>{this.finish(`headline`)}} barHeight={77} wrapper={Headline} key={0} isVisible={current}>{headline}</AnimatedText>
      </HeadlineContainer>
      <ParagraphContainer>
        <AnimatedText onExitFinished={()=>{this.finish(`text`)}}  wrapper={Text} key={1} isVisible={current}>
          {children}
        </AnimatedText>
      </ParagraphContainer>
    </React.Fragment>
  }

}

/*
 <ImageContainer>
          <Image>
            <img src="/images/keyboard.svg" />
            <ImageLabel>Use your keyboard</ImageLabel>
          </Image>
          <Image>    <img src="/images/midi-keyboard.svg" />
            <ImageLabel>Use a MIDI Keyboard</ImageLabel>
          </Image>

        </ImageContainer>
         */

export default OnboardingStep;

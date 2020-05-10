import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from "framer-motion"


const lineHeight = 24;
const lineSpacing = 7;
const animationOffset = 0.1;

const Container = styled.div`
overflow:hidden;
position:relative;

`;
const Block = styled(motion.div)`
background:white;
position:absolute;
height: ${lineHeight}px;
left:0;
top:0;
right:0;
pointer-events:none;
`

const Text = styled(motion.p)`
font-family: Arimo;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 1.55;
margin:0;
`

const transition = { times: [0, .45, .55, 1], duration: 1, ease: 'easeInOut' }

class AnimatedParagraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.isVisible,
      barCount:0
    }

  }


  componentDidUpdate(prevProps) {
    if (prevProps.isVisible == this.props.isVisible) return

    setTimeout(() => {
      this.setState({ visible: true })

    }, 2000)
  }



  componentDidMount(){

    if(!this.container) return
    this.setBars()

  }

  setBars(){
    const containerHeight = this.container.getBoundingClientRect().height
    const barCount = Math.ceil(containerHeight / (lineHeight+lineSpacing + 0.5 * lineSpacing));
    console.log(barCount);
    this.setState({barCount})
    

  }



  render() {
    const {visible, barCount} = this.state

    if (!visible) return []

    const totalDuration = transition.duration + barCount * animationOffset

    return <Container ref={(el)=>{this.container = el}}>
      {[<AnimatePresence>
        {this.props.isVisible && visible &&
          [...Array(barCount)].map((b,i) => <Block key={i}
            style={{ top: `${i * (lineHeight + lineSpacing) + 0.5 * lineSpacing}px` }}
            initial={{ left: `0%`, right: `100%` }}
            animate={{
              left: [`0%`, `0%`, `0%`, `100%`],
              right: [`100%`, `0%`, `0%`, `0%`],
            }}
            exit={{
              left: [`100%`, `0%`, `0%`, `0%`],
              right: [`0%`, `0%`, `0%`, `100%`]
            }}
            transition={{ delay: animationOffset * i, ...transition }}
          ></Block>)}
        
      </AnimatePresence>,
        , <AnimatePresence>
        {this.props.isVisible && visible && <Text
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          exit={{ opacity: [1, 1, 0, 0] }}
          transition={{ ...transition, duration: totalDuration }}>
          {this.props.children}
          {barCount}

        </Text>
        }
      </AnimatePresence>]}
    </Container>
  }

}

export default AnimatedParagraph;

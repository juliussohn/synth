import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion"


const Container = styled.div`
  overflow:hidden;
  position:relative;
`;

const Bar = styled(motion.div)`
  background:white;
  position:absolute;
  left:0;
  top:0;
  right:0;
  pointer-events:none;
  opacity:1;
`;




class AnimatedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      barCount: 0
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible == this.props.isVisible) return
    this.show()
  }

  show(time = 2000) {
    setTimeout(() => {
      this.setState({ visible: true }, () => {
        this.setBars();
      })
    }, time)
  }

  componentDidMount() {
    if (!this.props.isVisible) return
    this.show(1000)
  }

  setBars() {
    const { barHeight, barSpacing } = this.props
    const containerHeight = this.container.getBoundingClientRect().height
    const barCount = Math.ceil(containerHeight / (barHeight + barSpacing + 0.5 * barSpacing));
    this.setState({ barCount })
  }
  



  render() {
    const { visible, barCount } = this.state
    const { barHeight, barSpacing, animationOffset ,barSpeed} = this.props
    const Wrapper = this.props.wrapper

    const ease = 'easeInOut'
    const rest = animationOffset * barCount;
    const duration = barSpeed * 2 + rest;
    const restRelative = rest / duration;
    const inOutRelative = barSpeed / duration;
    const times = [0, inOutRelative, inOutRelative + restRelative, 1];
    const textDelay = animationOffset * (barCount - 1);


    let elements = [...Array(barCount)].map((b, i) => {

      const top = i * (barHeight + barSpacing) + 0.5 * barSpacing;
      const delay = animationOffset * i

      return <Bar
        style={{ height: `${barHeight}px`, top: `${top}px` }}
        initial={{ left: `0%`, right: `100%` }}
        animate={{
          left: [`0%`, `0%`, `0%`, `100%`],
          right: [`100%`, `0%`, `0%`, `0%`],
        }}
        exit={{
          left: [`100%`, `0%`, `0%`, `0%`],
          right: [`0%`, `0%`, `0%`, `100%`]
        }}
        transition={{ ease, delay, times, duration }}
        onAnimationComplete={(a)=>{console.log(`complete`, i, a);
        }}
      ></Bar>
    })

    elements.push(<Wrapper
      key={'txt'}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1] }}
      exit={{ opacity: [1, 1, 0, 0] }}
      transition={{ ease: 'anticipate', delay: textDelay, duration, times }}>
      {this.props.children}
    </Wrapper>)

    return <Container ref={(el) => { this.container = el }}>
      <AnimatePresence >
        {this.props.isVisible && visible && elements}
      </AnimatePresence>
    </Container>
  }

}

AnimatedText.defaultProps = {
  wrapper: motion.h1,
  barHeight: 24,
  barSpacing: 7,
  animationOffset: 0.06,
  isVisible: false,
  barSpeed: 0.5,
};

export default AnimatedText;

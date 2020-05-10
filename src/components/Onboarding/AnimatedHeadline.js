import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from "framer-motion"

const Container = styled.div`
overflow:hidden;
position:relative;

`;
const Block = styled(motion.div)`
background:white;
position:absolute;
height:70px;
left:0;
top:0;
right:0;
`

const Headline = styled(motion.h1)`
`

const transition = { times: [0, .45, .55, 1], duration: 1, ease: 'easeInOut' }

class AnimatedHeadline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.isVisible
    }

  }


  componentDidUpdate(prevProps) {
    if (prevProps.isVisible == this.props.isVisible) return

    setTimeout(() => {
      this.setState({ visible: true })
    }, 2000)
  }



  render() {
    const blocks = [0, 1, 2, 3, 4]
    if (!this.state.visible) return []

    return <Container>
      {[<AnimatePresence>
        {this.props.isVisible && this.state.visible &&
          blocks.map((b) => <Block key={b}
            style={{ top: `${b * 75 + 5}px` }}
            initial={{ left: `0%`, right: `100%` }}
            animate={{
              left: [`0%`, `0%`, `0%`, `100%`],
              right: [`100%`, `0%`, `0%`, `0%`],
            }}
            exit={{
              left: [`100%`, `0%`, `0%`, `0%`],
              right: [`0%`, `0%`, `0%`, `100%`]
            }}
            transition={{ delay: .1 * b, ...transition }}
          ></Block>)
        }
      </AnimatePresence>,
        , <AnimatePresence>
        {this.props.isVisible && this.state.visible && <Headline
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          exit={{ opacity: [1, 1, 0, 0] }}
          transition={transition}>
          {this.props.children}
        </Headline>
        }
      </AnimatePresence>]}
    </Container>
  }

}

export default AnimatedHeadline;

import React from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { setParam } from '../actions/actions.js';
import { connect } from 'react-redux';
import { motion, transform } from "framer-motion"
import Label from './Label'

const Container = styled.div`
position:relative;
margin-bottom:20px;
`;

const Inner = styled.div`
 padding:15px;
 display:flex;
 align-items:center;
 justify-content:center;
`;


const KnobInner = styled.div`
  height:100%;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:flex-end;
`
const KnobBase = styled.div`
  cursor: pointer;
  height:${props => props.size}px;
  width:${props => props.size}px;
  border-radius:100%;
  background-image: linear-gradient(180deg, #4D4D4D 0%, #1C1C1C 99%);
  box-shadow: 0 5px 6px 0 rgba(0,0,0,0.18), 0 22px 22px 0 rgba(0,0,0,0.39), inset 0 -1px 0 0 rgba(0,0,0,0.50), inset 0 1px 0 0 rgba(255,255,255,0.16);
`;

const Pointer = styled.div`
  background-image: linear-gradient(180deg, #1C1C1C 0%, #4D4D4D 99%);
  height:15px;
  width:15px;
  border-radius:100%;
  margin:10px;
`;

const Value = styled(motion.div)`
  background: #191919;
  box-shadow: 0 12px 33px 0 rgba(0,0,0,0.37);
  border-radius: 20px;
  height: 40px;
  padding:0 15px;
  font-size: 16px;
  color: #B0B0B0;
  letter-spacing: 1px;
  text-align: center;
  line-height:40px;
  position:absolute;
  margin-left:50%;
  width:auto;
  white-space:nowrap
z-index:999;
`;

const ValueVariants = {
  hidden: { opacity: 0, transform: `translate(-50%, 20px)` },
  visible: { opacity: 1, transform: `translate(-50%, 0px)` },
}




class KnobControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: this.getRotation(props.value),
      dragging: false
    }
    this.defaultValue = props.value

  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }

  getRotation(value) {
    const { min, max, minDeg, maxDeg } = this.props;
    return minDeg + ((value - min) / (max - min)) * (maxDeg - minDeg);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rotate: this.getRotation(nextProps.value)
    })
  }

  onMouseDown(event) {
    this.setState({
      dragStartY: event.clientY,
      dragging: true,
      freezeValue: this.props.value
    })
  }

  onMouseUp(event) {
    this.setState({
      dragging: false
    })
  }

  onMouseMove(event) {
    if (!this.state.dragging) return

    const { min, max, param, module, moduleIndex } = this.props;


    const delta = this.state.dragStartY - event.clientY
    const totalDelta = (max - min)
    const increment = event.shiftKey ? 400 : 100

    let newValue = this.state.freezeValue + (delta * (totalDelta / increment));

    if (this.props.snap !== false) {
      newValue = Math.round(this.state.freezeValue + (delta * (totalDelta / increment)));
      console.log(newValue, 'snap')

    }

    if (newValue > max) newValue = max
    else if (newValue < min) { newValue = min }
    console.log(module, moduleIndex, param, newValue)
    this.props.setParam(module, moduleIndex, param, newValue)
  }

  onDoubleClick(e) {
    const { param, module, moduleIndex } = this.props;

    this.props.setParam(module, moduleIndex, param, this.defaultValue)

  }


  render() {
    /* map va;l sto size: transform(this.props.value, [this.props.min, this.props.max],[40,200])*/
    return (
      <Container>
        <Label>{this.props.label}</Label>
        <Inner>
          <KnobBase size={this.props.size} onDoubleClick={this.onDoubleClick.bind(this)} onMouseDown={this.onMouseDown.bind(this)} >
            <KnobInner style={{ transform: `rotate(${this.state.rotate}deg)` }}>
              <Pointer style={{ transform: `rotate(-${this.state.rotate}deg)` }}></Pointer>
            </KnobInner>
          </KnobBase>
        </Inner>
        <Value
          initial="hidden"
          animate={this.state.dragging ? 'visible' : 'hidden'}
          variants={ValueVariants}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            delay: this.state.dragging ? 0 : 1

          }}>
          {Math.round(this.props.value * 100) / 100} {this.props.unit}
        </Value>

      </Container>
    );
  }

}
KnobControl.defaultProps = {
  min: 0,
  max: 100,
  minDeg: 40,
  maxDeg: 320,
  value: 50,
  label: 'Pitch',
  param: 'pitch',
  unit: '',
  moduleIndex: false,
  size: 80,
  snap: false
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setParam }, dispatch)
}
export default connect(null, mapDispatchToProps)(KnobControl);
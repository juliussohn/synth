import React from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { setParam } from '../actions/actions.js';
import { connect } from 'react-redux';
import {  transform } from "framer-motion"
import Label from './Label'

const knobWidth = 40;
const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin-bottom:40px;
`;

const Track = styled.div`
background: #181818;
box-shadow: inset 0 1px 0 0 rgba(0,0,0,0.50), inset 0 -1px 0 0 rgba(255,255,255,0.16);
border-radius: 7px;
width:4px;
height:100%;
margin: 0 5px;
`;


const Scale = styled.div`
display:flex;
align-items:flex-${props => props.align};
flex-direction:column;
height:100%;
justify-content:space-between;
`

const Background = styled.div`
position:absolute;
top:30px;
bottom:-30px;
display:flex;
width:100%;
align-items:center;
justify-content:center;
`


const Tick = styled.div`
  background-color:white;
  height:1px;
  width:${props => props.size === 'big' ? 24 : 18}px;
  opacity:.3;
`
const Inner = styled.div`
 position:relative;
 height:100%;
 display:flex;
 justify-content:center;
  `;


const Outer = styled.div`
width:${knobWidth}px  ;
width:100%;

 position:relative;
 height: ${props => props.size}px;
margin-bottom:60px;
  `;


const Grip = styled.div`
background-image: linear-gradient(180deg, #1C1C1C 0%, #4D4D4D 99%);
width:100%;
height:2px;
opacity:.5;

`

const Knob = styled.div`
position:relative;
padding:5px 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: space-around;
  height:60px;
  width:${knobWidth}px  ;
  background-image: linear-gradient(180deg, #1C1C1C 0%, #4D4D4D 99%);
  box-shadow: 0 5px 3px 0 rgba(0,0,0,0.19), 0 8px 7px 0 rgba(0,0,0,0.50), inset 0 -1px 0 0 rgba(0,0,0,0.50), inset 0 1px 0 0 rgba(255,255,255,0.16);
  border-radius: 5px;
z-index:5;
cursor:pointer;

}
`


const Pointer = styled.div`
  width:100%;
  height:4px;
  background: #BCBCBC;
  margin:5px 0;

`;



class FaderControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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



  getTransform(value = this.props.value) {
    const { min, max, size } = this.props;
    const y = size - transform(value, [min, max], [0, size])

    return y;
  }


  onMouseDown(event) {
    this.setState({
      dragStartY: event.clientY,
      dragging: true,
      freezeValue: this.props.value,
    })
  }

  onMouseUp(event) {
    this.setState({
      dragging: false
    })
  }

  onMouseMove(event) {
    if (!this.state.dragging) return

    const { min, max, param, module, moduleIndex, size } = this.props;

    const delta = (this.state.dragStartY - event.clientY)

    const increase = transform(Math.abs(delta), [0, size], [min, max]);



    let newValue = this.state.freezeValue + (delta < 0 ? -1 * increase : increase) //transform(newY + size, [0, size], [min, max]);


    if (newValue > max) newValue = max
    else if (newValue < min) { newValue = min }
    // console.log(module, moduleIndex, param, newValue)
    this.props.setParam(module, moduleIndex, param, newValue)
  }

  onDoubleClick(e) {
  //  const { param, module, moduleIndex } = this.props;

    //this.props.setParam(module, moduleIndex, param, this.defaultValue)

  }

  renderScale() {
    const scale = 31;

    const ticks = [];
    for (let i = 0; i < scale; i++) {
      ticks.push(<Tick key={i} size={i % 5 === 0 ? 'big' : 'small'}></Tick>)
    }
    return ticks;
  }


  render() {
    /* map va;l sto size: transform(this.props.value, [this.props.min, this.props.max],[40,200])*/
    return (
      <Container>
        <Label>{this.props.label}</Label>
        <Outer size={this.props.size}>
          <Inner>
            <Background>
              <Scale align={'end'}>{this.renderScale()}</Scale>
              <Track  ></Track>
              <Scale align={'start'}>{this.renderScale()}</Scale>
            </Background>
            {this.getTransform.bind(this)}
            <Knob onDoubleClick={this.onDoubleClick.bind(this)} onMouseDown={this.onMouseDown.bind(this)} style={{ transform: `translateY(${this.getTransform()}px)` }}>
              <Grip></Grip>
              <Grip></Grip>
              <Grip></Grip>
              <Pointer></Pointer>
              <Grip></Grip>
              <Grip></Grip>
              <Grip></Grip>
            </Knob>
          </Inner>
        </Outer>
      </Container>
    );
  }

}
FaderControl.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  label: 'Gain',
  param: 'gain',
  unit: '',
  moduleIndex: false,
  size: 260
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setParam }, dispatch)
}
export default connect(null, mapDispatchToProps)(FaderControl);
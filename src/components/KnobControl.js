import React from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { setParam } from '../actions/actions.js';
import { connect } from 'react-redux';

const Container = styled.div`
 border:1px solid black;
`;

const Inner = styled.div`
 padding:20px;
 display:flex;
 align-items:center;
 justify-content:center;
`;

const Label = styled.div`
 background:black;
 color:white;
 padding:4px;
 text-align:center;
 text-transform:uppercase;
 font-size:12px;
`;

const Knob = styled.div`
  height:40px;
  width:40px;
  border-radius:100%;
  background:red;
  display:flex;
  justify-content:center;
  align-items:flex-end;
`;
const Pointer = styled.div`
  height:4px;
  width:4px;
  border-radius:100%;
  background:black;
  margin:4px;
`;


class KnobControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: this.getRotation(props.value),
      dragging: false
    }
    console.log(this.state);
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
    return minDeg + ((value - min) / (max - min)) * (maxDeg-minDeg);
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

    const { min, max, param, module } = this.props;
    const totalDelta = (max - min)
    const delta = this.state.dragStartY - event.clientY
   
    const increment = event.shiftKey ? 400 : 100 
    //console.log(event.shiftKey)
    let newValue = this.state.freezeValue + (delta * (totalDelta / increment));
    //let newValue = this.state.freezeValue + (delta);

    if (newValue > max) newValue = max
    else if (newValue < min) { newValue = min }

    this.props.setParam(module, param, newValue)
  }


  render() {

    return (
      <Container>
        <Label>{this.props.label}</Label>
        <Inner>
          <Knob onMouseDown={this.onMouseDown.bind(this)} style={{ transform: `rotate(${this.state.rotate}deg)` }}>
            <Pointer></Pointer>
          </Knob>
        </Inner>
        {Math.round(this.props.value)}

      </Container>
    );
  }

}
KnobControl.defaultProps = {
  min: 0,
  max: 100,
  minDeg:40,
  maxDeg:320,
  value: 50,
  label: 'Pitch',
  param: 'pitch'
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setParam }, dispatch)
}
export default connect(null, mapDispatchToProps)(KnobControl);
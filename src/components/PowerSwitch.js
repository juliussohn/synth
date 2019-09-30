import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { setPower } from '../actions/actions.js';

import { connect } from 'react-redux';
import Label from './Label'



const Container = styled.div`
    display:flex;
    margin-bottom:20px;
    flex-direction:column;
    align-items:center;
`
const Track = styled.div`
    box-shadow: inset 0 1px 0 0 rgba(0,0,0,0.50), inset 0 -1px 0 0 rgba(255,255,255,0.16);
    border-radius: 15px;
    height:24px;
    width:48px;
    overflow:auto;
    cursor:pointer;
    transition: all .2s;
    margin-top:10px;
    margin-bottom:30px;
`

const Knob = styled.div`
height:20px;
width:20px;
border-radius:100%;
margin:2px;
transition: all .3s;

background-image: linear-gradient(180deg, #4D4D4D 0%, #393939 42%, #1C1C1C 99%);
box-shadow: 0 5px 3px 0 rgba(0,0,0,0.19), 0 8px 7px 0 rgba(0,0,0,0.50), inset 0 -1px 0 0 rgba(0,0,0,0.50), inset 0 1px 0 0 rgba(255,255,255,0.16);
`

class PowerSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    toggle() {

        const { value } = this.props;
        this.props.setPower(!value)

    }
    render() {
        const { value } = this.props
        return (
            <Container >
                <Label style={{textAlign:'left'}}>Power</Label>
                <Track style={{background: value ? '#aaa':'#111'}} onClick={this.toggle.bind(this)} active={value}>
                    <Knob style={{marginLeft: value ? 26:2}}></Knob></Track>
            </Container>
        );
    }   

}


PowerSwitch.defaultProps = {
    value: true,

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setPower }, dispatch)
}
export default connect(null, mapDispatchToProps)(PowerSwitch);
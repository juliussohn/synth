import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { setParam } from '../actions/actions.js';

import { connect } from 'react-redux';
import { directive } from '@babel/types';


const options = [
    'sine',
    'triangle',
    'sawtooth',
    'square'
]

class PowerSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    toggle(){
        const {   module } = this.props;
        this.props.setParam(module, 'active', !this.props.value)

    }
    render() {
        const {value} = this.props
        return (
            <div>
            <input checked={value} onClick={this.toggle.bind(this)} type="checkbox"/> Power
            </div>
        );
    }

}


PowerSwitch.defaultProps = {
    value: true,

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setParam }, dispatch)
}
export default connect(null, mapDispatchToProps)(PowerSwitch);
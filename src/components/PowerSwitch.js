import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { setPower } from '../actions/actions.js';

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
    toggle(e){ 
        
        const {   module } = this.props;
        this.props.setPower(e.target.checked)

    }
    render() {
        const {value} = this.props
        return (
            <div>
            <label for="power"><input id="power" name="power" checked={value} onChange={this.toggle.bind(this)} type="checkbox"/> Power</label>
            </div>
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
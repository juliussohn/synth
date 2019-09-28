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

class WaveformSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    select(type) {
        const { module, moduleIndex } = this.props;
        this.props.setParam(module, moduleIndex, 'type', type)
    }
    
    render() {
        const { value } = this.props
        return (
            <div>
                <ul>
                    {options.map(o => {
                        return <li style={{ color: value == o ? 'red' : 'white' }} onClick={() => { this.select(o) }}>{o}</li>
                    })}
                </ul>
            </div>
        );
    }

}


WaveformSelector.defaultProps = {
    value: 'sine',

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setParam }, dispatch)
}
export default connect(null, mapDispatchToProps)(WaveformSelector);
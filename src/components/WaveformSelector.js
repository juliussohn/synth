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



const Select = styled.div`
padding:10px;
 background-color: ${props => props.active ? '#ccc' : '#222'};
 color: ${props => props.active ? '#222' : 'white'};
 text-align:center;
 margin-bottom:8px;
 border-radius:4px;
 text-transform:uppercase;
 cursor:pointer;
 font-size:12px;
 font-weight:bold;
`;

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
                {options.map(o => {
                    return <Select active={o == value} onClick={() => { this.select(o) }}>{o}</Select>
                })}
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
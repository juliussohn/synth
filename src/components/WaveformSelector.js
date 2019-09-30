import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { setParam } from '../actions/actions.js';

import { connect } from 'react-redux';




const Select = styled.div`
padding:5px 10px ;
 background-color: ${props => props.active ? '#ccc' : '#222'};
 color: ${props => props.active ? '#222' : 'white'};
 text-align:center;
 margin-bottom:8px;
 border-radius:4px;
 text-transform:uppercase;
 cursor:pointer;
 font-size:12px;
 font-weight:bold;
  * {
 stroke:${props => props.active ? '#222' : 'white'};
 }
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
                <br/>
                <Select active={value === 'sine'} onClick={() => { this.select('sine') }}>

                    <svg width="34px" height="18px" viewBox="0 0 34 18" version="1.1"  >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                            <g id="Group-3" transform="translate(1.000000, 1.000000)" strokeWidth="2">
                                <path d="M16,8 C16,3.581722 12.4181687,0 7.99992957,0 C3.58169047,0 0,3.581722 0,8" id="Path"></path>
                                <path d="M32,8 C32,12.418278 28.4181687,16 23.9999296,16 C19.5816905,16 16,12.418278 16,8" id="Path"></path>
                            </g>
                        </g>
                    </svg>
                </Select>

                <Select active={value === 'triangle'} onClick={() => { this.select('triangle') }}>
                    <svg width="34px" height="18px" viewBox="0 0 34 18" version="1.1"  >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <polyline id="Path-4" strokeWidth="2" points="1 17 17 1 33 17"></polyline>
                        </g>
                    </svg>
                </Select>

                <Select active={value === 'sawtooth'} onClick={() => { this.select('sawtooth') }}>

                    <svg width="38px" height="20px" viewBox="0 0 38 20" version="1.1" >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <polyline id="Path-7" strokeWidth="2" points="1 19 37 1 37 19"></polyline>
                        </g>
                    </svg>
                </Select>
                <Select active={value === 'square'} onClick={() => { this.select('square') }}>

                    <svg width="38px" height="20px" viewBox="0 0 38 20" version="1.1"  >
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <polyline id="Path-5-Copy" strokeWidth="2" points="1 19 1 1 19 1 19 19 37 19"></polyline>
                        </g>
                    </svg>
                </Select>




            </div >
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
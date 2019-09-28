import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import PowerSwitch from '../components/PowerSwitch'
import KnobControl from '../components/KnobControl'
import FaderControl from '../components/FaderControl'
import WaveformSelector from '../components/WaveformSelector'

const Row = styled.div`
 display:flex;
 text-align:center;
`;


const Module = styled.div`
 text-align:center;
 padding-right:30px;
 padding-left:30px;
 border-right:1px solid grey;
`;



class Controls extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        const { props } = this
        console.log(props);

        return (
            <div className="Controls">
                <PowerSwitch module={'power'} value={props.power.active} />
                <Row>
                <Module>
                    <h2>AMP</h2>
                        <KnobControl label={"Gain"} unit={""} module={'amp'} param={'gain'} min={0} max={1} value={props.amp.gain}></KnobControl>
                        <h2>FILTER</h2>
                        <KnobControl label={"Cutoff"} unit={"Hz"} module={'filter'} size={120} param={'frequency'} min={0} max={5000} value={props.filter.frequency}></KnobControl>
                        <KnobControl label={"Resonance"} module={'filter'} param={'resonance'} min={0} max={100} value={props.filter.resonance}></KnobControl>
                     
                    </Module>
                    {props.vco.map((vco, i) => {
                        return( <Module key={`vco_${i}`}>
                            <h2 key={`vco_title_${i}`}>VCO {i + 1}</h2>
                            <KnobControl key={`vco_pitch_${i}`} label={"Pitch"} unit={"Hz"} module={'vco'} moduleIndex={i} param={'pitch'} min={20} max={1000} value={props.vco[i].pitch}></KnobControl>
                            {/*<KnobControl key={`vco_gain_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} value={props.vco[i].gain}></KnobControl>*/}
                            <FaderControl key={`vco_gain2_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} value={props.vco[i].gain}></FaderControl>

                            <WaveformSelector key={`vco_shape_${i}`} label={"Type"} module={'vco'} moduleIndex={i} param={'type'} value={props.vco[i].type}></WaveformSelector>
                        </Module>
                        )
                    })}

                 
                  
                </Row>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        ...state.state
    }
}
/*
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setPitch }, dispatch)
}
*/

export default connect(mapStateToProps, null)(Controls);

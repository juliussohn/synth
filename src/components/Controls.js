import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import PowerSwitch from '../components/PowerSwitch'
import KnobControl from '../components/KnobControl'
import FaderControl from '../components/FaderControl'
import WaveformSelector from '../components/WaveformSelector'
import Sequencer from '../components/Sequencer'

const Row = styled.div`
 display:flex;
 text-align:center;
`;


const Module = styled.div`
 text-align:center;
 padding-right:30px;
 padding-left:30px;
 border-right:1px solid grey;
 &:first-child{
    padding-left:0;
 }
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
                <Row>
                    <Module>

                        <h2>AMP</h2>
                        <KnobControl label={"Master Gain"} unit={""} module={'amp'} param={'gain'} min={0} max={1} value={props.amp.gain}></KnobControl>
                        <hr />
                        <br />
                        <h2>FILTER</h2>
                        <KnobControl label={"Cutoff"} unit={"Hz"} module={'filter'} size={120} param={'frequency'} min={0} max={5000} value={props.filter.frequency}></KnobControl>

                        <KnobControl label={"Resonance"} module={'filter'} param={'resonance'} min={0} max={100} value={props.filter.resonance}></KnobControl>
                        <hr />
                        <br />
                        <br />

                        <PowerSwitch module={'power'} value={props.power.active} />

                    </Module>
                    <Module>

                        <h2>ENV</h2>
                        <KnobControl label={"Attack"} unit={"s"} module={'envelope'} param={'attack'} min={0} max={2} value={props.envelope.attack}></KnobControl>
                        <KnobControl label={"Release"} unit={"s"} module={'envelope'} param={'release'} min={0} max={2} value={props.envelope.release}></KnobControl>
                        <hr />
                        <br />
                        <h2>Sequencer</h2>
                        <KnobControl label={"Tempo"} unit={"BPM"} module={'sequencer'} param={'tempo'} min={40} max={180} value={props.sequencer.tempo}></KnobControl>
                        <KnobControl label={"Gate"} unit={"%"} module={'sequencer'} param={'gate'} min={0} max={100} value={props.sequencer.gate}></KnobControl>

                    </Module>
                    {props.vco.map((vco, i) => {
                        return (<Module key={`vco_${i}`}>
                            <h2 key={`vco_title_${i}`}>VCO {i + 1}</h2>
                            <KnobControl key={`vco_pitch_${i}`} label={"Pitch"} unit={"Hz"} module={'vco'} moduleIndex={i} param={'pitch'} min={20} max={1000} value={props.vco[i].pitch}></KnobControl>
                            {/*<KnobControl key={`vco_gain_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} value={props.vco[i].gain}></KnobControl>*/}
                            <FaderControl key={`vco_gain2_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} value={props.vco[i].gain}></FaderControl>

                            <WaveformSelector key={`vco_shape_${i}`} label={"Type"} module={'vco'} moduleIndex={i} param={'type'} value={props.vco[i].type}></WaveformSelector>
                        </Module>
                        )
                    })}


<Module>
<Sequencer></Sequencer>
</Module>
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

import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import PowerSwitch from '../components/PowerSwitch'
import KnobControl from '../components/KnobControl'
import FaderControl from '../components/FaderControl'
import WaveformSelector from '../components/WaveformSelector'
import PresetManager from '../components/PresetManager'

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

    render() {

        const { props } = this

        return (
            <div className="Controls">
                <Row>
                    <Module>
                        <h2>SYNTH</h2>

                        <PowerSwitch module={'power'} value={props.power.active} />
                        <hr />
                        <br />
                        <br />
                        <KnobControl label={"Master Gain"} unit={""} module={'amp'} param={'gain'} min={0} max={1} default={1} value={props.amp.gain}></KnobControl>

                        <br />
                        <hr />
                        <br />
                        <KnobControl snap={1} label={"Octave"} unit={""} module={'general'} param={'octave'} min={-3} max={3} default={0} value={props.general.octave}></KnobControl>
                        <KnobControl label={"glide"} unit={"s"} module={'general'} param={'glide'} min={0} max={3} default={0} value={props.general.glide}></KnobControl>

                        <hr />
                        <br />
                        <br />


                    </Module>

                    {props.vco.map((vco, i) => {
                        return (<Module key={`vco_${i}`}>

                            <h2 key={`vco_title_${i}`}>VCO {i + 1}</h2>
                            <KnobControl key={`vco_semitones_${i}`} snap={1} label={"semitones"} module={'vco'} moduleIndex={i} param={'semitones'} min={-24} max={24} default={0} value={props.vco[i].semitones}></KnobControl>
                            <KnobControl key={`vco_detune_${i}`} label={"detune"} unit={"ct"} module={'vco'} moduleIndex={i} param={'detune'} min={-50} max={50} default={0} value={props.vco[i].detune}></KnobControl>

                            {/*<KnobControl key={`vco_gain_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} value={props.vco[i].gain}></KnobControl>*/}
                            <FaderControl key={`vco_gain2_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} default={1} value={props.vco[i].gain}></FaderControl>

                            <WaveformSelector key={`vco_shape_${i}`} label={"Type"} module={'vco'} moduleIndex={i} param={'type'} value={props.vco[i].type}></WaveformSelector>
                        </Module>
                        )
                    })}
                    <Module>
                        <h2>FILTER</h2>
                        <KnobControl label={"Cutoff"} log={true} unit={"Hz"} module={'filter'} size={120} param={'frequency'} min={100} max={20000} default={300} value={props.filter.frequency}></KnobControl>
                        <KnobControl label={"Resonance"} module={'filter'} param={'resonance'} min={0} max={100} default={0} value={props.filter.resonance}></KnobControl>

                    </Module>

                    <Module>

                        <h2>AMP ENVELOPE</h2>
                        <KnobControl label={"Attack"} unit={"s"} module={'envelope'} param={'attack'} min={0} max={2} value={props.envelope.attack}></KnobControl>
                        <KnobControl label={"Decay"} unit={"s"} module={'envelope'} param={'decay'} min={0} max={2} value={props.envelope.decay}></KnobControl>
                        <KnobControl label={"Sustain"} unit={"%"} module={'envelope'} param={'sustain'} min={0} max={100} value={props.envelope.sustain}></KnobControl>
                        <KnobControl label={"Release"} unit={"s"} module={'envelope'} param={'release'} min={0} max={2} value={props.envelope.release}></KnobControl>

                    </Module>   
                    <Module>

                        <h2>FILTER ENVELOPE</h2>
                        <KnobControl label={"Attack"} unit={"s"} module={'filterEnvelope'} param={'attack'} min={0} max={2} value={props.filterEnvelope.attack}></KnobControl>
                        <KnobControl label={"Decay"} unit={"s"} module={'filterEnvelope'} param={'decay'} min={0} max={2} value={props.filterEnvelope.decay}></KnobControl>
                        <KnobControl label={"Sustain"} unit={"%"} module={'filterEnvelope'} param={'sustain'} min={0} max={100} value={props.filterEnvelope.sustain}></KnobControl>
                        <KnobControl label={"Release"} unit={"s"} module={'filterEnvelope'} param={'release'} min={0} max={2} value={props.filterEnvelope.release}></KnobControl>
                        <KnobControl label={"Intensity"} unit={"%"} module={'filterEnvelope'} param={'intensity'} min={0} max={100} default={0} value={props.filterEnvelope.intensity}></KnobControl>

                    </Module>
                    <Module>
                        <h2>PRESETS</h2>

                        <PresetManager></PresetManager>
                    </Module>
                    {/*
                    <Module>
                        <h2>Sequencer</h2>
                        <KnobControl label={"Tempo"} unit={"BPM"} module={'sequencer'} param={'tempo'} min={40} max={180} value={props.sequencer.tempo}></KnobControl>
                        <KnobControl label={"Gate"} unit={"%"} module={'sequencer'} param={'gate'} min={0} max={100} value={props.sequencer.gate}></KnobControl>

                        <Sequencer></Sequencer>
                    </Module>
                     */}
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

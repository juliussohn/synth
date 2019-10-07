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
 justify-content:space-between;
 align-items:flex-end;
`;

const Container = styled.div`
display:flex;
align-items:space-between;
justify-content:stretch;

`

const Column = styled.div`
 display:flex;
 flex-direction:column;
 text-align:center;
 align-items:stretch;
`;


const ModuleLabel = styled.h2`
    background:white;
    margin:4px;
    color:#313131;
    font-size:16px;
    letter-spacing:2.5px;
    text-transform:uppercase;
    padding:5px;
    font-weight:bold;
    border-radius:3px;
`;


const ModuleContent = styled.div`
    padding:20px;
    flex:1;
    display:flex;
    flex-direction:column;
`
const Module = styled.div`
 text-align:center;
 border:.5px solid;
 margin:8px;
 border-radius:6px;
 flex:${props => typeof props.flex !== 'undefined' ? props.flex : 1};
 display:flex;
 flex-direction:column;

`;



class Controls extends React.Component {

    render() {

        const { props } = this

        return (
            <Container className="Controls">
                <Column>
                    <Module>
                        <ModuleLabel>Master</ModuleLabel>
                        <ModuleContent>
                            <KnobControl label={"Gain"} unit={""} module={'amp'} param={'gain'} min={0} max={1} default={1} value={props.amp.gain}></KnobControl>
                            <KnobControl snap={1} label={"Octave"} unit={""} module={'general'} param={'octave'} min={-3} max={3} default={0} value={props.general.octave}></KnobControl>
                            <KnobControl label={"Glide"} unit={"s"} module={'general'} param={'glide'} min={0} max={3} default={0} value={props.general.glide}></KnobControl>
                        </ModuleContent>
                    </Module>
                    <Module flex={.5} >
                        <ModuleLabel>POWER</ModuleLabel>
                        <ModuleContent>
                            <PowerSwitch module={'power'} value={props.power.active} />
                        </ModuleContent>
                    </Module>
                </Column>


                {props.vco.map((vco, i) => {
                    return (
                        <Column>
                            <Module key={`vco_${i}`}>
                                <ModuleLabel key={`vco_title_${i}`}>VCO {i + 1}</ModuleLabel>
                                <ModuleContent>
                                    <KnobControl key={`vco_semitones_${i}`} snap={1} label={"semitones"} module={'vco'} moduleIndex={i} param={'semitones'} min={-24} max={24} default={0} value={props.vco[i].semitones}></KnobControl>
                                    <KnobControl key={`vco_detune_${i}`} label={"detune"} unit={"ct"} module={'vco'} moduleIndex={i} param={'detune'} min={-50} max={50} default={0} value={props.vco[i].detune}></KnobControl>
                                    <FaderControl key={`vco_gain2_${i}`} label={"Gain"} module={'vco'} moduleIndex={i} param={'gain'} min={0} max={1} default={1} value={props.vco[i].gain}></FaderControl>
                                    <WaveformSelector key={`vco_shape_${i}`} label={"Type"} module={'vco'} moduleIndex={i} param={'type'} value={props.vco[i].type}></WaveformSelector>
                                </ModuleContent>
                            </Module>
                        </Column>
                    )
                })}

                <Column>
                    <Module flex={1}>
                        <ModuleLabel>AMP</ModuleLabel>
                        <ModuleContent>
                            <Row>
                                <KnobControl label={"Attack"}  unit={"s"} module={'envelope'} param={'attack'}  log={true} min={0.001} max={10} value={props.envelope.attack}></KnobControl>
                                <KnobControl label={"Decay"} unit={"s"} module={'envelope'} param={'decay'} log={true} min={0.001} max={10} value={props.envelope.decay}></KnobControl>
                                <KnobControl label={"Sustain"} unit={"%"} module={'envelope'} param={'sustain'} min={0} max={100} value={props.envelope.sustain}></KnobControl>
                                <KnobControl label={"Release"} unit={"s"} module={'envelope'} param={'release'} log={true} min={0.001} max={10}value={props.envelope.release}></KnobControl>
                            </Row>
                        </ModuleContent>
                    </Module>

                    <Module flex={2}>
                        <ModuleLabel>FILTER</ModuleLabel>
                        <ModuleContent>
                            <Row style={{marginBottom:20}}>
                                <KnobControl label={"Cutoff"} log={true} unit={"Hz"} module={'filter'} size={120} param={'frequency'} min={100} max={20000} default={300} value={props.filter.frequency}></KnobControl>
                                <KnobControl label={"Resonance"} module={'filter'} param={'resonance'} min={0} max={100} default={0} value={props.filter.resonance}></KnobControl>
                                <KnobControl label={"ENV AMOUNT"} unit={"%"} module={'filterEnvelope'} param={'intensity'} min={0} max={100} default={0} value={props.filterEnvelope.intensity}></KnobControl>

                            </Row>
                            <Row>
                                <KnobControl label={"Attack"} unit={"s"} module={'filterEnvelope'} param={'attack'} log={true} min={0.001} max={10} value={props.filterEnvelope.attack}></KnobControl>
                                <KnobControl label={"Decay"} unit={"s"} module={'filterEnvelope'} param={'decay'} log={true} min={0.001} max={10} value={props.filterEnvelope.decay}></KnobControl>
                                <KnobControl label={"Sustain"} unit={"%"} module={'filterEnvelope'} param={'sustain'} min={0} max={100} value={props.filterEnvelope.sustain}></KnobControl>
                                <KnobControl label={"Release"} unit={"s"} module={'filterEnvelope'} param={'release'} log={true} min={0.001} max={10}  value={props.filterEnvelope.release}></KnobControl>
                            </Row>
                        </ModuleContent>
                    </Module>

                    <Module style={{ flex: 'none' }}>
                        <PresetManager></PresetManager>
                    </Module>
                </Column>





                {/*
                    <Module>
                        <ModuleLabel>Sequencer</ModuleLabel>
                        <KnobControl label={"Tempo"} unit={"BPM"} module={'sequencer'} param={'tempo'} min={40} max={180} value={props.sequencer.tempo}></KnobControl>
                        <KnobControl label={"Gate"} unit={"%"} module={'sequencer'} param={'gate'} min={0} max={100} value={props.sequencer.gate}></KnobControl>

                        <Sequencer></Sequencer>
                    </Module>
                     */}
            </Container>
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
return bindActionCreators({setPitch}, dispatch)
}
*/

export default connect(mapStateToProps, null)(Controls);

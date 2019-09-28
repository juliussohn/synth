import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import PowerSwitch from '../components/PowerSwitch'
import KnobControl from '../components/KnobControl'
import WaveformSelector from '../components/WaveformSelector'

const Row = styled.div`
 display:flex;
 text-align:center;
`;



class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillReceiveProps(p){
        console.log(p)
    }
    render() {
        return (
            <div className="Controls">
                <PowerSwitch module={'power'} value={this.props.power.active}/>
                <Row>
                    <div>
                        <h2>VCO 1</h2>
                        <KnobControl label={"Pitch"} unit={"Hz"} module={'vco'} moduleIndex={0} param={'pitch'} min={20} max={1000} value={this.props.vco[0].pitch}></KnobControl>
                        <WaveformSelector label={"Type"}  module={'vco'} moduleIndex={0} param={'type'}value={this.props.vco[0].type}></WaveformSelector>

                    </div>
                    <div>
                        <h2>VCO 2</h2>
                        <KnobControl label={"Pitch"} unit={"Hz"} module={'vco'} moduleIndex={1} param={'pitch'} min={20} max={1000} value={this.props.vco[1].pitch}></KnobControl>
                        <WaveformSelector label={"Type"}  module={'vco'} moduleIndex={1} param={'type'}value={this.props.vco[1].type}></WaveformSelector>

                    </div>
                    <div>
                        <h2>FILTER</h2>
                        <KnobControl label={"Cutoff"} unit={"Hz"} module={'filter'} param={'frequency'} min={0} max={5000} value={this.props.filter.frequency}></KnobControl>
                        <KnobControl label={"Resonance"} module={'filter'} param={'resonance'} min={0} max={100} value={this.props.filter.resonance}></KnobControl>

                    </div>
                </Row>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    console.log(state)

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

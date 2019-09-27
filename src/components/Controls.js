import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import KnobControl from '../components/KnobControl'

const Row = styled.div`
 display:flex;
`;



class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Controls">
                <Row>
                <KnobControl label={"Osc 1 Pitch"} module={'vco1'} param={'pitch'} min={20} max={1000} value={this.props.vco1.pitch}></KnobControl>
                <KnobControl label={"Filter Freq"} module={'filter'} param={'frequency'} min={0} max={5000} value={this.props.filter.frequency}></KnobControl>
                <KnobControl label={"Filter Reso"} module={'filter'} param={'resonance'} min={0} max={100} value={this.props.filter.resonance}></KnobControl>
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

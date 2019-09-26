import React from 'react';

import { connect } from 'react-redux';



import KnobControl from '../components/KnobControl'

class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Controls">
                {this.props.pitch}
                <KnobControl label={"Pitch"} param={'pitch'} min={100} max={1000} value={this.props.pitch}></KnobControl>
                <KnobControl label={"Filter"}  param={'filter'} min={0} max={5000} value={this.props.filter}></KnobControl>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    console.log(state)

    return {
        ...state.state.parameters
    }
}
/*
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setPitch }, dispatch)
}
*/

export default connect(mapStateToProps, null)(Controls);

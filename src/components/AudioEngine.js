import React from 'react';
import { connect } from 'react-redux';


class AudioEngine extends React.Component {
    constructor(props) {
       super(props)
       this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

       // create Oscillator node
       this.oscillator = this.audioCtx.createOscillator();
       this.oscillator.type = 'square';
       this.oscillator.frequency.setValueAtTime(props.pitch, this.audioCtx.currentTime); // value in hertz

       this.biquadFilter = this.audioCtx.createBiquadFilter();
       this.biquadFilter.type = "lowpass";
       this.biquadFilter.frequency.setValueAtTime(props.filter, this.audioCtx.currentTime);
       this.biquadFilter.gain.setValueAtTime(25, this.audioCtx.currentTime);


       this.oscillator.connect( this.biquadFilter);
       this.biquadFilter.connect(this.audioCtx.destination);


       this.oscillator.start(0);

    }

    componentWillReceiveProps(nextProps){
        this.oscillator.frequency.setValueAtTime(nextProps.pitch, this.audioCtx.currentTime); // value in hertz
        this.biquadFilter.frequency.setValueAtTime(nextProps.filter, this.audioCtx.currentTime); // value in hertz

    }

    componentDidMount(){
       
        
    }

    render() {
        return <div>sound</div>;
    }

}

const mapStateToProps = (state) => {
    return {
        ...state.state.parameters
    }
}



export default connect(mapStateToProps, null)(AudioEngine);

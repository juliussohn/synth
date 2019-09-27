import React from 'react';
import { connect } from 'react-redux';


class AudioEngine extends React.Component {
    constructor(props) {
       super(props)
       this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

       // create Oscillator node
       this.vco1 = this.audioCtx.createOscillator();
       this.vco1.type = 'square';
       this.vco1.frequency.setValueAtTime(props.vco1.pitch, this.audioCtx.currentTime); // value in hertz

       this.biquadFilter = this.audioCtx.createBiquadFilter();
       this.biquadFilter.type = "lowpass";
       this.biquadFilter.frequency.value = props.filter.frequency
       this.biquadFilter.gain.value = 0;
       this.biquadFilter.Q.value = props.filter.resonance;


       this.vco1.connect( this.biquadFilter);
       this.biquadFilter.connect(this.audioCtx.destination);


       this.vco1.start(0);

    }

    componentWillReceiveProps(nextProps){
        const ctx = this.audioCtx;
        this.vco1.frequency.setValueAtTime(nextProps.vco1.pitch, ctx.currentTime); // value in hertz
        this.biquadFilter.frequency.setValueAtTime(nextProps.filter.frequency, ctx.currentTime); // value in hertz
        this.biquadFilter.Q.setValueAtTime(nextProps.filter.resonance, ctx.currentTime); // value in hertz

    }

    componentDidMount(){
       
        
    }

    render() {
        return <div></div>;
    }

}

const mapStateToProps = (state) => {
    return {
        ...state.state
    }
}



export default connect(mapStateToProps, null)(AudioEngine);

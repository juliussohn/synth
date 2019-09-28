import React from 'react';
import { connect } from 'react-redux';


class AudioEngine extends React.Component {
    constructor(props) {
        super(props)
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.vco = [null, null]


        this.biquadFilter = this.audioCtx.createBiquadFilter();
        this.biquadFilter.type = "lowpass";
        this.biquadFilter.frequency.value = props.filter.frequency
        this.biquadFilter.gain.value = 0;
        this.biquadFilter.Q.value = props.filter.resonance;

        this.compressor = this.audioCtx.createDynamicsCompressor();


        //this.vco1.connect(this.biquadFilter);
        //this.vco2.connect(this.biquadFilter);


        this.biquadFilter.connect(this.audioCtx.destination);


        this.start();
        //this.biquadFilter.connect(this.compressor);
        //this.compressor.connect(this.audioCtx.destination);


        // this.start();

    }

    startVCO(index) {
        this.vco[index] = this.audioCtx.createOscillator();
        this.vco[index].type = this.props.vco[index].type;
        this.vco[index].frequency.setValueAtTime(this.props.vco[index].pitch, this.audioCtx.currentTime); // value in hertz

        this.vco[index].connect(this.biquadFilter)
        this.vco[index].start();
    }

    stopVCO(index) {
        this.vco[index].stop(this.audioCtx.currentTime);
        this.vco[index] = null;
    }


    start() {
        const _this = this
        this.vco.forEach((vco, i) => {
            _this.startVCO(i);
        })

    }


    stop() {
        const _this = this
        this.vco.forEach((vco, i) => {
            _this.stopVCO(i);
        })
    }


    componentWillReceiveProps(nextProps) {
        const ctx = this.audioCtx;
        this.vco.forEach((vco, i) => {
            vco.type = nextProps.vco[i].type
            vco.frequency.setValueAtTime(nextProps.vco[i].pitch, ctx.currentTime)
        })


        if (nextProps.power.active && !this.props.power.active) {
            this.start()
        } else if (!nextProps.power.active && this.props.power.active) {
            this.stop()
        }

        this.biquadFilter.frequency.setValueAtTime(nextProps.filter.frequency, ctx.currentTime); // value in hertz
        this.biquadFilter.Q.setValueAtTime(nextProps.filter.resonance, ctx.currentTime); // value in hertz

    }

    componentDidMount() {


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

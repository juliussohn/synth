import React from 'react';
import { connect } from 'react-redux';
import { tick } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { transform } from "framer-motion"


class AudioEngine extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playing: false
        }
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.vco = []
        this.vcoGain = []

        this.gain = this.audioCtx.createGain();
        this.envelope = this.audioCtx.createGain();
        this.envelope.gain.value = 0;

        this.biquadFilter = this.audioCtx.createBiquadFilter();
        this.biquadFilter.type = "lowpass";
        this.biquadFilter.frequency.value = props.filter.frequency
        this.biquadFilter.gain.value = 0;
        this.biquadFilter.Q.value = props.filter.resonance;
        this.compressor = this.audioCtx.createDynamicsCompressor();

        this.biquadFilter.connect(this.envelope);
        this.envelope.connect(this.gain);
        this.gain.connect(this.audioCtx.destination);

        this.pitch = {
            note: 0,
            octave: 0
        }
        this.baseFrequency = 262
        this.keys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';']
        this.frequencies = []
    }

    /*
    getFrequencies() {
        const a = Math.pow(2, 1 / 12)
        for (let i = 0; i < 12; i++) {
            const frequency = this.baseFrequency * Math.pow(a, i);
            this.frequencies.push(frequency)
        }
    }
    */

    keyToPitch(key) {
        const keyIndex = this.keys.indexOf(key);
        if (keyIndex === -1) return false
        const octave = Math.floor(keyIndex / 12);
        return {
            note: keyIndex - (12 * octave),
            octave: octave
        }
    }

    noteToFrequency(note, octave = 0) {
        const a = Math.pow(2, 1 / 12)
        const frequency = this.baseFrequency * Math.pow(a, (note)) * Math.pow(2, octave);


        return frequency
    }



    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(e) {
        this.pitch = this.keyToPitch(e.key)
        if (this.pitch !== false && e.key != this.state.keyPressed) {

            this.setState({ keyPressed: e.key })

            const frequency = this.getFrequency()
            this.startSound(frequency);
        }
    }

    getFrequency() {
        const a = Math.pow(2, 1 / 12)
        const octave = this.pitch.octave + this.props.general.octave
        const frequency = this.baseFrequency * Math.pow(a, (this.pitch.note)) * Math.pow(2, octave);
        return frequency
    }

    onKeyUp(e) {
        if(e.key == this.state.keyPressed){
            this.setState({ keyPressed: false })
            this.releaseSound();


        }

    }





    startVCO(index) {
        const ctx = this.audioCtx
        this.vco[index] = ctx.createOscillator();
        this.vco[index].type = this.props.vco[index].type;
        // this.vco[index].frequency.setValueAtTime(this.props.vco[index].pitch, ctx.currentTime); // value in hertz

        this.vcoGain[index] = ctx.createGain();
        //  this.vcoGain[index].gain.setValueAtTime(this.props.vco[index].gain, ctx.currentTime);

        this.vco[index].connect(this.vcoGain[index])
        this.vcoGain[index].connect(this.biquadFilter);

        this.vco[index].start();
    }

    stopVCO(index, time = 0) {
        const ctx = this.audioCtx
        this.vco[index].stop(ctx.currentTime + time + this.props.envelope.release);
    }


    startSequencer() {
        const _this = this;
        this.start();
        _this.playSweep()

        var createTimeout = (callback) => {
            _this.sequencerInterval = setTimeout(function () {
                _this.playSweep()
                _this.props.tick()
                callback(callback)
            }, (60 / _this.props.sequencer.tempo) * 1000)



        }
        createTimeout(createTimeout);


    }

    stopSequencer() {
        clearInterval(this.sequencerInterval)
    }




    start() {
        const _this = this
        this.props.vco.forEach((vco, i) => {
            _this.startVCO(i);
        })

    }


    stop(length) {
        const _this = this
        this.props.vco.forEach((vco, i) => {
            _this.stopVCO(i, length);
        })
    }


    getTimeConstant(time) {
        return Math.log(time + 1) / Math.log(100)
    }


    startSound(frequency) {


        const ctx = this.audioCtx;
        this.vco.forEach((vco, i) => {
            vco.frequency.setValueAtTime(frequency + this.props.vco[i].pitch, ctx.currentTime)

        })


        const { envelope, sequencer } = this.props

        const startTime = ctx.currentTime

        this.envelope.gain.cancelScheduledValues(0);
        this.envelope.gain.setValueAtTime(0, startTime)
        this.envelope.gain.linearRampToValueAtTime(1, startTime + envelope.attack);
        this.envelope.gain.setValueAtTime(1, startTime + envelope.attack);

        this.envelope.gain.setTargetAtTime(envelope.sustain / 100, startTime + envelope.attack, this.getTimeConstant(envelope.decay))
    }

    releaseSound() {
        const { envelope, sequencer } = this.props
        const ctx = this.audioCtx
        const startTime = ctx.currentTime
        this.envelope.gain.cancelScheduledValues(startTime);
        this.envelope.gain.setTargetAtTime(0, startTime, this.getTimeConstant(envelope.release))

    }


    componentWillReceiveProps(nextProps) {
        const ctx = this.audioCtx;
        const _this = this
        this.vco.forEach((vco, i) => {
            vco.type = nextProps.vco[i].type
            vco.frequency.setValueAtTime(_this.getFrequency() + nextProps.vco[i].pitch, ctx.currentTime)
            this.vcoGain[i].gain.setValueAtTime(nextProps.vco[i].gain, ctx.currentTime);

        })


        if (nextProps.power.active && !this.props.power.active) {
            this.start()
        } else if (!nextProps.power.active && this.props.power.active) {
            this.stopSequencer()
        }

        this.gain.gain.setValueAtTime(nextProps.amp.gain, ctx.currentTime); // value in hertz
        this.biquadFilter.frequency.setValueAtTime(nextProps.filter.frequency, ctx.currentTime); // value in hertz
        this.biquadFilter.Q.setValueAtTime(nextProps.filter.resonance, ctx.currentTime); // value in hertz

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
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ tick }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioEngine);

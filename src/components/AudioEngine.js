import React from 'react';
import { connect } from 'react-redux';
import { tick } from '../actions/actions.js';
import { bindActionCreators } from 'redux';


class AudioEngine extends React.Component {
    constructor(props) {
        super(props)
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

        //this.vco1.connect(this.biquadFilter);
        //this.vco2.connect(this.biquadFilter);


        this.biquadFilter.connect(this.envelope);
        this.envelope.connect(this.gain);
        this.gain.connect(this.audioCtx.destination);



        //this.start();
        //this.biquadFilter.connect(this.compressor);
        //this.compressor.connect(this.audioCtx.destination);


        // this.start();

    }

    startVCO(index) {
        const ctx = this.audioCtx
        this.vco[index] = ctx.createOscillator();
        this.vco[index].type = this.props.vco[index].type;
        this.vco[index].frequency.setValueAtTime(this.props.vco[index].pitch, ctx.currentTime); // value in hertz

        this.vcoGain[index] = ctx.createGain();
        this.vcoGain[index].gain.setValueAtTime(this.props.vco[index].gain, ctx.currentTime);

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

    playSweep() {
        const { envelope, sequencer } = this.props

        if (sequencer.gate == 0) return
        const ctx = this.audioCtx
        const stepLength = 60 / sequencer.tempo
        const sweepLength = (stepLength / 100) * sequencer.gate


        const start = ctx.currentTime;
        const attack = start + envelope.attack;
        const hold = sweepLength
        const release = envelope.release


        this.envelope.gain.cancelScheduledValues(ctx.currentTime);

        if (envelope.attack > 0) {
            this.envelope.gain.setValueAtTime(0, ctx.currentTime)
            this.envelope.gain.linearRampToValueAtTime(1, ctx.currentTime + envelope.attack)
        } else {
            this.envelope.gain.setValueAtTime(1, ctx.currentTime)

        }

        if(envelope.attack > sweepLength){
            this.envelope.gain.cancelAndHoldAtTime(ctx.currentTime + sweepLength)
        }

       


        if (sequencer.gate < 100) {

            if(envelope.release > 0  ){
                this.envelope.gain.setTargetAtTime(0, ctx.currentTime + sweepLength, envelope.release)
    
            }else{
                this.envelope.gain.setValueAtTime(0, ctx.currentTime + sweepLength)

            }

            this.envelope.gain.setValueAtTime(0, ctx.currentTime + stepLength)

        }
        console.log(sweepLength)

        // this.start()
        //  this.stop(sweepLength)


    }


    componentWillReceiveProps(nextProps) {
        const ctx = this.audioCtx;
        this.vco.forEach((vco, i) => {
            vco.type = nextProps.vco[i].type
            vco.frequency.setValueAtTime(nextProps.vco[i].pitch, ctx.currentTime)
            this.vcoGain[i].gain.setValueAtTime(nextProps.vco[i].gain, ctx.currentTime);

        })


        if (nextProps.power.active && !this.props.power.active) {
            this.startSequencer()
        } else if (!nextProps.power.active && this.props.power.active) {
            this.stopSequencer()
        }

        this.gain.gain.setValueAtTime(nextProps.amp.gain, ctx.currentTime); // value in hertz
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
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ tick }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioEngine);

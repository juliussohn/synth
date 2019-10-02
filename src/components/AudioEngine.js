import React from 'react';
import { connect } from 'react-redux';
import { tick, pressNote } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { transform } from "framer-motion"
import * as midi from "@tonaljs/midi";
import * as tonal from "@tonaljs/tonal";


const transposeFrequencyByOctave = (frequency, octave) => {
    return frequency * Math.pow(2, octave)
}





const transposeFrequencyByCents = (frequency, cents) => {
    const freq = frequency * Math.pow(2, cents / 1200)
    return freq
}
const transposeFrequencyBySemitones = (frequency, semitones) => {
    const a = Math.pow(2, 1 / 12)
    return frequency * Math.pow(a, semitones)
}


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

        this.pressedNotes = [];
    }

    mapKeyboardToMidi(key) {
        switch (key) {
            case 'a': return 48;
            case 'w': return 49;
            case 's': return 50;
            case 'e': return 51;
            case 'd': return 52;
            case 'f': return 53;
            case 't': return 54;
            case 'g': return 55;
            case 'y': return 56;
            case 'h': return 57;
            case 'u': return 58;
            case 'j': return 59;
            case 'k': return 60;
            case 'o': return 61;
            case 'l': return 62;
            case 'p': return 63;
            case ';': return 64;
            case 'Dead': return 65;
            default: return false
        }
    }

    onMIDISuccess(midiAccess) {

        this.inputs = midiAccess.inputs;

        for (var input of midiAccess.inputs.values()) {
            input.onmidimessage = this.getMIDIMessage.bind(this);
        }

    }

    getMIDIMessage(midiMessage) {

        const note = midiMessage.data[1];
        const velocity = transform(midiMessage.data[2], [1, 127], [0, 1]);
        const noteName = midi.midiToNoteName(note)

        switch (midiMessage.data[0]) {
            case 144:
                this.playNote(noteName, velocity)
                break;
            case 128:
                this.releaseNote(noteName)
                break;
        }
    }

    playNote(noteName, velocity = 1) {
        const ctx = this.audioCtx;
        const glide = this.pressedNotes.length > 0;

        this.triggerEnvelope(velocity)

        if (this.pressedNotes.indexOf(noteName) == -1) this.pressedNotes.push(noteName)// dont add key if already in 
        const note = tonal.note(noteName)

        this.props.pressNote(note, velocity)

        const baseFrequency = this.getBaseFrequency(note);

        this.vco.forEach((vco, i) => {
            const frequency = this.getVCOFrequency(i, baseFrequency)

            if (this.envelope.gain.value > 0.1 && this.props.general.glide) {
                vco.frequency.cancelScheduledValues(ctx.currentTime)
                vco.frequency.setValueAtTime(vco.frequency.value, ctx.currentTime)
                vco.frequency.linearRampToValueAtTime(frequency, ctx.currentTime + this.props.general.glide)
            } else {
                vco.frequency.setValueAtTime(frequency, ctx.currentTime)
            }
        })
    }

    releaseNote(noteName) {

        const keyIndex = this.pressedNotes.indexOf(noteName)
      
        //remove released note
        this.pressedNotes = this.pressedNotes.filter(function (value, index, arr) {
            return index != keyIndex;
        });

        if (this.pressedNotes.length) {
            this.playNote(this.pressedNotes[this.pressedNotes.length - 1], this.props.keyboard.velocity)
        } else {
            this.releaseEnvelope();


        }


    }

    getBaseFrequency(note, octave) {
        if (!octave) {
            octave = this.props.general.octave
        }
        const baseNote = tonal.note(note.pc + (note.oct + octave))
        return baseNote.freq

    }

    getVCOFrequency(i, baseFrequency) {
        const fineTuned = transposeFrequencyBySemitones(baseFrequency, this.props.vco[i].semitones)
        const detuned = transposeFrequencyByCents(fineTuned, this.props.vco[i].detune)
        return detuned
    }

    onMIDIFailure() {
        console.log('Could not access your MIDI devices.');

    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
        } else {
        }


    }


    onKeyDown(e) {
        const midiCode = this.mapKeyboardToMidi(e.key);
        const noteName = midi.midiToNoteName(midiCode)

        if (!midiCode || this.pressedNotes.indexOf(noteName) !== -1) return;
        this.keyPressed = e.key;
        this.playNote(noteName)


    }

    onKeyUp(e) {

        const midiCode = this.mapKeyboardToMidi(e.key);
        if (!midiCode) return;
        const noteName = midi.midiToNoteName(midiCode);

        this.releaseNote(noteName);
    }

    getTimeConstant(time) {
        return Math.log(time + 1) / Math.log(100)
    }


    keyToPitch(key) {
        const keyIndex = this.keys.indexOf(key);
        if (keyIndex === -1) return false
        const octave = Math.floor(keyIndex / 12);
        return {
            note: keyIndex - (12 * octave),
            octave: octave
        }
    }





    powerOn() {
        const _this = this
        this.props.vco.forEach((vco, i) => {
            _this.startVCO(i);
        })

    }

    powerOff(length) {
        const _this = this
        this.props.vco.forEach((vco, i) => {
            _this.stopVCO(i, length);
        })
    }


    startVCO(index) {
        const ctx = this.audioCtx

        const frequency = this.getVCOFrequency(index, this.getBaseFrequency(this.props.keyboard.note))

        this.vco[index] = ctx.createOscillator();
        this.vco[index].type = this.props.vco[index].type;
        this.vco[index].frequency.setValueAtTime(frequency, ctx.currentTime); // value in hertz

        this.vcoGain[index] = ctx.createGain();
        this.vcoGain[index].gain.setValueAtTime(this.props.vco[index].gain, ctx.currentTime);

        // connect
        this.vco[index].connect(this.vcoGain[index])
        this.vcoGain[index].connect(this.biquadFilter);

        this.vco[index].start();
    }

    stopVCO(index, time = 0) {
        const ctx = this.audioCtx
        this.vco[index].stop(ctx.currentTime + time + this.props.envelope.release);
    }



    triggerEnvelope(velocity = 1) {
        const ctx = this.audioCtx;
        const { envelope } = this.props
        const startTime = ctx.currentTime
        this.envelope.gain.cancelScheduledValues(0);

        this.envelope.gain.setValueAtTime(this.envelope.gain.value, startTime)
        //this.envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.015) // prevent click

        if (envelope.attack == 0) {
            this.envelope.gain.linearRampToValueAtTime(velocity, startTime);

        } else {
            this.envelope.gain.linearRampToValueAtTime(velocity, startTime + envelope.attack);

        }
        this.envelope.gain.setValueAtTime(velocity, startTime + envelope.attack);
        this.envelope.gain.setTargetAtTime((envelope.sustain / 100) * velocity, startTime + envelope.attack, this.getTimeConstant(envelope.decay))

    }


    releaseEnvelope() {
        const { envelope } = this.props
        const ctx = this.audioCtx
        const startTime = ctx.currentTime
        this.envelope.gain.cancelScheduledValues(startTime);
        this.envelope.gain.setValueAtTime(this.envelope.gain.value, startTime);

        const releaseConstant = envelope.release > 0 ? this.getTimeConstant(envelope.release) : 0.0001
        console.log('releaseConstant', releaseConstant)
        this.envelope.gain.setTargetAtTime(0, startTime, releaseConstant)

    }

    componentWillReceiveProps(nextProps) {
        const ctx = this.audioCtx;

        console.log(nextProps.general.octave, this.props.general.octave)
        // console.log(nextProps.vco[1].gain, this.props.vco[1].gain)
        //  console.log(nextProps.vco[1].detune, this.props.vco[1].detune)
        // update VCOs
        this.vco.forEach((vco, i) => {

            if (nextProps.vco[i].type !== this.props.vco[i].type) vco.type = nextProps.vco[i].type
            if (nextProps.general.octave !== this.props.general.octave || nextProps.vco[i].semitones !== this.props.vco[i].semitones || nextProps.vco[i].detune !== this.props.vco[i].detune) vco.frequency.setValueAtTime(this.getVCOFrequency(i, this.getBaseFrequency(nextProps.keyboard.note, nextProps.general.octave)), ctx.currentTime)
            if (nextProps.vco[i].gain !== this.props.vco[i].gain) this.vcoGain[i].gain.setValueAtTime(nextProps.vco[i].gain * nextProps.keyboard.velocity, ctx.currentTime);

        })

        // power
        if (nextProps.power.active && !this.props.power.active) {
            this.powerOn()
        } else if (!nextProps.power.active && this.props.power.active) {
            this.powerOff()
        }

        if (nextProps.amp.gain !== this.props.amp.gain) this.gain.gain.setValueAtTime(nextProps.amp.gain, ctx.currentTime);
        if (nextProps.filter.frequency !== this.props.filter.frequency) this.biquadFilter.frequency.setValueAtTime(nextProps.filter.frequency, ctx.currentTime);
        if (nextProps.filter.resonance !== this.props.filter.resonance) this.biquadFilter.Q.setValueAtTime(nextProps.filter.resonance, ctx.currentTime);

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
    return bindActionCreators({ tick, pressNote }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioEngine);

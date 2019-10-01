import React from 'react';
import { connect } from 'react-redux';
import { tick } from '../actions/actions.js';
import { bindActionCreators } from 'redux';
import { transform } from "framer-motion"
import * as midi from "@tonaljs/midi";
import * as tonal from "@tonaljs/tonal";


const transposeFrequencyByOctave = (frequency, octave) => {
    return frequency * Math.pow(2, octave)
}





const transposeFrequencyByCents = (frequency, cents) => {
    const freq = frequency * Math.pow(2, cents / 1200)
    console.log(freq)
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

        this.pitch = {
            note: 0,
            octave: 0
        }
        this.lastNoteReleased = new Date()

        this.note = tonal.note("C3");
        this.notePressed = false;
        this.baseFrequency = 262
        this.keys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';']
        this.frequencies = []
    }

    mapKeyboardToMidi(key){
        console.log(key)
        switch (key){
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
        const velocity = midiMessage.data[2];
        const noteName = midi.midiToNoteName(note)
        console.log(note)
        switch (midiMessage.data[0]) {
            case 144:
                this.playNote(noteName)
                break;
            case 128:
                this.releaseNote(noteName)
                break;
        }
    }

    playNote(noteName) {
        const ctx = this.audioCtx;
        const glide = this.notePressed;

        if (!glide) this.triggerEnvelope()

        this.notePressed = true
        this.note = tonal.note(noteName)

        const baseFrequency = this.getBaseFrequency(this.note);

        this.vco.forEach((vco, i) => {
            const frequency = this.getVCOFrequency(i, baseFrequency)
            if (glide && this.props.general.glide) {
                vco.frequency.cancelScheduledValues(ctx.currentTime)
                vco.frequency.setValueAtTime(vco.frequency.value, ctx.currentTime)
                vco.frequency.linearRampToValueAtTime(frequency, ctx.currentTime + this.props.general.glide)
            } else {
                vco.frequency.setValueAtTime(frequency, ctx.currentTime)
            }
        })
    }

    releaseNote(noteName) {
        if (this.note.name == noteName) {
            this.releaseEnvelope();
            this.notePressed = false
        }
    }

    getBaseFrequency(note) {
        const baseNote = tonal.note(note.pc + (note.oct + this.props.general.octave))
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
        if (midiCode !== false && e.key !== this.keyPressed) {
            this.keyPressed = e.key;
            const noteName = midi.midiToNoteName(midiCode)
            this.playNote(noteName)
        }


    }

    onKeyUp(e) {
        if (e.key !== this.keyPressed) return
        this.keyPressed = false
        const midiNote = this.mapKeyboardToMidi(e.key);
        const noteName = midi.midiToNoteName(midiNote);
      
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

        const frequency  = this.getVCOFrequency(index, this.getBaseFrequency(this.note))

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

  

    triggerEnvelope() {
        const ctx = this.audioCtx;
        const { envelope } = this.props
        const startTime = ctx.currentTime

        this.envelope.gain.cancelScheduledValues(0);
        this.envelope.gain.setValueAtTime(0, startTime)
        //this.envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.015) // prevent click
        this.envelope.gain.linearRampToValueAtTime(1, startTime + envelope.attack);
        this.envelope.gain.setValueAtTime(1, startTime + envelope.attack);
        this.envelope.gain.setTargetAtTime(envelope.sustain / 100, startTime + envelope.attack, this.getTimeConstant(envelope.decay))

    }


    releaseEnvelope() {
        const { envelope } = this.props
        const ctx = this.audioCtx
        const startTime = ctx.currentTime
        this.envelope.gain.cancelScheduledValues(startTime);
        this.envelope.gain.setValueAtTime(this.envelope.gain.value, startTime);
        this.envelope.gain.setTargetAtTime(0, startTime, this.getTimeConstant(envelope.release))

    }

    componentWillReceiveProps(nextProps) {
        const ctx = this.audioCtx;

        // update VCOs
        this.vco.forEach((vco, i) => {
            vco.type = nextProps.vco[i].type
            console.log(this.note)
            console.log(this.getVCOFrequency(i, this.getBaseFrequency(this.note)))
            vco.frequency.setValueAtTime(this.getVCOFrequency(i, this.getBaseFrequency(this.note)), ctx.currentTime)
            this.vcoGain[i].gain.setValueAtTime(nextProps.vco[i].gain, ctx.currentTime);
        })

        // power
        if (nextProps.power.active && !this.props.power.active) {
            this.powerOn()
        } else if (!nextProps.power.active && this.props.power.active) {
            this.powerOff()
        }

        this.gain.gain.setValueAtTime(nextProps.amp.gain, ctx.currentTime);
        this.biquadFilter.frequency.setValueAtTime(nextProps.filter.frequency, ctx.currentTime);
        this.biquadFilter.Q.setValueAtTime(nextProps.filter.resonance, ctx.currentTime);

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

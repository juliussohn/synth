import * as tonal from "@tonaljs/tonal";

export let defaultState = {
    meta: {
        presetName: ""
    },
    onboarding:{
        finished:false,
        currentStep:0,
        animating:false
    },
    power: {
        active: false
    },
    general: {
        octave: 0,
        glide: 0,
        preset:0,
        currentTime:0
    },
    oscilloscope:{
        dataArray:[],
        fftSize:2048
    },
    vco: [
        {
            pitch: 0,
            type: 'sawtooth',
            gain: 1,
            octave: 0,
            semitones: 0,
            detune: 0
        },
        {
            pitch: 0,
            type: 'sawtooth',
            gain: 0,
            octave: 0,
            semitones: 0,
            detune: 0,

        },
        {
            pitch: 0,
            type: 'sawtooth',
            gain: 0,
            octave: 0,
            semitones: 0,
            detune: 0,

        },

    ],
    envelope: {
        attack: .2,
        decay: .2,
        sustain: 100,
        release: .5,
    },
    filterEnvelope: {
        attack: .2,
        decay: .2,
        sustain: 100,
        release: .5,
        intensity: 50,
    },
    filter: {
        frequency: 1500,
        resonance: 1
    },
    sequencer: {
        tempo: 90,
        gate: 50,
        currentStep: 0,
        steps: 16
    },
    amp: {
        gain: 1
    },
    keyboard: {
        note: tonal.note("C3"),
        velocity: 1
    },


}

const reducers = (state = defaultState, action) => {
    
    switch (action.type) {
        case 'SET_PARAM':
            if (action.moduleIndex === false) {
                return {
                    ...state,
                    [action.module]: {
                        ...state[action.module],
                        [action.param]: action.value
                    }
                }
            } else {

                return {
                    ...state,
                    [action.module]: state[action.module].map((module, index) => {
                        if (index === action.moduleIndex) {
                            return {
                                ...module,
                                [action.param]: action.value
                            }
                        }
                        return module

                    })

                }
            }

        case 'SET_POWER':
            return {
                ...state,
                power: {
                    ...state.power,
                    active: action.active
                }
            }

            
        case 'LOAD_PRESET':
            return {
                ...defaultState,
                ...state,
                ...action.preset,
                power: {
                    active:state.power.active
                }
            }
             
        case 'SET_PRESET':
                return {
                    ...state,
                    general: {
                        ...state.general,
                        preset:action.preset
                    }
                }
                
        case 'PRESS_NOTE':
            return {
                ...state,
                keyboard: {
                    ...state.keybpard,
                    note: {
                        ...action.note
                    },
                    velocity: action.velocity
                }
            }


        case 'TICK':
            return {
                ...state,
                sequencer: {
                    ...state.sequencer,
                    currentStep: state.sequencer.currentStep === state.sequencer.steps - 1 ? 0 : state.sequencer.currentStep + 1
                }
            }

        case 'UPDATE_OSCILLOSCOPE':{
            return {
                ...state,
                oscilloscope:{
                    ...state.oscilloscope,
                    dataArray: action.dataArray.map((e)=>e)
                },
                general:{
                    ...state.general,
                    currentTime: action.currentTime
                }
            }
        }
        case 'UPDATE_CURRENT_TIME':{
            return {
                ...state,
                general:{
                    ...state.general,
                    currentTime: action.currentTime
                }
            }
        }



        case 'ONBOARDING_ANIMATION_COMPLETE': {
            return {
                ...state,
                onboarding:{
                    ...state.onboarding,
                    animating: false
                }
            }
        }

        
        case 'ONBOARDING_FINISH':
            return {
                ...state,
                onboarding:{
                    ...state.onboarding,
                    finished: true,
                },
                power:{
                    ...state.power,
                    active:true
                }
            }

        case 'ONBOARDING_NEXT_STEP':
            return {
                ...state,
                onboarding:{
                    ...state.onboarding,
                    animating: true,
                    currentStep: state.onboarding.currentStep + 1,
                }
            }

        default: return state
    }
}

export default reducers


/*
  let stateCopy = state

            if (action.moduleIndex === false) {
                stateCopy[action.module][action.param] = action.value
            } else {
                stateCopy[action.module][action.moduleIndex][action.param] = action.value
            }
            return stateCopy;
*/
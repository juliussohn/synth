import * as tonal from "@tonaljs/tonal";

let defaultState = {
    power: {
        active: false
    },
    general: {
        octave: 0,
        glide: 0
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

    ],
    envelope: {
        attack: .2,
        decay: .2,
        sustain: 100,
        release: .5,
    },
    filter: {
        frequency: 2000,
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

        case 'PRESS_NOTE':
            console.log(action)
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
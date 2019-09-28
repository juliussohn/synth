let defaultState = {
    power: {
        active: false
    },

    vco: [
        {
            pitch: 150,
            type: 'sawtooth',
            gain:1
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        },
        {
            pitch: 150,
            type: 'sawtooth',
            gain:0
        }
    ],
    filter: {
        frequency: 900,
        resonance: 1
    },
    amp:{
        gain:1
    }

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
                        if (index == action.moduleIndex) module[action.param] = action.value
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
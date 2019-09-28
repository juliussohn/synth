let defaultState = {
    power: {
        active: true
    },
    vco: [
        {
            pitch: 150,
            type: 'sawtooth'
        },
        {
            pitch: 150,
            type: 'sawtooth'
        },
    ],
    power: true,
    filter: {
        frequency: 900,
        resonance: 1
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
                    [action.module]: {
                        ...state[action.module],
                        [action.moduleIndex]: {
                            ...state[action.module][action.moduleIndex],
                            [action.param]: action.value
                        }

                    }

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
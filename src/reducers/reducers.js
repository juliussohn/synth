let defaultState = {
    power:{
        active:true
    },
    vco1: {
        pitch: 150,
        type: 'sawtooth'
    },
    power: true,
    filter: {
        frequency:900,
        resonance:1
    },

}

const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PARAM':
            return {
                ...state,
                [action.module]: {
                    ...state[action.module],
                    [action.param]: action.value
                }
            }
        default: return state
    }
}

export default reducers
let defaultState = {
    parameters:{
        power:true,
        pitch: 150,
        filter: 900,
    }
   
}

const reducers = (state = defaultState, action) =>{
    switch (action.type) {
        case 'SET_PARAMETER':
            return {
                ...state,
                parameters:{
                    ...state.parameters,
                    [action.parameter]: action.value
                }
            }
        default: return state
    }
}

export default reducers
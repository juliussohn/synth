export const setParam = (module, param, value) =>(
    {
        type: 'SET_PARAM',
        value,
        module,
        param
    }
)
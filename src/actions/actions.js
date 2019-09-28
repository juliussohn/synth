export const setParam = (module, moduleIndex, param, value) =>(
    {
        type: 'SET_PARAM',
        value,
        module,
        moduleIndex,
        param
    }
)
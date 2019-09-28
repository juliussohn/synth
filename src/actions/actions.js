export const setParam = (module, moduleIndex, param, value) =>(
    {
        type: 'SET_PARAM',
        value,
        module,
        moduleIndex,
        param
    }
)

export const setPower = (active) =>(
    {
        type: 'SET_POWER',
        active
    }
)
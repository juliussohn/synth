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

export const setPreset = (preset) =>(
    {
        type: 'SET_PRESET',
        preset
    }
)

export const pressNote = (note, velocity = 1) =>(
    {
        type: 'PRESS_NOTE',
        note,
        velocity
    }
)

export const tick = () =>(
    {
        type: 'TICK',
    }
)
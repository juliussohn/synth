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

export const loadPreset = (preset) =>(
    {
        type: 'LOAD_PRESET',
        preset
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

export const updateCurrentTime = (currentTime) =>(
    {
        type: 'UPDATE_CURRENT_TIME',
        currentTime,
    }
)

export const updateOscilloscope = (dataArray, currentTime) =>(
    {
        type: 'UPDATE_OSCILLOSCOPE',
        dataArray,
        currentTime
    }
)

export const onboardingNextStep = () =>(
    {
        type: 'ONBOARDING_NEXT_STEP',
    }
)

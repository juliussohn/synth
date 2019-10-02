export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


export const saveState = (state) => {
    try {

        const saveState = {
            ...state,
            state: {
                ...state.state,
                power: {
                    active: 0
                }
            }
        }

        const serializedState = JSON.stringify(saveState);



        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};


export const getPreset = (presets, presetName) => {
    return presets.find(p => p.meta.presetName === presetName);
}

export const getPresetIndex = (presets, preset) => {
    return presets.findIndex((p => p.meta.presetName == preset.meta.presetName));
}

export const clearPresets = ()=> {
    localStorage.setItem('presets', '[]');
}


export const getPresets = () =>{
    try {
        const serializedState = localStorage.getItem('presets');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
}


export const savePreset = (preset) => {
    try {
        let presets = getPresets();
        const presetIndex = getPresetIndex(presets, preset);

        if (presetIndex === -1) {
            presets.push(preset);
        } else {
            presets[presetIndex] = preset
        }
        console.log(presetIndex);
        

        const serializedState = JSON.stringify(presets);
        localStorage.setItem('presets', serializedState);
    } catch {
        // ignore write errors
    }
};



export const createPreset = (state, presetName) => {
    const preset = {

    }
}
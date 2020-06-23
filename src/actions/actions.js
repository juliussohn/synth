export const setParam = (module, moduleIndex, param, value) => ({
	type: "SET_PARAM",
	value,
	module,
	moduleIndex,
	param,
});

export const setPower = (active) => ({
	type: "SET_POWER",
	active,
});

export const loadPreset = (preset) => ({
	type: "LOAD_PRESET",
	preset,
});

export const setPreset = (preset) => ({
	type: "SET_PRESET",
	preset,
});

export const pressNote = (note, velocity = 1) => ({
	type: "PRESS_NOTE",
	note,
	velocity,
});

export const tick = () => ({
	type: "TICK",
});

export const updateCurrentTime = (currentTime) => ({
	type: "UPDATE_CURRENT_TIME",
	currentTime,
});

export const updateOscilloscope = (dataArray, currentTime) => ({
	type: "UPDATE_OSCILLOSCOPE",
	dataArray,
	currentTime,
});

export const onboardingAnimationComplete = () => ({
	type: "ONBOARDING_ANIMATION_COMPLETE",
});

export const onboardingFinish = () => ({
	type: "ONBOARDING_FINISH",
});

export const onboardingNextStep = () => ({
	type: "ONBOARDING_NEXT_STEP",
});
export const onboardingReset = () => ({
	type: "ONBOARDING_RESET",
});

export const sharePatch = (patchLink) => ({
	type: "SHARE_PATCH",
	patchLink,
});

export const closeShareModal = () => ({
	type: "CLOSE_SHARE_MODAL",
});

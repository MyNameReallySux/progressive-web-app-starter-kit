export const WINDOW = {
	LOAD: 'WINDOW_LOAD',
	RESIZE: 'WINDOW_RESIZE',
	SCROLL: 'WINDOW_SCROLL',
	
	CALC_VIEWPORT: 'WINDOW_CALC_VIEWPORT',
	SET_VIEWPORT: 'WINDOW_SET_VIEWPORT'
}

export const actions = {
	load: (...args) => ({
		type: WINDOW.LOAD
	}),
	resize: (...args) => ({
		type: WINDOW.RESIZE
	}),
	scroll: (...args) => ({
		type: WINDOW.SCROLL
	}),
	
	calcViewport: (...args) => ({
		type: WINDOW.CALC_VIEWPORT
	}),
	setViewport: (current, previous, delta, lastUpdate) =>  ({
		type: WINDOW.SET_VIEWPORT,
		payload: { current, previous, delta, lastUpdate }
	})
	
}
import DeviceManager from '@libs/DeviceManager'

import { AppSelectors } from '@modules/app'
import { MediaActions } from '@modules/media'

import { WINDOW as WindowTypes, actions as WindowActions } from './window.actions'
import { selectors as WindowSelectors } from './'


export const reactions = {
	[WindowTypes.RESIZE]: async (store, reload, dispatch) => {
		await dispatch(MediaActions.setDevice())
	},
	[WindowTypes.SCROLL]: (store, reload, dispatch) => {
		console.log('Saga Scroll')
	},
	[WindowTypes.LOAD]: (store, reload, dispatch) => {
		return dispatch(MediaActions.setDevice())
	},
	[WindowTypes.CALC_VIEWPORT]: async (store, reload, dispatch) => {
		let state = reload();

		let initial = WindowSelectors.selectCurrent(state);
		
		let { current, previous } = DeviceManager.getTemporalDimensions(initial)
		let delta = DeviceManager.getDelta(current, previous)
		let date = new Date()
	
		let lastUpdate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
	
		dispatch(WindowActions.setViewport(current, previous, delta, lastUpdate))
	}
}
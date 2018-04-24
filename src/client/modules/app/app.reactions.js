import { MediaActions } from '@modules/media'
import { WindowActions } from '@modules/window'

import { APP as AppTypes, actions as AppActions } from './app.actions'

export const reactions = {
	[AppTypes.INIT]: async (store, reload, dispatch) => {
		let resized = false
		window.addEventListener('resize', () => {
			clearTimeout(resized)
			resized = setTimeout(() => {
				dispatch(WindowActions.resize())
			}, 100)
		})
		
		let scrolled = false
		window.addEventListener('scroll', () => {
			clearTimeout(scrolled)
			scrolled = setTimeout(() => {
				dispatch(WindowActions.scroll())
			}, 100)
		})
	
		window.addEventListener('load', () => {
			dispatch(WindowActions.load())
		})
	},
	[AppTypes.SET_CURRENT_ROUTE]: async (store, reload, dispatch) => {

	}
}
import { updateObject, updateArray } from '@utils/immutable'
import { WINDOW as WindowTypes, actions as WindowActions } from './window.actions'

export const mutations = {
	[WindowTypes.SET_VIEWPORT]: (state, action) => {
		let viewport = action.payload		
		return updateObject(state, viewport)
	},
}
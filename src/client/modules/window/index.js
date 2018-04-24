import { createContainer } from 'redux-box'
import { convertReactionsToSagas } from '@utils/sagas'

import { actions, WINDOW as TYPES } from './window.actions'
import { mutations } from './window.mutations'
import { reactions } from './window.reactions'

const MODULE_NAME = 'window'

const INITIAL_STATE = {
	current: {width: 0, height: 0},
	previous: {width: 0, height: 0},
	lastUpdate: undefined,
	delta: {
		description: 'no change',
		width: {
			value: 0,
			description: 'same'
		},
		height: {
			value: 0,
			description: 'same'
		},
		area: {
			value: 0,
			description: 'same'
		}
	}
}

export const selectors = {
	selectCurrent: (state) => state[MODULE_NAME].current,
	selectPrevious: (state) => state[MODULE_NAME].previous,
	selectDelta: (state) => state[MODULE_NAME].delta,
	selectLastUpdate: (state) => state[MODULE_NAME].lastUpdate,
}

let sagas = convertReactionsToSagas(reactions)

export const module = {
	name: MODULE_NAME,
	state: INITIAL_STATE,
    actions, mutations, sagas
}

export { 
    actions as WindowActions, 
	mutations as WindowMutations, 
	selectors as WindowSelectors,
	reactions as WindowReactions, 
	
	INITIAL_STATE as WindowInitialState,
	TYPES as WindowTypes,
}

export default createContainer(module)
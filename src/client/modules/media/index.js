import { createContainer } from 'redux-box'
import { convertReactionsToSagas } from '@utils/sagas'

import { actions, MEDIA as TYPES } from './media.actions'
import { mutations } from './media.mutations'
import { reactions } from './media.reactions'

const MODULE_NAME = 'media'

const INITIAL_STATE = {
	query: undefined,
	type: undefined
}

let sagas = convertReactionsToSagas(reactions)

export const module = {
	name: MODULE_NAME, 
	state: INITIAL_STATE,
    actions, mutations, sagas
}

export { 
    actions as MediaActions, 
    mutations as MediaMutations, 
    reactions as MediaReactions, 
    TYPES as MediaTypes,
    INITIAL_STATE as MediaInitialState
}

export default createContainer(module)

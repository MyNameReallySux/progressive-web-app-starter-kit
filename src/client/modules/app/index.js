import { createContainer } from 'redux-box'
import { convertReactionsToSagas } from '@utils/sagas'

import { actions, APP as TYPES } from './app.actions'
import { mutations } from './app.mutations'
import { reactions } from './app.reactions'

const MODULE_NAME = 'app'
const INITIAL_STATE = {
    manifest: {
        content: {},
        loading: false,
        error: false,
        isLoaded: false
    }
}

export const selectors = {
    selectManifest: (state) => state.app.manifest,
    selectManifestContent: (state) => state.app.manifest.content,
    selectManifestIsLoaded: (state) => state.app.manifest.isLoaded,
    selectManifestLoading: (state) => state.app.manifest.loading,
    selectManifestError: (state) => state.app.manifest.error
}

let sagas = convertReactionsToSagas(reactions)

export const module = {
    name: MODULE_NAME, 
    state: INITIAL_STATE,
    actions, mutations, sagas
}

export { 
    actions as AppActions, 
    mutations as AppMutations, 
    selectors as AppSelectors,
    reactions as AppReactions, 
    TYPES as AppTypes,
    INITIAL_STATE as AppInitialState
}

export default createContainer(module)
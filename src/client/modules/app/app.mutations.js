import { updateObject, updateArray } from '@utils/immutable'

import { APP as AppTypes } from './app.actions'

export const mutations = {
    [AppTypes.FETCH_MANIFEST_REQUEST]: (state, action) => {
        let loading = true
        
        return updateObject(state, { manifest: { ...state.manifest, loading }})
    },
    [AppTypes.FETCH_MANIFEST_SUCCESS]: (state, action) => {
        let content = action.payload.result
        let loading = false,
            isLoaded = true,
            error = false

        let result = updateObject(state, { manifest: { content, loading, isLoaded, error}})
        return result
    },
    [AppTypes.FETCH_MANIFEST_FAILURE]: (state, action) => {
        let error = action.payload.error,
            loading = false
        
        return updateObject(state, { manifest: {...state.manifest, loading, error}})
    },
    [AppTypes.SET_CURRENT_ROUTE]: (state, action) => {
        let { route } = action.payload
        return updateObject(state, { ...state, route })

    }
}

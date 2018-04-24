import { combineReducers } from 'redux'

export function createReducer(initialState, mutations = {}){
	return function reducer(state = initialState, action){		
		if(typeof action == undefined){
			return null
		} else if(mutations.hasOwnProperty(action.type)){
			return mutations[action.type](state, action)
		} else {
			return state
		}
	}
}

export function getCombinedReducer(modules){
    let result = {}
    modules.forEach(mod => {
        result[mod.name] = createReducer(mod.state, mod.mutations)
    })
    return combineReducers(result)
}
import { updateObject, updateArray } from '@utils/immutable'

import { MEDIA as MediaTypes, actions as MediaActions } from './media.actions'

export const mutations = {
	// [MediaTypes.INIT_DEVICE]: (state, action) => {
	// 	return state
	// },
	[MediaTypes.SET_DEVICE_TYPE]: (state, action) => {
		let type = action.payload.type
		
		return updateObject(state, { type })
	},
	[MediaTypes.SET_DEVICE_QUERY]: (state, action) => {
		let queries = action.payload.queries,
			width = action.payload.width
								
		queries.xs.min = 0
		queries.xl.max = 9999
		
		let query = (() => {
			for(let query of Object.keys(queries)){
				let { min, max } = queries[query]
				if(width >= min && width < max){
					return queries[query].name
				}
			}
		})()
		
		return updateObject(state, { query })
	}
}
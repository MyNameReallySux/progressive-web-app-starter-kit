export const APP = {
	INIT: 'APP_INIT',
	FETCH_MANIFEST_REQUEST: 'APP_FETCH_MANIFEST_REQUEST',
	FETCH_MANIFEST_SUCCESS: 'APP_FETCH_MANIFEST_SUCCESS',
	FETCH_MANIFEST_FAILURE: 'APP_FETCH_MANIFEST_FAILURE',
	SET_CURRENT_ROUTE: 'SET_CURRENT_ROUTE'
}

export const actions = {
	init: () => ({
		type: APP.INIT
	}),
	fetchManifest: (query) => async (dispatch) => {
		if(!query){
			dispatch({ type: APP.FETCH_MANIFEST_REQUEST })

			let url = '/meta/site.json'
			try {
				let result = await fetch(url)
				let json = await result.json()
				dispatch(actions.fetchManifestSuccess(json))
			} catch (error){
				url = `${document.location}${url}`
				if(error == 'Error: Request failed with status code 404') 
					error = `Error: Request '${url}' failed with status code 404.`

				dispatch(actions.fetchManifestFailure(error))
			}
		}
	},
	fetchManifestSuccess: (result) => ({
		type: APP.FETCH_MANIFEST_SUCCESS,
		payload: { result }
	}),
	fetchManifestFailure: (error) => ({
		type: APP.FETCH_MANIFEST_FAILURE,
		payload: { error }
	}),
	setCurrentRoute: (route) => ({
		type: APP.SET_CURRENT_ROUTE,
		payload: { route }
	})
}
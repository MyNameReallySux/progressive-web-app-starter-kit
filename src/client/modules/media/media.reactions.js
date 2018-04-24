import DeviceManager from '@libs/DeviceManager'
import { AppActions, AppSelectors } from '@modules/app'
import { WindowActions } from '@modules/window'


import { MEDIA as MediaTypes, actions as MediaActions } from './media.actions'
import { WindowSelectors } from '../window';

export const reactions = {
	[MediaTypes.SET_DEVICE]: async (store, reload, dispatch) => {
		let state = reload()
		let handleDeviceViewport = async () => {
			return dispatch(WindowActions.calcViewport())
		}
		let handleDeviceQuery = async () => {
			state = reload()
			let manifestIsLoaded = AppSelectors.selectManifestIsLoaded(state)
	
			if(!manifestIsLoaded){
				await dispatch(AppActions.fetchManifest())
			}
			
			state = reload()
			manifestIsLoaded = AppSelectors.selectManifestIsLoaded(state)
	
			if(manifestIsLoaded){
				let { width } = WindowSelectors.selectCurrent(state)
				let { data: { media } } = AppSelectors.selectManifestContent(state)
	
				return dispatch(MediaActions.setDeviceQuery(width, media))
			} /* else {
				let error = state.media.queries.error
				return dispatch(AppActions.fetchManifestFailure(error))
			} */
		}
		
		let handleDeviceType = async () => {
			let type = DeviceManager.getDeviceType()
			
			return dispatch(MediaActions.setDeviceType(type))
		}
		await handleDeviceViewport()
		await handleDeviceQuery()
		return handleDeviceType()
	}
}
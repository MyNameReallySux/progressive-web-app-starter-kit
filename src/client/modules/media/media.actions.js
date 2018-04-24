export const MEDIA = {
	INIT_DEVICE: 'MEDIA_INIT_DEVICE',
	SET_DEVICE: 'MEDIA_SET_DEVICE',
	SET_DEVICE_TYPE: 'MEDIA_SET_DEVICE_TYPE',
	SET_DEVICE_QUERY: 'MEDIA_SET_DEVICE_QUERY',
}

export const actions = {
	setDevice: () => ({
		type: MEDIA.SET_DEVICE
	}),
	setDeviceQuery: (width, queries) => ({
		type: MEDIA.SET_DEVICE_QUERY,
		payload: { width, queries }
	}),
	setDeviceType: (type) => ({
		type: MEDIA.SET_DEVICE_TYPE,
		payload: { type }
	})
}
export default class DeviceManager {
	static getDeviceType = () => {
		let userAgent = navigator.userAgent.toLowerCase()

		if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent))
			return 'tablet'
		else if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(userAgent))
			return 'phone'
		else
			return 'desktop'
    }
    
	static getTemporalDimensions = (previous) => {
		let current = DeviceManager.getDimensions()

		return {
			current, previous
		}
    }
    
	static getDimensions = () => {
		let w = window,
		d = document,
		docElement = d.documentElement,
		body =  d.getElementsByTagName('body')[0],

		width = w.innerWidth || d.clientWidth || body.clientWidth,
		height = w.innerHeight || d.clientHeight|| body.clientHeight,

		area = width * height

		return {
			width, height, area
		}
    }
    
	static getDelta = (current, previous) => {
		let delta = {
			width: current.width - previous.width,
			height: current.height - previous.height,
            area: current.area - previous.area,
            size: previous.area == 0 ? 0 : ((current.area / previous.area))
		}

		delta.description = DeviceManager.getDeltaDescriptions(delta)

		return delta
    }
    
    static getDeltaDescriptions = (delta) => {
        let description = {
            all: 'no change',
            size: 'no change',
            width: 'same',
            height: 'same',
            area: 'same'
        }

        if(delta.width < 0){
			description.width = 'thinner'
		} else if(delta.width > 0){
			description.width = 'wider'
		}

		if(delta.height < 0){
			description.height = 'shorter'
		} else if(delta.height > 0){
			description.height = 'taller'
		}

		if(delta.area < 0){
			description.area = 'smaller'
		} else if(delta.area > 0){
			description.area = 'larger'
		}

        let percentage = (delta.size * 100).toFixed(2)
        description.size = delta.percentage > 0 ? `${delta.percentage} larger` : `${-1 * delta.percentage} smaller`
        description.all = `${description.width} x ${description.height}, ${description.area}`
        
        return description
    }
}
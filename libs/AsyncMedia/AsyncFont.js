import FontFaceObserver from 'fontfaceobserver'
import { toKebabCase } from '@beautiful-code/string-utils'

export default class AsyncFont {
	constructor(name = 'Roboto', url = 'https://fonts.googleapis.com/css?family=Roboto:300,700'){
		let link = this.createFontLink(url)
		this.addLinkToHead(link)
		this.createObserver(name)
	}

	addLinkToHead = (link) => document.head.appendChild(link)
	createFontLink = (url) => {
		const link = document.createElement('link')
		link.href = url
		link.rel = 'stylesheet'
		return link
	}
	createObserver = async (name) => {
		const observer = new FontFaceObserver(name)
		await observer.load()
		this.onFontLoaded(toKebabCase(name))
	}
	onFontLoaded = (className) => document.documentElement.classList.add(className)
}

export { AsyncFont }
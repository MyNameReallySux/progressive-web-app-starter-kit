import 'isomorphic-fetch'

import { AsyncFont } from './AsyncFont'

const reduce = (numerator, denominator) => {
    let calcGcd = (a, b) => b ? calcGcd(b, a % b) : a
    let gcd = calcGcd(numerator, denominator)
    return [numerator / gcd, denominator / gcd]
}

export default class AsyncMedia {
    static fonts = {}

    static loadMedia = () => {
        AsyncMedia.loadFonts()
        AsyncMedia.loadImages()
        AsyncMedia.loadSVGs()
    }

	static loadImages = () => {
        const handleImages = () => {
            const $images = document.querySelectorAll('img[data-src]')
            Array.from($images).forEach(($image) => {
                let src = $image.getAttribute('data-src')
                $image.setAttribute('src', src)
            })
        }

        const handleBackgroundImages = () => {
            const $backgrounds = document.querySelectorAll('div[data-src]')
            Array.from($backgrounds).forEach(($background) => {
                let src = $background.getAttribute('data-src')
                $background.style['width'] = '100%'
                $background.style['backgroundSize'] = 'cover'
                $background.style['backgroundPosition'] = 'center'
                $background.style['backgroundColor'] = '#eeeeee'

                let size = $background.getAttribute('data-ratio')
                if(size){
                    let [width, _, height] = size.split(/(\s?[xX\/]\s?)/) // split on x, X, or /; with space before or after.
                    let [rWidth, rHeight] = reduce(width, height)
                    $background.style['paddingBottom'] = `${(height / width) * 100}%`
                }
                let $sources = $background.querySelectorAll('source')
                if($sources){
                    Array.from($sources).some(($source) => {
                        let media = $source.getAttribute('media')
                        let srcset = $source.getAttribute('srcset')
        
                        if(window.matchMedia(media).matches){
                            console.log(media, 'matches, loading', srcset);
                            src = srcset
                            return true
                        }
                    })
                }
                $background.style['backgroundImage'] = `url(${src}`
                $background.removeAttribute('data-src');
            })
        }

        handleImages()
        handleBackgroundImages()
    }
    
    static loadFonts = () => {
        const $fonts = document.querySelectorAll('meta[data-font]')
        Array.from($fonts).forEach($font => {
            let data = $font.getAttribute('data-font')
            let [name, url] = data.split('|').map(value => value.trim())
            let font = new AsyncFont(name, url)

            AsyncMedia.fonts[name] = font
        })
    }

	static loadSVGs = () => {
		const $svgs = document.querySelectorAll('svg[data-src]')
            
		Array.from($svgs).forEach(async $svg => {
			let src = $svg.getAttribute('data-src')
			try {
				const response = await fetch(src, {
					headers: {
						'Content-Type': 'image/svg+xml'
					}
				})
				const svgContent = await response.text()
                $svg.insertAdjacentHTML('afterend', svgContent)
                $svg.remove()
			} catch (err){
				console.error(err)
			}
			
		})
    }
}

const { loadMedia, loadFonts, loadImages, loadSVGs } = AsyncMedia

export { 
	AsyncMedia, 
	loadMedia, loadFonts, loadImages, loadSVGs
}
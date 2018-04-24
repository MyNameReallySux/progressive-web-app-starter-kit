import 'isomorphic-fetch'

import { AsyncFont } from './AsyncFont'
import { q } from '@libs/QLite'

const CSS_PREFIX = 'qlite'

const SELECTORS = {
    BACKGROUND: () => `${CSS_PREFIX}__background`,
    PLACEHOLDER: (width, height) => `${SELECTORS.BACKGROUND()}__${width}x${height}`
}

let getBackgroundStyle = () => 
`.${SELECTORS.BACKGROUND()} {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #dddddd;
}`

let getPlaceholderStyle = (width, height) => `
.${SELECTORS.PLACEHOLDER(width, height)}{
    padding-bottom: ${(height / width) * 100}%;
}
`

const reduce = (numerator, denominator) => {
    let calcGcd = (a, b) => b ? calcGcd(b, a % b) : a
    let gcd = calcGcd(numerator, denominator)
    return [numerator / gcd, denominator / gcd]
}


export default class AsyncMediaQLite {
    static ratios = {}
    static loaded = {
        fonts: {},
        svgs: {}
    }

    static loadMedia = () => {
        AsyncMediaQLite.loadFonts()
        AsyncMediaQLite.loadImages()
        AsyncMediaQLite.loadSVGs()
    }


    static loadImages = () => {
        const handleImages = () => {
            const $images = q('img[data-src]')
            $images.forEach(image => {
                let $image = q(image)
                let src = $image.attr('data-src')
                $image.attr('src', src)
            })
        }

        const handleBackgroundImages = () => {
            let $style = q('#QLite__MainStyles')[0]
            let style
            if(!$style){
                $style = q(document.createElement('style'))
                $style.attr('id', 'QLite__MainStyles')
                document.head.appendChild($style.get())
                style = getBackgroundStyle()
                $style.html(style)
            } else {
                style = $style.html()
            }
            
            const $backgrounds = q('div[data-src]')
            $backgrounds.forEach(background => {
                let $background = q(background)
                let src = $background.attr('data-src')

                $background.node.classList.add(SELECTORS.BACKGROUND())

                let size = $background.attr('data-ratio')
                if(size){
                    let [width, _, height] = size.split(/(\s?[xX\/]\s?)/) // split on x, X, or /; with space before or after.
                    let [rWidth, rHeight] = reduce(width, height)
                    let ratio = AsyncMediaQLite.ratios[`${rWidth}x${rHeight}`]
                    if(!ratio){
                        let ratioStyle = getPlaceholderStyle(rWidth, rHeight)
                        AsyncMediaQLite.ratios[`${rWidth}x${rHeight}`] = ratioStyle
                        style = style + '\n' + ratioStyle
                        $style.html(style)
                    }
                    $background.node.classList.add(SELECTORS.PLACEHOLDER(rWidth, rHeight))
                }
                let $sources = $background.find('source')
                if($sources){
                    $sources.some(source => {
                        let $source = q(source)
                        let media = $source.attr('media')
                        let srcset = $source.attr('srcset')
        
                        if(window.matchMedia(media).matches){
                            src = srcset
                            return true
                        }
                    })
                }
                $background.node.style['backgroundImage'] = `url(${src}`
                $background.attr('data-src', '');
                $background.attr('data-ratio', '');
            })
        }

        handleImages()
        handleBackgroundImages()
    }

    static loadFonts = () => {
        const $fonts = q('meta[data-font]')
        $fonts.forEach(font => {
            let $font = q(font)
            let data = $font.attr('data-font')
            let [name, url] = data.split('|').map(value => value.trim())

            if(!AsyncMediaQLite.loaded.fonts[name]){
                let asyncFont = new AsyncFont(name, url)
                AsyncMediaQLite.loaded.fonts[name] = asyncFont
            }
            
        })
    }

    static loadSVGs = () => {
		const $svgs = q('svg[data-src]')
	
		$svgs.forEach(async svg => {
            let $svg = q(svg)
            let src = $svg.attr('data-src')
            let svgContent = ''

            if(AsyncMediaQLite.loaded.svgs[src]){
                svgContent = AsyncMediaQLite.loaded.svgs[src]
            } else {
                try {
                    const response = await fetch(src, {
                        headers: {
                            'Content-Type': 'image/svg+xml'
                        }
                    })
                    svgContent = await response.text()
                    AsyncMediaQLite.loaded.svgs[src] = svgContent
                } catch (err){
                    console.error(err)
                }
            }
            $svg.after(svgContent)
            $svg.node.remove()
		})
	}
}

const { loadMedia, loadFonts, loadImages, loadSVGs } = AsyncMediaQLite

export { 
	AsyncMediaQLite, 
	loadMedia, loadFonts, loadImages, loadSVGs
}
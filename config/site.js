// Local Modules
import TokenManager from '../libs/TokenManager'
import { commonPaths as paths } from './paths'
import pkg from '../package.json'

// Variables
const { parseYAML } = new TokenManager(paths.resolveTokens)
const manifest = parseYAML('manifest.yml')
const colors = parseYAML('colors.yml')
const media = parseYAML('media.yml')

// Site Info

let common = {
    packageName: pkg.name,
    description: pkg.description,

    data: {
        media: media.queries.px
    }
}

let client = { ...common,
    name: "PWA Starter Kit",
    shortName: 'PWA Starter Kit',
    description: 'This is a progressive web app boilerplate, built using React, Redux, and Webpack',

    meta: { ...common.meta,
        title: 'Progressive Web App | PWA Starter Kit',
        description: 'This is a progressive web app boilerplate, built using React, Redux, and Webpack'
    },
    data: { ...common.data, 
        colors: colors.theme,
    }
}

let admin = { ...common,
    name: "PWA Admin",
    shortName: 'PWA Admin',
    description: 'This is the backend and should not be visible from search engines.',
    meta: { ...common.meta,
        title: 'Progressive Web App | PWA Admin Console ',
        description: 'This is the backend and should not be visible from search engines.'
    },
    data: { ...common.data, 
        colors: colors.theme,
    }
}


export { client, admin }
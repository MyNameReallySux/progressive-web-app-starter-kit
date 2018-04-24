import { PathResolver } from '@beautiful-code/path-resolver'

let commonDirectoryMap = {
    config: {
        _: { alias: '@config' },
        admin: {},
        client: {},
        tokens: { _: { alias: '@tokens' }}
    }, 
    libs: { _: { alias: '@libs' }},
    src: {
        admin: { _: { alias: '@admin' }},
        client: { _: { alias: '@client' }},
        common: { _: { alias: '@common' }}
    }
}

let clientDirectoryMap = { ...commonDirectoryMap, 
    public: {},
    src: { ...commonDirectoryMap.src,
        client: { ...commonDirectoryMap.src.client,
            assets: {
                _: { alias: '@assets' },
                css: { _: { alias: '@style' }},
                images: { _: { alias: '@images' }},
                js: { _: { alias: '@scripts' }},
                sw: { _: { alias: '@workers' }}
            },
            components: { _: { alias: '@components' }},
            core: { _: { alias: '@core'}},
            layouts: { _: { alias: '@layouts' }},
            modules: { _: { alias: '@modules'}},
            pages: { _: { alias: '@pages' }},
            utils: { _: { alias: '@utils'}}
        }
    }
}

let adminDirectoryMap = { ...commonDirectoryMap,
    public: { ...commonDirectoryMap.public,
        _: { ignore: true },
        admin: { _:{ alias: '@public' } }
    },
    src: { ...commonDirectoryMap.src,
        admin: { ...commonDirectoryMap.src.admin,
            assets: {
                _: { alias: '@assets' },
                css: { _: { alias: '@style' }},
                images: { _: { alias: '@images' }},
                js: { _: { alias: '@scripts' }},
                sw: { _: { alias: '@workers' }}
            },
            components: { _: { alias: '@components' }},
            core: { _: { alias: '@core'}},
            layouts: { _: { alias: '@layouts' }},
            modules: { _: { alias: '@modules'}},
            pages: { _: { alias: '@pages' }},
            utils: { _: { alias: '@utils'}}
        }
    }
}

let adminPathResolver = new PathResolver(adminDirectoryMap)
let clientPathResolver = new PathResolver(clientDirectoryMap)
let commonPathResolver = new PathResolver(commonDirectoryMap)

let [adminPaths, adminAliases] = [
    adminPathResolver.getDirectoryResolver(),
    adminPathResolver.getAliasMap()
]

let [commonPaths, commonAliases] = [
    commonPathResolver.getDirectoryResolver(),
    commonPathResolver.getAliasMap()
]

let [clientPaths, clientAliases] = [
    clientPathResolver.getDirectoryResolver(),
    clientPathResolver.getAliasMap()
]

export {
    adminPathResolver as admin,
    clientPathResolver as client,
    commonPathResolver as common,

    adminPaths, adminAliases,
    clientPaths, clientAliases,
    commonPaths, commonAliases
}

export default commonPaths
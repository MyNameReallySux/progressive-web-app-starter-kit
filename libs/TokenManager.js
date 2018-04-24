import fs from 'fs-extra'
import yamlParser from 'js-yaml'

export default class TokenManager {
    constructor(tokenResolver){
        this.tokenResolver = tokenResolver
    }

    parseYAML = (file) => {
        let yaml = {}
        let path = this.tokenResolver ? this.tokenResolver(file) : file
        try {
            let content = fs.readFileSync(path, 'utf8')
            yaml = yamlParser.safeLoad(content)
        } catch(err) {
            switch(err.code){
                case 'EONENT': { console.error(`Could not parse file '${path}', file was not found`) } break
                default: throw err
            }
        } finally {
            return yaml
        }
    }
}

export { TokenManager }

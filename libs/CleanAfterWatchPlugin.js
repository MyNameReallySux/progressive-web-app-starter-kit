import glob from 'glob'
import fs from 'fs-extra'
import path from 'path'

import { print, info, warn } from '@beautiful-code/console-utils'
import { isArray } from '@beautiful-code/type-utils'

export default class CleanOnWatchPlugin {
    defaultOptions = {
        audit: false,
        root: process.cwd()
    }

    constructor(patterns = [], options = {}){
        let workingDirectory = process.cwd()

        options = Object.assign({}, this.defaultOptions, options)
        let { root } = options

        if(root !== workingDirectory) {
            let rootIsChildOfWorkingDirectory = false
            if(path.isAbsolute(root)){
                if(root.replace(/\/$/, "") === workingDirectory.replace(/\/$/, "")){
                    rootIsChildOfWorkingDirectory = true
                } else {
                    let parentTokens = workingDirectory.split(path.sep).filter(i => i.length)
                    let childTokens = root.split(path.sep).filter(i => i.length)
                    rootIsChildOfWorkingDirectory = parentTokens.every((token, i) => childTokens[i] == token)
                }
            } else {
                let parentTokens = workingDirectory.split(path.sep).filter(i => i.length)
                rootIsChildOfWorkingDirectory = parentTokens.some((token, i) => root == token)
            }

            if(!rootIsChildOfWorkingDirectory){
                throw Error(`Root folder ${root} was not found within the current working directory. ${workingDirectory}`)
            }
        }
        
        this.patterns = isArray(patterns) ? patterns : [patterns]
        this.options = options
    }

    apply = (compiler) => {
        const PLUGIN_NAME = this.constructor.name

        let { patterns } = this
        let { root, audit } = this.options

        if(audit) info(`\nRunning ${PLUGIN_NAME} in audit mode!`)
        compiler.hooks['watchRun'].tap(PLUGIN_NAME, compiler => {
            if(audit) info(`\nChecking resources ...`)
            patterns.forEach((pattern) => {
                let files = glob.sync(`${root}${pattern}`)
                if(audit) print(`Auditing [${pattern}]`)
                files.forEach((file) => {
                    if(fs.existsSync(file)){
                        audit
                        ? warn(`\t[${file}] should be deleted.`)
                        : fs.unlinkSync(file)
                    }
                })
                if(audit) files 
                    ? undefined 
                    : print('\tNo files found\n')
            })
        })
    }
}

export { CleanOnWatchPlugin }
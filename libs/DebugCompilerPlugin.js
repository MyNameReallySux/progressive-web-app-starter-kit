import { print, info, warn } from '@beautiful-code/console-utils'
import { copyFile } from 'fs';

export default class DebugCompilerPlugin {
    constructor(){}

    apply = (compiler) => {
        const compilerHooks = Object.keys(compiler.hooks)

        let startTime = process.hrtime()

        Object.keys(compiler.hooks).forEach((hook) => {
            compiler.hooks[hook].tap('DebugCompilerHooksPlugin', compiler => {
                info(`Executing ${hook} ...`)
            })
        })

        compiler.hooks['done'].tap('DebugCompilerHooksPlugin', compiler => {
            warn(`\nAll hooks executed!\n`)
        })
    }
}

export { DebugCompilerPlugin }
export default class EventHooksPlugin {
    constructor(hooks){
        this.hooks = hooks
    }

    apply = (compiler) => {
        const { hooks } = this
        const validHookNames = Object.keys(compiler.hooks)

        Object.entries(hooks).forEach(([name, hook]) => {
            if(!validHookNames.includes(name)) throw new Error(`Invalid hook name '${name}', use one of '${validHookNames.join(', ')}'`)
            compiler.hooks[name].tap('EventHooksPlugin', compiler => {
                hook(compiler)
            })
        })

        console.log()
    }
}

export { EventHooksPlugin }
import { isArray, isNumber, isString } from "@beautiful-code/type-utils";

import QLite from './QLite'
import QLiteNode from './QLiteNode'

export default class QLiteCollection extends Array {
    constructor(...items){
        super(...items)

        if(isArray(items)){
            items.forEach(item => this.add(item))
        }
    }

    add = (item) => {
        this.push(new QLiteNode(item))
        return this
    }

    find = (query) => {
        let result = this.reduce((collection, element) => {
            return [...collection, ...QLite.find(query, element, false)]
        }, [])
        return new QLiteCollection(...result)
    }

    forEach = (callback) => {
        super.forEach(item => {
            callback(item.get())
        })
    }

    some = (callback) => {
        super.some(item => {
            return callback(item.get())
        })
    }
}

export { QLiteCollection }
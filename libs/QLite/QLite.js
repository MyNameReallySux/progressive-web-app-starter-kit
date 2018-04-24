import { isArray, isNumber, isString } from "@beautiful-code/type-utils";

import QLiteNode from './QLiteNode'
import QLiteCollection from './QLiteCollection'


export default class QLite {
	static lastQuery = ''
    static lastSelection = []
    static lastResult = []
    static lastSelectionIndex = 0
    
    static documentRoot = document

	static PATTERNS = {
		ID: /#[a-zA-Z][a-zA-Z0-9\-\_\:\.]+/g,
		CLASS: /\.[a-zA-Z][a-zA-Z0-9\-\_\:\.]+/g,
		ATTR: /\[[a-zA-Z][a-zA-Z0-9\-\_\:\.]+=((\"([^"]*)\"+)|(\'([^']*)\'+))?\]/g,
		COMPLEX: /^(.*\s+.*)+$/g
	}

	static getQueryType = (query) => {
		if(QLite.PATTERNS.ID.test(query)) return 'id'
		if(QLite.PATTERNS.CLASS.test(query)) return 'class'
		if(QLite.PATTERNS.ATTR.test(query)) return 'attribute'
		if(QLite.PATTERNS.COMPLEX.test(query)) return 'complex'
		return 'unknown'
	}

	static find = (query, context = document, single = true) => {
        console.log(query)
		let sameQuery = query == QLite.lastQuery
		QLite.lastQuery = query

        let type = QLite.getQueryType(query)
        let result, selection

		if(sameQuery){
            selection = QLite.lastSelection
            if(single && lastSelection){
                let currentIndex = QLite.lastSelectionIndex++

                if(currentIndex >= this.lastSelection.length){
                    QLite.lastSelectionIndex = currentIndex = 0
                } 
                result = new QLiteNode(QLite.lastSelection[currentIndex])
            } else {
                result = new QLiteCollection(QLite.lastSelection)
            }
		} else {
            switch(type){
                case 'id': {
                    selection = QLite.documentRoot.getElementById(query.substr(1))
                    if(single){
                        result = selection && selection !== null 
                        ? new QLiteNode(selection) 
                        : undefined
                    } else {
                        result = selection && selection !== null 
                        ? new QLiteCollection(selection) 
                        : new QLiteCollection()
                    }
                    
                } break
                case 'class':
                case 'attr':
                default: {
                    selection = [].slice.call(QLite.documentRoot.querySelectorAll(query))
                    if(single){
                        result = selection && selection !== null
                        ? new QLiteNode(selection[0]) 
                        : undefined
                    } else {
                        result = selection && selection !== null
                        ? new QLiteCollection(...selection) 
                        : new QLiteCollection()
                    }
                }
            }
        }

        if(!single) QLite.lastSelectionIndex = 0
        if(selection) QLite.lastSelection = selection
        if(result) QLite.lastResult = result
        
        return result
    }
    
    static findAll = (query, context) => QLite.find(query, context, false)
    static select = (query) => QLite.find(query, QLite.documentRoot, true)
    static selectAll = (query) => QLite.find(query, QLite.documentRoot, false)

    static q = (query) => {
        if(isString(query)){
            return QLite.find(query, QLite.documentRoot, false)
        } else if(query instanceof QLiteNode || query instanceof QLiteCollection){
            return query
        } else if(query instanceof Node){
            return new QLiteNode(query)
        } else if(isArray(query)){
            return new QLiteCollection(query)
        }
    }
}

let { q } = QLite
export { q }
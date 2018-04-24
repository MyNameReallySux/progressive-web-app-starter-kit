import QLite from './QLite'
import { isArray, isNumber, isString } from "@beautiful-code/type-utils";

export default class QLiteNode extends Node {
    constructor(node){
        super()
        this.node = node  
    }

    attr = (name, value) => {
        if(name && value) this.node.setAttribute(name, value)
        else if(name && value === '') this.node.removeAttribute(name)
        else if(name) return this.node.getAttribute(name)
    }

    find = query => QLite.find(query, this.node, false)

    get = () => this.node

    html = (value) => {
        let { nodeType, innerHTML, nodeValue } = this.node

        if(!nodeType) throw Error(`Trying to ${value ? 'set html of' : 'get html from'} an object that does not inherit 'Node'.`)
        switch(nodeType){
            case Node.ELEMENT_NODE: {
                if(value){
                    this.node.innerHTML = value
                }
                else if(isString(innerHTML)) {
                    return innerHTML
                } else {
                    return ''
                }
            } break
            default: {
                throw Error(`Trying to ${value ? 'set html of' : 'get html from'} a 'Node' instance that is not a valid 'nodeType', node type - '${nodeType}'.`)
            }
        }
    }

    after = (content) => {
        if(!this.node || !content) return

        if(isString(content)){
            let htmlPattern = /<[a-z][\s\S]*>/
            let isHtml = htmlPattern.test(content)
            if(isHtml){
                this.node.insertAdjacentHTML('afterend', content)
            } else {
                this.node.insertAdjacentText('afterend', content)
            }
        } else {
            let element
            if(content instanceof QLiteNode){
                element = content.get()
            } else if(content instanceof Node){
                element = content
            }
            this.node.insertAdjacentElement('afterend', element)
        }
    }

    text = (value) => {
        let { nodeType, textContent, nodeValue } = this.node

        if(!nodeType) throw Error(`Trying to ${value ? 'set text of' : 'get text from'} an object that does not inherit 'Node'.`)
        switch(nodeType){
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_NODE:
            case  Node.DOCUMENT_FRAGMENT_NODE: {
                if(isString(textContent)){
                    return textContent
                }
            } break
            default: {
                throw Error(`Trying to ${value ? 'set text of' : 'get text from'} a 'Node' instance that is not a valid 'nodeType', node type - '${nodeType}'.`)
            }
        }

        
        if(nodeType === Node.ELEMENT_NODE
            || nodeType === Node.DOCUMENT_NODE
            || nodeType === Node.DOCUMENT_FRAGMENT_NODE){
            if(isString(textContent)){
                return textContent
            }
        } else if(nodeType === Node.TEXT_NODE
            || nodeType === Node.CDATA_SECTION_NODE){ // TODO: Should remove CDATA?
            if(isString(nodeValue)){
                return nodeValue
            }
        }
        return ''
    }
}

export { QLiteNode }
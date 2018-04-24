import { applyMiddleware, compose, createStore } from "redux";
import { moduleToReducer } from "redux-box"
import createSagaMiddleware from 'redux-saga'

import { LocalStorageManager as LS } from '@libs/cache/LocalStorageManager'
import { getCombinedReducer, initializeSagas } from '@utils'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let subscribeTimeout

export function getCombinedEnhancer(middlewares){
    return composeEnhancers(applyMiddleware(...middlewares))
}

export function getPersistedState(modules){
    let names = modules.map(mod => mod.name)
    return LS.loadStates(names)
}

export function initializeCache(store, modules){
    let names = modules.map(mod => mod.name)

    store.subscribe(() => {
        clearTimeout(subscribeTimeout)
        subscribeTimeout = setTimeout(() => {
            let state = store.getState()
            let statesToSave = {}
            names.map(name => { if(name) statesToSave[name] = state[name] })
            LS.saveStates(statesToSave)
        }, 1000) 
    })
}

export function initializeStore(allModules, middleware){
    const modules = Object.values(allModules)
    const saga = createSagaMiddleware()

    const enhancer = getCombinedEnhancer([saga, ...middleware])
    const persistedState = getPersistedState(modules)
    const reducer = getCombinedReducer(modules)

    const store = createStore(reducer, persistedState, enhancer)
    initializeCache(store, modules)
    initializeSagas(saga, store, modules)

    return store
}
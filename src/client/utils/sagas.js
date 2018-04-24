import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'

let STORE

export function convertReactionsToSagas(reactions){
    let sagas = Object.entries(reactions).map(([type, reaction]) => {
        let converted = onAction(type, reaction)
        return converted 
    })
    return sagas
}

export function initializeSagas(sagaMiddleware, store, modules){
    setSagaStore(store)
    const allSagas = modules.map(mod => mod.sagas)

    allSagas.forEach((sagas) => {
        sagas.forEach((saga) => {
            sagaMiddleware.run(saga)
        })
    })
}

export function onAction(type, callback){
    return function* onActionSaga(){
        if(!STORE) throw new Error(`Redux store has not been initialized. Make sure to set store with 'setStore'.`)
        yield takeEvery(type, () => {
            let dispatch = STORE.dispatch
            let reload = STORE.getState
            callback(STORE, reload, dispatch)
        })
    }
}

export function setSagaStore(store){
    if(STORE) throw new Error(`Already set store. 'setSagaStore' should only be called once.`)
    STORE = store
}
import '@babel/polyfill'
import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'
polyfill()

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from '@components/App'

// import store from '@core/store'

if('serviceWorker' in navigator){
    window.addEventListener('load', async function(){
        const reg = await navigator.serviceWorker.register(`admin.sw.js`)
    })
}

ReactDOM.render(
    // <Provider store={store}>
            
        <App></App>,
    // </Provider>
    document.getElementById('app')
)

// let Messenger = {
//     sendMessage: (reg, message) => {
//         reg.active.postMessage(message)
//     }
// }
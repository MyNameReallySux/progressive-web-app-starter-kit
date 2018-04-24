import '@babel/polyfill'
import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'
polyfill()

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '@components/App'

import store from '@core/store'

import '@images/beautiful-code-logo.svg'

if('serviceWorker' in navigator){
    window.addEventListener('load', async function(){
        const reg = await navigator.serviceWorker.register(`workbox.sw.js`)
    })
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App></App>
        </Router>
    </Provider>,
    document.getElementById('app')
)

// let Messenger = {
//     sendMessage: (reg, message) => {
//         reg.active.postMessage(message)
//     }
// }
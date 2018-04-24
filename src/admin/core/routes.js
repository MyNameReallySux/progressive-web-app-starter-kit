import React from 'react'
import PropTypes from 'prop-types'
import RouteFactory from '@libs/RouteFactory'

import * as Pages from '@pages'

const Route = (path, label, component, children, options) => (
    Object.assign({}, options, { path, label, component, children })
)

const Redirect = (path, redirect, children, options) => (
    Object.assign({}, options, { path, redirect, children })
)

let routeMap = {
    // index:       Redirect('/', '/dashboard', undefined, { exact: true }),
    index:       Route('/', 'Home', Pages.Dashboard, undefined, { exact: true }),
    dashboard:   Route('/dashboard', 'Dashboard', Pages.Dashboard),
    settings:    Route('/settings',  'Settings', Pages.Settings, {
        accounts:   Route('/account',  'Account', Pages.Settings)
    })
}

let rf = new RouteFactory(routeMap)
let AllLinks = rf.getLinks()
let AllRoutes = rf.getRoutes()

export { AllLinks, AllRoutes }
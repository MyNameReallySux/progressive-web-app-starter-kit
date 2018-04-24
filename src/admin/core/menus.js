import React from 'react'

import { AllLinks } from '@core/routes'

import { Home as HomeIcon } from '@material-ui/icons'
import { Dashboard as DashboardIcon } from '@material-ui/icons'
import { Settings as SettingsIcon } from '@material-ui/icons'

const MenuLink = (link, icon, children, options = {}) => {
    return Object.assign({}, options, { link, icon, children })
}

let main = [
    MenuLink(AllLinks.index, HomeIcon),
    MenuLink(AllLinks.dashboard, DashboardIcon),
    MenuLink(AllLinks.settings, SettingsIcon)
]

export { main as mainMenu }
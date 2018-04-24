import React from 'react';
import PropTypes from 'prop-types'

import NavigationMenu from '@components/navigation/NavigationMenu'
import Routes from '@core/routes'

export default class Header extends React.Component {
    render = () => (
        <NavigationMenu
            routes={Routes} 
            ref={(menu) => {this.menu = menu}}>
        </NavigationMenu>
    )
}

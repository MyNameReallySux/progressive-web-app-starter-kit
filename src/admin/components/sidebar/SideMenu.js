import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import SideContainer from '@components/sidebar/SideContainer'
import Menu from '@components/navigation/Menu'

const sideMenuStyles = theme => ({
    root: {
        paddingTop: '0px',
        paddingBottom: '0px',
    },
    menu: {}  
})
const SideMenu = withStyles(sideMenuStyles)(({ children, classes, rootClassName, menuClassName, ...props }) => (<>
    <SideContainer className={rootClassName ? `${rootClassName} ${classes.root}` : classes.root }>
        <Menu className={menuClassName ? `${menuClassName} ${classes.menu}` : classes.menu } { ...props }>
            { children }
        </Menu>
    </SideContainer>
</>))

export default SideMenu

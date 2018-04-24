import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import SideContainer from '@components/sidebar/SideContainer'
import Logo from '@components/brand/Logo'

const SideLogoStyles = theme => ({
    root: {
     
    }
})
const SideLogo = withStyles(SideLogoStyles)(({ children, classes, ...props }) => (<>
    <SideContainer className={classes.root}>
        <Logo { ...props }>
            { children }
        </Logo>
    </SideContainer>
</>))

export default SideLogo

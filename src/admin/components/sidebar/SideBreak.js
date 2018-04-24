import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import SideContainer from '@components/sidebar/SideContainer'
import Break from '@components/layout/Break'

const SideBreakStyles = theme => ({
    root: {
        paddingTop: 0,
        paddingBottom: 0
    }
})
const SideBreak = withStyles(SideBreakStyles)(({ children, classes, ...props }) => (<>
    <SideContainer className={classes.root}>
        <Break { ...props } />
    </SideContainer>
</>))

export default SideBreak

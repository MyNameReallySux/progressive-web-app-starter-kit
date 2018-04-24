import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

const SideContainerStyles = theme => ({
    root: {
        padding: theme.spacing.medium,
        '& + $root': {
            paddingTop: 0
        }
    }
})

const SideContainer = withStyles(SideContainerStyles)(({ children, classes, className }) => (<>
    <div className={className ? `${className} ${classes.root}` : classes.root }>
        { children }
    </div>
</>))

export default SideContainer

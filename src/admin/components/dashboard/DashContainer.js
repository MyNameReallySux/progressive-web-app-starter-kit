import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

const containerStyles = theme => ({
    root: {
        paddingLeft: theme.custom.sidebar.width,
    },
    container: {
        padding: theme.spacing.large
    }
})
export default withStyles(containerStyles)(({ classes, children }) => (
    <main className={classes.root}>
        <div className={classes.container}>
            { children }
        </div>
       
    </main>
))


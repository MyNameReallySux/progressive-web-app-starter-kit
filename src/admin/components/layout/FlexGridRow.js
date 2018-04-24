import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

@withStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: -theme.custom.grid.gutter / 2,
        marginLeft: -theme.custom.grid.gutter / 2,
        '& + *': {
            marginTop: theme.custom.grid.gutter
        }
    }
}))
export default class FlexGridRow extends React.Component { 
    render = () => {
        let { children, classes } = this.props

        return (
            <div className={classes.root}>
                { children }
            </div>
        )
    }
}
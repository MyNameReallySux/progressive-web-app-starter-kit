import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

@withStyles(theme => ({
    root: {
        flex: '1 0 auto',
        paddingLeft: theme.custom.grid.gutter / 2,
        paddingRight: theme.custom.grid.gutter / 2,
    }
}))
export default class FlexGridItem extends React.Component { 
    render = () => {
        let { children, classes, theme } = this.props

        return (
            <div className={classes.root}>
                { children }
            </div>
        )
    }
}
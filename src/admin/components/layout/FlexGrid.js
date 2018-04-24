
import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

@withStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
}))
export default class FlexGrid extends React.Component {
    render = () => {
        let { children, classes, theme } = this.props
        return (
            <div className={classes.root}>
                { children }
            </div>
        )
    }
}
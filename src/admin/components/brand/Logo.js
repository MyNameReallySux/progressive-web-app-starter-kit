import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

@withStyles(theme => ({
    root: {
        display: 'flex',
        lineHeight: '40px'
    },
    image: {
        display: 'block',
        marginRight: theme.spacing.medium,
        width: 'auto',
        maxHeight: 40
    },
    text: {
        flexGrow: 1,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSizes.medium,
        fontWeight: theme.typography.fontWeightNormal
    }
}))
export default class Logo extends React.Component {
    render = () => {
        let { children, classes, image } = this.props
        return (
            <div className={classes.root}>
                <img src={image} className={classes.image} />
                <div className={classes.text}>
                    { children }
                </div>
            </div>)

    }
}
import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

import { RelativeContent, Overlay } from '@components/media'

import sidebarImage from '@assets/images/sidebar-03.jpg'

@withStyles(theme => {
    console.log(theme)
    return { root: {}}
})
class PrintTheme extends React.Component {
    render = () => (<div className={this.props.classes.root}></div>)
}

@withStyles(theme => ({
    root: {
        position: 'fixed',
        top: '0px',
        width: theme.custom.sidebar.width,
        height: '100%',

        color: theme.palette.getContrastText(theme.palette.common.dark),
        backgroundColor: theme.palette.common.dark,
        backgroundImage: `url('${sidebarImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
}))
export default class DashSidebar extends React.Component {
    state = {
        loggedIn: false,
        menu: {
            open: false
        }
    }

    render = () => {
        let { handleMenuClose, handleMenuToggle } = this
        let { classes, children } = this.props

        return (<>
            <PrintTheme />
            <Paper className={classes.root}>
                <Overlay />
                <RelativeContent>
                    { children }
                </RelativeContent>
            </Paper>
        </>)
    }
}
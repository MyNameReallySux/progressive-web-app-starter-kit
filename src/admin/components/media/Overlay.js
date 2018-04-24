import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

const overlayStyles = theme => ({
    root: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',

        backgroundColor: theme.palette.common.dark,
    }
})
const Overlay = withStyles(overlayStyles)(({ classes, opacity, zIndex }) => (
    <div 
        className={classes.root} 
        style={{ opacity, zIndex }} />
))
Overlay.defaultProps = { 
    opacity: 0.8,
    zIndex: 1,
}
Overlay.propTypes = { 
    opacity: PropTypes.number,
    zIndex: PropTypes.number
}

export default Overlay
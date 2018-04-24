import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

const contentStyles = theme => ({
    root: {
        position: 'relative',
    }
})
const RelativeContent = withStyles(contentStyles)(({ classes, zIndex, children }) => (
    <div 
        className={classes.root} 
        style={{ zIndex }}>
        { children }
    </div>
))
RelativeContent.defaultProps = { 
    zIndex: 2,
}
RelativeContent.propTypes = { 
    zIndex: PropTypes.number
}

export default RelativeContent
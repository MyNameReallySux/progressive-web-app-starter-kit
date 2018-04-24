import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import theme from '@core/theme'

const Break = ({ width, thickness, color, variant, margin, marginTop, marginBottom, container }) => {
    const variantStyles = {
        solid: {
            borderStyle: 'solid',
            borderWidth: 0,
            borderTopWidth: thickness,
        },
        double: {
            width: width,
            borderWidth: 0,
            borderStyle: 'solid',
            borderTopWidth: thickness,
        }
    }

    if(marginTop === undefined && margin) marginTop = margin
    if(marginBottom  === undefined && margin) marginBottom = margin 

    let variantStyle = variantStyles[variant] || variantStyles['solid']
    let commonStyle = {
        borderColor: color,
        width, marginTop, marginBottom
    }

    let style = Object.assign({}, variantStyle, commonStyle)

    if(container){
        let Container = container
        return (<Container>
            <hr style={style} />
        </Container>)
    } else {
        return (<>
            <hr style={style} />
        </>)
    }
}

Break.defaultProps = {
    width: '100%',
    thickness: 1,
    color: 'rgba(255, 255, 255, 0.2)',
    margin: theme.custom.break.margins,
    variant: 'solid',
}

export default Break
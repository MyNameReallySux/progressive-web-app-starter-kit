import { createMuiTheme } from 'material-ui/styles'

import deepPurple from 'material-ui/colors/deepPurple'
import cyan from 'material-ui/colors/cyan'
import grey from 'material-ui/colors/grey'

export default createMuiTheme({
    palette: {
        common: {
            light: grey[100],
            dark: grey[900]
        },
        primary: deepPurple,
        secondary: cyan
    },
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: 6
            }
        }
    },
    typography: {
        fontSizes: {
            tiny: '0.354rem',
            mini: '0.5rem',
            small: '0.707rem',
            unit: '1rem',
            medium: '1.414rem',
            large: '1.999rem',
            huge: '2.827rem',
            giga: '3.998rem'
        }
    },
    spacing: {
        tiny: 1,
        mini: 2,
        small: 4,
        unit: 8,
        medium: 16,
        large: 32,
        huge: 64,
        giga: 128
    },
    custom: {
        break: {
            margins: 16
        },
        grid: {
            gutter: 16,
            inset: 16
        },
        sidebar: {
            width: 260
        }
    }
})
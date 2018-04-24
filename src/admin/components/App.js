import React from 'react'
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { connectStore } from "redux-box"

import { MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import theme from '@core/theme'

import MasterLayout from '@layouts/master'
import { loadFonts } from '@libs/AsyncMedia'

// import { module as AppModule } from '@modules/app'

// @connectStore({
//     app: AppModule
// })
export default class App extends React.Component {
    componentDidMount(){
        loadFonts()
    }

    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            // let { setCurrentRoute } = this.props.app
            // let { pathname } = this.props.location
            // this.props.app.setCurrentRoute(pathname)
        }
    }

    render = () => (
        <Router basename='/admin'>
            <CssBaseline>
                <MuiThemeProvider theme={theme}>
                    <MasterLayout />
                </MuiThemeProvider>
            </CssBaseline>
        </Router>
    )
}


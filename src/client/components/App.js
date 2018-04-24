import React from 'react'
import { withRouter } from 'react-router-dom';
import { connectStore } from "redux-box";

import MasterLayout from '@layouts/master'

import { module as AppModule } from '@modules/app'

@withRouter
@connectStore({
    app: AppModule
})
export default class App extends React.Component {
    componentWillMount(){
        this.props.app.init()
    }

    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location) {
            let { setCurrentRoute } = this.props.app
            let { pathname } = this.props.location
            console.log(this.props)
            this.props.app.setCurrentRoute(pathname)
        }
    }

    render = () => (
        <MasterLayout />
    )
}


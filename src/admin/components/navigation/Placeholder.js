import React from 'react'

import { Switch } from 'react-router-dom'

export default class Placeholder extends React.Component {
    render = () => {
        let { items } = this.props
        return (
            <Switch>
                { 
                    items.map(({
                        data, props,
                        type: Route
                    }) => (
                        <Route { ...props} key={data.id}/>
                    ))
                }
            </Switch>
        )   
    }
}
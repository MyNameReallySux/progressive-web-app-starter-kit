import React from 'react'
import Types from 'prop-types'

import { Switch, Link, Route, BrowserRouter } from 'react-router-dom'
import { clean } from '@beautiful-code/object-utils'

import RouteAware from '@components/navigation/RouteAware'

class Placeholder extends RouteAware {
	static propTypes = {
		onChangeRoute: Types.func,
		routes: Types.object.isRequired
	}
	static defaultProps = {
		onChangeRoute: () => {},
		routes: {}
	}

	state = {
		routes: []
	}

	constructor(props){
		super(props)
		this.initRoutesMap(props.routes)
	}
	
	initRoutesMap = (routes) => {
		routes = this.setAllRouteDefaults(routes)
		Object.entries(routes).forEach(([name, route]) => {
			this.convertToRoute(route, undefined)
		})
	}
	
	convertToRoute = (route, parent = '') => {
		route = clean(route)

		let { path, children, id, onEnter, ...otherProps } = route

		let fullPath = parent + path
		let hasChildren = children && Object.keys(children).length > 0

		if(hasChildren){
			Object.entries(route.children).forEach(([name, child]) => {
				this.convertToRoute(child, fullPath)
			})
		}

		this.state.routes.push(<Route path={fullPath} { ...otherProps } key={id} />)
	}
	
	render(){
		return(
			<Switch>
				{this.state.routes}
			</Switch>	
		)
	}
}

export default Placeholder
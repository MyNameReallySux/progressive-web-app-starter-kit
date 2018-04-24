import React from 'react'
import { toCamelCase } from '@beautiful-code/string-utils'
import { clean } from '@beautiful-code/object-utils'

export default class RouteAware extends React.Component {
	constructor(props){
		super(props)
	}
	
	setAllRouteDefaults(routes){
		for(let key of Object.keys(routes)){
			let route = clean(routes[key])
			route = this.setRouteDefaults(key, route)
			
			let hasChildren = route.hasOwnProperty('children')
				&& Object.keys(route.children).length > 0
			
			if(hasChildren){
				this.setAllRouteDefaults(route.children)
			}
			routes[key] = route
		}
		return routes
	}
	
	setRouteDefaults(key, route){
		key = key.toLowerCase()

		route.path = 	route.path  	|| `/${key}`
		route.label = 	route.label 	|| `${toCamelCase(key, true)}`
		route.id = 		route.id 		|| `${toCamelCase(route.label, true)}Page`
		route.exact =	route.exact 	|| false
		route.onEnter = route.onEnter 	|| function(){}

		return route
	}
}

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch } from 'react-router-dom'
import { StringUtils } from '@beautiful-code/string-utils'

import RouteAware from './RouteAware'

export default class NavigationMenu extends RouteAware {
	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
		activeClass: PropTypes.string
	}

	static defaultProps = {
		className: 'nav-menu',
		activeClass: 'open'
	}

	constructor(props){
		super(props)
		
		this.state = {
			items: [],
			active: props.active,
			activeClass: props.activeClass
		}
		
	}
	
	componentWillMount(){
		this.initMenu(this.props.routes)
	}
	
	initMenu(routes){
		routes = this.setAllRouteDefaults(routes)
		Object.entries(routes).forEach(([name, route]) => {
			this.state.items.push(this.convertToLink(route, undefined))
		})
	}
	
	convertToLink(route, parent = ''){
		

		let { path, children, id, label } = route

		let fullPath = parent + path
		let hasChildren = children && Object.keys(route.children).length > 0

		let childLinks = []
		if(hasChildren){
			Object.entries(route.children).forEach(([name, child]) => {
				childLinks.push(this.convertToLink(child, fullPath))
			})
		}

		return (
			<li key={id}>
				<Link to={fullPath}>{ label }</Link>
				{ hasChildren &&
					<ul>
						{ childLinks }
					</ul>
				}
			</li>
		)
	}
	
	render(){
		let classes = this.props.className.split(' ')
		this.state.active && classes.push(this.props.activeClass)
		
		return(
			<div id={this.props.id}
				 className={classes.join(' ')}>
				<ul>
					{this.state.items}
				</ul>
			</div>
		)
	}
}
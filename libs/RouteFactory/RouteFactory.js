import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Link, Route, Redirect } from 'react-router-dom'

import { clean, size } from '@beautiful-code/object-utils'
import { isObject } from '@beautiful-code/type-utils'
import { toCamelCase } from '@beautiful-code/string-utils'

export default class RouteFactory {
    constructor(routes){
        this.routes = this.setAllRouteDefaults(routes)
    }

    getRouteDefaults = (key) => {
        key = key.toLowerCase()
        return {
            path: `/${key}`,
            redirect: false,
            label: `${toCamelCase(key, true)}`,
            id: `${toCamelCase(key, true)}Page`,
            exact: false
        }
    }

    setAllRouteDefaults = (routes) => {
        return Object.entries(routes).reduce((collection, [key, route]) => {
            route.childRoutes = route.children
            route.children = undefined
            route = clean(route)

            let routeDefaults = this.setRouteDefaults(key, route)
            route = Object.assign({}, routeDefaults, route)

            let { childRoutes } = route
            let hasChildren =  isObject(childRoutes) && size(childRoutes) > 0

            childRoutes = hasChildren 
                ? this.setAllRouteDefaults(childRoutes) 
                : undefined


            collection[key] = route
            return collection
        }, {})
    }

    setRouteDefaults = (key, route) => {
        let defaults = this.getRouteDefaults(key)
        return Object.assign({}, route, defaults)
    }

    getLink = (route, parent = '') => {
        let { childRoutes, id, path, label, ...otherProps } = route
        let fullPath = `${parent}${path}`

        let hasChildren = isObject(childRoutes) && size(childRoutes) > 0

        childRoutes = hasChildren 
            ? this.getLinks(childRoutes, fullPath) 
            : undefined

        return {
            type: Link,
            data: { childRoutes, label, id },
            props: {
                to: fullPath,
            }
            
        }
    }

    getLinks = (routes, parent = '') => {
        if(!routes) routes = this.routes

        return Object.entries(routes).reduce((collection, [key, route]) => {
            collection[key] = this.getLink(route, parent)
            return collection
        }, {})
    }

    getRoute = (route, parent = '') => {
        let { childRoutes, component, exact, id, path, redirect, ...otherProps } = route
        let fullPath = `${parent}${path}`

        let hasChildren = isObject(childRoutes) && size(childRoutes) > 0

        childRoutes = hasChildren 
            ? this.getLinks(childRoutes, fullPath) 
            : undefined

        if(redirect){
            return {
                type: Redirect,
                data: { childRoutes, id, },
                props: {
                    from: fullPath, 
                    to: redirect, 
                    exact
                }
            }
        } else if(component){
            return {
                type: Route,
                data: { childRoutes, id, },
                props: {
                    component, exact,
                    path: fullPath
                }
            } 
        }

    }
    
    getRoutes = (routes, parent = '') => {
        if(!routes) routes = this.routes
        return Object.entries(routes).reduce((collection, [key, route]) => {
            collection[key] = this.getRoute(route, parent)
            return collection
        }, {})
    }
}
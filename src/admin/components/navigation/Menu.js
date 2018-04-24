import React from 'react'

import { withStyles } from 'material-ui/styles'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'

@withStyles(theme => ({
    menu: {
        padding: 0
    },
    link: {
        textDecoration: 'none'
    },
    menuItem: {
        color: theme.palette.getContrastText(theme.palette.common.dark),
        borderRadius: theme.spacing.small,
        

        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '& $icon, & $primary': {
            color: theme.palette.getContrastText(theme.palette.common.dark)
        },
    },
    icon: { marginRight: '0px' },
    primary: { paddingLeft: theme.spacing.unit }
}))
export default class Menu extends React.Component {
    render = () => {
        let { classes, items } = this.props
        return (
            <MenuList className={classes.menu}>
                { 
                    items.map((item, i) => {
                        let { link, icon: Icon } = item
                        let { props, data, type: Link } = link

                        return (
                            <Link className={classes.link} {...props} key={data.id}>
                                <MenuItem className={classes.menuItem}> 
                                    <ListItemIcon className={classes.icon}>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ primary: classes.primary }}
                                        primary={data.label} />
                                </MenuItem>
                            </Link>
                        )
                    })
                    
                }
            </MenuList>
        )   
    }
}
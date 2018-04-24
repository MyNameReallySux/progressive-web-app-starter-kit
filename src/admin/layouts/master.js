import React from 'react'

// import Placeholder from '@components/navigation/placeholder' 

import DashContainer from '@components/dashboard/DashContainer' 
import DashSidebar from '@components/dashboard/DashSidebar' 
import SideContainer from '@components/sidebar/SideContainer'
import SideMenu from '@components/sidebar/SideMenu'
import SideLogo from '@components/sidebar/SideLogo'

import Placeholder from '@components/navigation/Placeholder'
import Menu from '@components/navigation/Menu'

import Break from '@components/layout/Break'

import { mainMenu } from '@core/menus'
import { AllRoutes } from '@core/routes'

import Avatar from 'material-ui/Avatar'
import avatarImage from '@assets/images/me.jpg'
import logoImage from '@assets/icon.png'

import Typography from 'material-ui/Typography'
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel'
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

let routesToHandle = ['index', 'dashboard', 'settings']
let routes = routesToHandle.map(key => AllRoutes[key])

import theme from '@core/theme'


export default class MasterLayout extends React.Component {
    render = () => (
        <>
            <DashSidebar>
                <SideLogo image={logoImage}>
                    PWA Starter Kit
                </SideLogo>
                <SideContainer>
                    <Break marginTop={0} />
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Avatar src={avatarImage} alt='Chris Coppola' />
                            <Typography style={{
                                lineHeight: '40px'
                            }}>Chris Coppola</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Menu items={mainMenu} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    
                    <Break marginBottom={0} />
                </SideContainer> 
                
                <SideMenu items={mainMenu} />
            </DashSidebar>
            <DashContainer>
                <Placeholder items={routes} />
            </DashContainer>   
        </>
    )
}
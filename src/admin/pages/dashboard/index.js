import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'

import { FlexGrid, FlexGridRow, FlexGridItem } from '@components/layout'
import BarChart from '@components/charts/BarChart'

export default class Home extends React.Component {
    render = () => (
        <>
            <FlexGrid>
                <FlexGridRow>
                    <DashboardCard>
                        <FlexGrid>
                            <FlexGridRow>
                                <FlexGridItem>
                                    <Typography variant='headline'>Welcome to the PWA Admin Console</Typography>
                                    <Typography>Get started customizing your blog!</Typography>
                                </FlexGridItem>
                            </FlexGridRow>
                        </FlexGrid>
                    </DashboardCard>
                </FlexGridRow>
                <FlexGridRow>
                    <FlexGridItem>
                        <Paper>
                            <BarChart />
                        </Paper>
                    </FlexGridItem>
                    <FlexGridItem>
                        <Paper>Test</Paper>
                    </FlexGridItem>
                    <FlexGridItem>
                        <Paper>Test</Paper>
                    </FlexGridItem>
                </FlexGridRow>
            </FlexGrid>
        </>
    )
}

@withStyles(theme => ({
    root: {},
    paper: {
        padding: theme.custom.grid.inset
    }
}))
class DashboardCard extends React.Component {
    render = () => {
        let { children, classes } = this.props
        return (
            <FlexGridItem className={classes.root}>
                <Paper className={classes.paper}>{ children }</Paper>
            </FlexGridItem>
        )
    }
}

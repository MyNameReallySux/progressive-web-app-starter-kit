import React from 'react'
import Placeholder from '@components/navigation/placeholder' 
import Header from './partials/header' 

import Routes from '@assets/routes'

export default class MasterLayout extends React.Component {
    render = () => (
        <>
            <Header></Header>
            <main role='main'>
                <Placeholder routes={Routes}></Placeholder>
            </main>
        </>
    )
}
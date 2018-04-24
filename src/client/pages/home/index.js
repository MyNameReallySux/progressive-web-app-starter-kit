import React from 'react'

export default class Home extends React.Component {
    render = () => (
        <>
            <h2>Home Page</h2>
            <div className="container">
                <ul>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
                <div 
                    data-ratio='1170x750' 
                    data-src='https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'></div>
                <img data-src='https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'/>
                <svg data-src='/assets/images/beautiful-code-logo.svg'></svg>
            </div>
        </>
    )
}
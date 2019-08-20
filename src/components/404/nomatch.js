import React from 'react';
import Header from '../shared/header';
import image from '../../constants/image';
import { Link } from 'react-router-dom'
import { Container } from '@material-ui/core';
export default function NoMatch({ location }) {
    console.log("location", location)
    return (
        <>
            <div className="backSplash">
                <Container className="loginSignup h-100 dashboard" >
                    <Header heading="No match Found" back="d-none" menu="d-none" />
                    <div className="flex align-items-center justify-content-center" style={{ height: '80vh', flexDirection: 'column' }}>
                        <div className="noMatch text-center">
                            <h3 className="color-primary">OOPS!</h3>
                            <p className="color-grey">Page not found</p>
                            <img src={image.noMatch} />
                            <div className="h-45"></div>
                            <div className="text-center btnSpace_Login" >
                                <Link to='/' type="button" className="btnPrimary">oK</Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
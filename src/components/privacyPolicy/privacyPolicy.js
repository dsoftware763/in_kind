import React from 'react';
import {Grid,Container} from '@material-ui/core';
import { Link } from 'react-router-dom';
import image from '../../constants/image';
export default class PrivacyPolicy extends React.Component {
    render() {
        return (
            <>
                <div className="backSplash">
                    <Container className=" h-100 flex align-items-center">
                        <div className="boxLogin p-0">
                            <div className="loginHeader flex align-items-center pl-15">
                                <Link to="/login"><img src={image.backIcon} alt="prvious page" width="25px" /></Link>
                                <h4 className="donation-heading">Terms of Services & Privacy Policy</h4>
                            </div>
                            <div className="organizationSelect causeArea">
                                <p className="color-label fontWeight-600 pb-15">Terms of Services & Privacy Policy</p>
                                <p className="font-13 color-grey mb-15" style={{lineHeight:'20px'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking 
                                    at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
                                    as opposed to using 'Content here, content here', making it look like readable English</p>
                                <p className="font-13 color-grey mb-15" style={{lineHeight:'20px'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking 
                                    at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                     as opposed to using 'Content here, content here', making it look like readable English</p>
                                <p className="font-13 color-grey mb-15" style={{lineHeight:'20px'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking
                                     at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                      as opposed to using 'Content here, content here', making it look like readable English</p>
                                <p className="font-13 color-grey mb-15" style={{lineHeight:'20px'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking 
                                    at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
                                    as opposed to using 'Content here, content here', making it look like readable English</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
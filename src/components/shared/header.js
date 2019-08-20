import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import image from '../../constants/image';
import * as routes from '../../constants/routes';
import Logout from '../logout/logout';

class Header extends React.Component {
    state = {
        open: false,
        openToggle: false
    }
    toggleDrawerOpen = () => {
        this.setState({
            openToggle: true,
        })
    }
    toggleDrawerClose = () => {
        this.setState({
            openToggle: false,
        })
    }
    handleClickOpen = () => {
        this.setState({
            open: true,
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
        })
    }
    render() {
        return (
            <div className="loginHeader flex align-items-center pl-15 pl-xs-0" style={{ justifyContent: "unset" }}>
                <Link to={this.props.redirectUrl}  className={this.props.back}><img className="MuiButton-text" width="25px" src={image.backIcon} alt="back" /> </Link>
                <Button onClick={this.handleClickOpen} style={{ paddingBottom: "15px" }} className={this.props.menu}><img src={image.homeButton} alt="menu" width="20px" /></Button>
                <Drawer open={this.state.open} onClose={this.handleClose} className="drawerBack">
                    <div tabIndex={0} role="button" onClick={this.handleClose} onKeyDown={this.handleClose} className="text-center" >
                        <div className="logo ">
                            <img src={image.logoWhite} alt="logo" />
                        </div>
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link to={routes.HOME}>Home</Link>
                                </li>
                                <li>
                                    <Link to={routes.POST}>Post</Link>
                                </li>
                                <li>
                                    <Link to={routes.HOME}>FAQ</Link>
                                </li>
                                <li>
                                    <Link to={routes.FEEDBACK}>Feedback</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="logoutBtn">
                        <div className="text-center btnSpace_Login">
                            <Button type="button" className="btnPrimary" onClick={this.toggleDrawerOpen}>Log Out</Button>
                        </div>
                        <Logout open={this.state.openToggle} onClose={this.toggleDrawerClose}
                            text="Are you sure you want to logOut" />
                    </div>
                </Drawer>
                <h4 className="donation-heading" style={{ paddingBottom: "15px" }}>{this.props.heading}</h4>
            </div>
        )
    }
}
export default Header;

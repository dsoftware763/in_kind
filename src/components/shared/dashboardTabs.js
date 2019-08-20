import React from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';
import image from '../../constants/image';
function DashboardTabs() {
  return (
    <div className="footerMenu">
      <ul className="navMenu flex align-items-center justify-content-center">
        <li><NavLink to={routes.HOME} activeClassName="active"><img src={image.homeIcon} alt="home" className="iconTab" />
              <img src={image.homeActiveIcon} alt="home_active" className="activeTab" />Home</NavLink></li>
        <li><NavLink to={routes.DONATIONS} activeClassName="active"><img src={image.donationIcon} alt="donation" className="iconTab" />
              <img src={image.donationActiveIcon} alt="donation_active" className="activeTab" />Donations</NavLink></li>
        <li><NavLink to={routes.POST} activeClassName="active" className="p-0 postLink"><img src={image.postIcon} width="55px" className="postDashboard" alt="donation" /></NavLink></li>
        <li><NavLink to={routes.PROFILE} activeClassName="active"><img src={image.profileIcon} alt="profile" className="iconTab" />
              <img src={image.profileActiveIcon} alt="profile_active" className="activeTab" />Profile</NavLink></li>
        <li><NavLink to={routes.MESSAGE} activeClassName="active"><img src={image.messageIcon} alt="message" className="iconTab" />
              <img src={image.messageActiveIcon} alt="message_active" className="activeTab" />Message</NavLink></li>
      </ul>
    </div>
  )
}
export default DashboardTabs;
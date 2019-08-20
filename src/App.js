import React from 'react';
import UserSelectType from './components/userSelectType/userSelectType';
import LoginSignup from './components/loginSignup/loginSignup.js';
import Organization from './components/loginSignup/nonProfit_signup/organization.js';
import CauseArea from './components/loginSignup/nonProfit_signup/causeArea';
import Feedback from './components/feedback/feedback';
import PrivacyPolicy from './components/privacyPolicy/privacyPolicy';
import MessageOrg from './components/message/message';
import ChatDetailOrg from './components/message/chatDetail/chatDetail';
// indiviual pages
import Home from './components/individual/home/home';
import Donate from './components/individual/home/donate/donate';
import ListDetail from './components/individual/home/detail/listDetail';
import Post from './components/individual/post/post';
import Donation from './components/individual/donation/donation';
import Profile from './components/individual/profile/profile';
// organization pages
import HomeOrg from './components/organization/home/home';
import ListDetailOrg from './components/organization/home/detail/listDetail';
import DonationRequest from './components/organization/home/donationRequest/donationRequest';
import DonationsOrg from './components/organization/donations/donations';
import DetailOrg from './components/organization/donations/detail/detail';
import PostOrg from './components/organization/post/post';
import ProfileOrg from './components/organization/profile/profile';
import EditOrg from './components/organization/donations/edit/edit';
import {
  Switch,
  Route
} from "react-router-dom";
import NoMatch from './components/404/nomatch';

import AdminRoute from './router/adimnRoute';
import GuestRoute from './router/guestRoute';
import * as routes from './constants/routes';
import { connect } from 'react-redux';
const App = (props, { location }) => {
  return (
    <div>
      <Switch>
        <GuestRoute location={location} exact path={routes.ROOT} component={UserSelectType} />
        <GuestRoute location={location} exact path={routes.SELECTTYPE} component={UserSelectType} />
        <GuestRoute location={location} exact path={routes.LOGIN} component={LoginSignup} />
        <GuestRoute location={location} exact path={routes.ORGANIZATIONS} component={Organization} />
        <GuestRoute location={location} exact path={routes.CAUSEAREA} component={CauseArea} />
        <AdminRoute location={location} exact path={routes.FEEDBACK} component={Feedback} />
        <GuestRoute location={location} exact path={routes.PrivacyPolicy} component={PrivacyPolicy} />
        {/* <AdminRoute location={location} exact path={routes.CHATDETAIL} component={ChatDetail} />
        <AdminRoute location={location} exact path={routes.MESSAGE} component={Message} /> */}
        <AdminRoute location={location} exact path={routes.MESSAGE} component={MessageOrg} />
        <AdminRoute location={location} exact path={routes.CHATDETAIL} component={ChatDetailOrg} />
        {
          props.role === 'individual'
            ?
            <>
              <Switch>
                <AdminRoute location={location} exact path={routes.HOME} component={Home} />
                <AdminRoute location={location} exact path={routes.POST} component={Post} />
                <AdminRoute location={location} exact path={routes.DONATIONS} component={Donation} />
                <AdminRoute location={location} exact path={routes.PROFILE} component={Profile} />
                <AdminRoute location={location} exact path={routes.DETAIL} component={ListDetail} />
                <AdminRoute location={location} exact path={routes.DONATE} component={Donate} />
                <Route component={NoMatch} />
              </Switch>
            </>
            :
            <>
              <Switch>
                <AdminRoute location={location} exact path={routes.HOME} component={HomeOrg} />
                <AdminRoute location={location} exact path={routes.DETAIL} component={ListDetailOrg} />
                <AdminRoute location={location} exact path={routes.DONATE} component={DonationRequest} />
                <AdminRoute location={location} exact path={routes.DONATIONS} component={DonationsOrg} />
                <AdminRoute location={location} exact path={routes.DONATION_DETAIL} component={DetailOrg} />
                <AdminRoute location={location} exact path={routes.EDIT} component={EditOrg} />
                <AdminRoute location={location} exact path={routes.POST} component={PostOrg} />
                <AdminRoute location={location} exact path={routes.PROFILE} component={ProfileOrg} />
                <Route component={NoMatch} />
              </Switch>
            </>

        }
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}
const mapGetState = (state) => {
  return {
    role: state.users.role
  }
}
export default connect(mapGetState)(App);

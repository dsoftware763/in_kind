import React from 'react';
import Header from '../../shared/header';
import IndividualList from './individualList';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs'
class Home extends React.Component {
    render() {
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Home" back="d-none" />
                        <div className="homeList dashboardBox">
                            <IndividualList />
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
            </>
        )
    }
}
export default Home;
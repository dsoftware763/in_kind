import React from 'react';
import Header from '../../shared/header';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DonationPosted from './donationPosted';
import Donated from './donated';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs'
export default function Donation() {
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (
        <>
            <div className="backSplash">
                <Container className="loginSignup h-100 dashboard" >
                    <Header heading="Donation" back="d-none"/>
                    <div className="individual_Donation dashboardBox">
                        <Tabs value={value} onChange={handleChange} className="donation_tabs flex justify-content-center">
                            <Tab label="Donation Posted" className="donationSelect_Tab" />
                            <Tab label="Donated" className="donationSelect_Tab" />
                        </Tabs>
                        {value === 0 && <DonationPosted></DonationPosted>}
                        {value === 1 && <Donated></Donated>}
                    </div>
                    <DashboardTabs />
                </Container>
            </div>
        </>
    )
}


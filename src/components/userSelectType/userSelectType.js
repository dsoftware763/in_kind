import React from 'react';
import Container from '@material-ui/core/Container';
import image from '../../constants/image';
import {individualRole, nonProfitRole} from '../../actions/authentication';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function UserSelectType(props){
        const onClickIndividual = () => {
            const role = {Role:"individual"}
            props.individualRole(role)
            props.history.push('/login');
        };
        const onClickNonProfit = () => {
            const role = {Role:"nonprofit"}
            props.nonProfitRole(role)
            props.history.push('/login');
        }
        return(
            <div className="backSplash">
                <Container className=" h-100" style={{display:"flex",alignItems:"center"}}>
                    <div className="boxLogin">
                        <div style={{textAlign:"center"}}>
                            <img src={image.logo} alt="Logo" width="80%"/>
                            <p className="color-label paraHead">Connecting unwanted items <br/>to people in need</p>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",paddingTop:"35px"}} className="">
                            <div className="text-right">
                                <img src={image.individual} alt="individual" className="selectProfile cursor-pointer" onClick={onClickIndividual}/>
                            </div>
                            <div className="text-left">
                                <img src={image.nonprofit} alt="nonprofit" className="selectProfile cursor-pointer" onClick={onClickNonProfit}/> 
                            </div>
                        </div>
                        <img src={image.bglayer} alt="" width="100%"/>
                    </div>
                </Container>
            </div>
        );
}
const userRoleDispatch =  (dispatch) =>{
    return bindActionCreators({
        individualRole,
        nonProfitRole
    }, dispatch)
}
export default connect(null, userRoleDispatch)(UserSelectType);
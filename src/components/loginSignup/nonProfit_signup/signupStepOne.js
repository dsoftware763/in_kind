import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import image from '../../../constants/image';
import InlineError from '../../shared/inlineError';
import {connect} from 'react-redux';

class SignupStepOne extends React.Component{
    handleChange = (event, index, values) => this.setState({ values });
    render(){
        const {errors} = this.props;
        return(
            <div className="loginForm">
                <form className="fromDesign" onSubmit={this.props.onSubmit}>
                    <Grid container >
                        <Grid item xs={12} error={!errors.ein_number}>
                            <TextField onChange={this.props.onChange} label="EIN Number" pattern="[0-9]" name="ein_number" type="text" margin="normal" className="formInput" fullWidth />
                            { errors.ein_number && <InlineError text={errors.ein_number}/>}
                        </Grid>
                        <Grid item xs={12} error={!errors.organization_name}>
                            <TextField onChange={this.props.onChange} label="Organization Name" name="organization_name" type="text" margin="normal" className="formInput" fullWidth />
                            { errors.organization_name && <InlineError text={errors.organization_name}/>}
                        </Grid>
                        <Grid item xs={12} error={!errors.zip_code}>
                            <TextField onChange={this.props.onChange} label="Zip Code" name="zip_code" type="text" margin="normal" className="formInput" fullWidth />
                            { errors.zip_code && <InlineError text={errors.zip_code}/>}
                        </Grid>
                    </Grid>
                    <div className="text-center btnSpace_Login"><Button type="submit" className="btnLogin"><img src={image.btnRightArrow} alt="login button" width="32px"/></Button></div>
                </form>
            </div>
        )
    }
}
const mapGetState = (state) =>{
    return{
        errors: state.users.nonProfitSignupError
    }
}
export default connect(mapGetState)(SignupStepOne);
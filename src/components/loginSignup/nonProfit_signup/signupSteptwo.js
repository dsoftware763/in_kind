import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import image from '../../../constants/image';
import InlineError from '../../shared/inlineError';
import { connect } from 'react-redux';

class SignupStepTwo extends React.Component {
    render() {
        const { errors, logoUrl, storiesUrl } = this.props
        console.log(storiesUrl,"storiesUrl")
        return (
            <div className="loginForm">
                <form className="fromDesign" onSubmit={this.props.onSubmit}>
                    <Grid container >
                        <Grid item xs={12} error={!errors.name}>
                            <TextField onChange={this.props.onChange} label="Full Name" name="name" type="text" margin="normal" className="formInput" fullWidth />
                            {errors.name && <InlineError text={errors.name} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.email}>
                            <TextField onChange={this.props.onChange} label="Email" name="email" type="email" margin="normal" className="formInput" fullWidth />
                            {errors.email && <InlineError text={errors.email} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.password}>
                            <TextField onChange={this.props.onChange} label="Password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" name="password" type="password" className="formInput" margin="normal" fullWidth />
                            {errors.password && <InlineError text={errors.password} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.confirm_password}>
                            <TextField onChange={this.props.onChange} label="Confirm Password" name="confirm_password" type="password" className="formInput" margin="normal" fullWidth />
                            {errors.confirm_password && <InlineError text={errors.confirm_password} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.address}>
                            <TextField onChange={this.props.onChange} label="Address" type="text" name="address" className="formInput" margin="normal" fullWidth />
                            {errors.address && <InlineError text={errors.address} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.city}>
                            <TextField onChange={this.props.onChange} label="City" type="text" name="city" className="formInput" margin="normal" fullWidth />
                            {errors.city && <InlineError text={errors.city} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.state}>
                            <TextField onChange={this.props.onChange} label="State" name="state" type="text" className="formInput" margin="normal" fullWidth />
                            {errors.state && <InlineError text={errors.state} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.phone_number}>
                            <TextField onChange={this.props.onChange} label="Phone Number" name="phone_number" type="text" className="formInput" margin="normal" fullWidth />
                            {errors.phone_number && <InlineError text={errors.phone_number} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.website}>
                            <TextField onChange={this.props.onChange} label="Website" name="website" type="text" className="formInput" margin="normal" fullWidth />
                            {errors.website && <InlineError text={errors.website} />}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="signupInfo">
                                <p className="font-13 color-grey">
                                    <textarea rows={3} name="missionStatement" onChange={this.props.onChange} placeholder="Mission Statement (Tell potential donors your mission statement and values of organization)" />
                                </p>
                            </div>
                            <div className="signupInfo">
                                <p className="font-13 color-grey">
                                    <textarea rows={3} name="orgDescription" onChange={this.props.onChange} placeholder="Organization Description (Tell potential donors your history, goals progarams and achievements)" />
                                </p>
                            </div>
                            <div className="">
                                <input type="file" id="uploadLogo" name="uploadLogo" onChange={this.props.uploadLogo} style={{ display: 'none' }} />
                                <label for="uploadLogo">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className="browsebtn">
                                                <p className="btnPrimary btnList text-center">Upload Logo</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="fileName">
                                                {
                                                    logoUrl ?
                                                        <img src={logoUrl} alt="logo" className="img-fluid" />
                                                        :
                                                        <img src={logoUrl} alt="logo" style={{ display: 'none' }} />
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </label>
                            </div>
                            <div className="">
                                <input type="file" id="uploadStories" name="stories" style={{display:'none'}} onChange={this.props.uploadStories} multiple/>
                                <label for="uploadStories">
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <div className="browsebtn">
                                                <p className="btnPrimary btnList text-center">Upload Stories</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="fileName uploadStories">
                                                {
                                                    storiesUrl && storiesUrl.map(items=>{
                                                        return <img src={items} alt="logo" key={items} className="img-fluid" />
                                                    })
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </label>
                            </div>
                        </Grid>
                        <p className="color-grey font-13 fontWeight-600 w-100 text-center" style={{ paddingTop: "20px" }}>By creating an account you agree to our <br />Terms of Services and Privacy Policy</p>
                    </Grid>
                    <div className="h-45"></div>
                    <div className="text-center"><Button type="submit" className="btnLogin"><img src={image.btnRightArrow} alt="login button" width="32px" /></Button></div>
                    <div className="h-45"></div>
                </form>
            </div>
        )
    }
}
const mapGetState = (state) => {
    return {
        errors: state.users.nonProfitSignupError
    }
}
export default connect(mapGetState)(SignupStepTwo);
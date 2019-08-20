import React from 'react';
import TextField from '@material-ui/core/TextField';
import image from '../../../constants/image';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import InlineError from '../../shared/inlineError';
import { imageUrl } from '../../../constants/type';
import Moment from 'react-moment';
class ProfileForm extends React.Component {
    render() {
        const { errors } = this.props
        return (
            <>
                <form onSubmit={this.props.onSubmit}>
                    <div className=" text-center">
                        <TextField onChange={this.props.handelFileUpload} name="imagePost" type="file" margin="normal" id="imagePost"
                            className="formInput" fullWidth style={{ display: "none" }} />
                        <div className="position-relative profileImg">
                            <label htmlFor="imagePost" style={{ right: "0px", bottom: "-10px" }} className="position-absolute cursor-pointer">
                                <img src={image.editProfile} width="55px" alt="Edit profile picture" />
                            </label>
                            {this.props.imagePreviewUrl ?
                                <img src={this.props.imagePreviewUrl} alt="profile image" className="profileImgChange" /> : this.props.imagePost ? 
                                <img src={imageUrl+this.props.imagePost} alt="profile image" className="profileImgChange" /> :
                                <img src={image.avatar} alt="profile image" className="profileImgChange" /> 
                            }
                        </div>
                    </div>
                    <div className="profileDetail">
                        <div className="nameAddress text-center">
                            <h4>{this.props.nameNonedit}</h4>
                            <p className="font-13 color-grey">{this.props.addressNonedit}</p>
                        </div>
                        <div className="userInfo">
                            <ul>
                                <li className="profileList">
                                    <label className="fontWeight-600 text-uppercase color-grey font-11">Member Since</label>
                                    <p className="color-label fontWeight-600">
                                        <Moment format="DD MMM YYYY">
                                            {this.props.memberSince}
                                        </Moment>
                                    </p>
                                </li>
                                <li className="profileList">
                                    <label className="fontWeight-600 text-uppercase color-grey font-11">Item Donated</label>
                                    <p className="color-label fontWeight-600">{this.props.itemDonated}</p>
                                </li>
                            </ul>
                            <Grid container >
                                <Grid item xs={12} error={!errors.name}>
                                    <TextField name="name" margin="normal" value={this.props.name} onChange={this.props.onChange} label="Full Name" type="text" className="formInput" fullWidth />
                                    {errors.name && <InlineError text={errors.name} />}
                                </Grid>
                                <Grid item xs={12} error={!errors.address}>
                                    <TextField name="address" margin="normal" value={this.props.address} onChange={this.props.onChange} label="Address" type="text" className="formInput" fullWidth />
                                    {errors.address && <InlineError text={errors.address} />}
                                </Grid>
                                <Grid item xs={12} error={!errors.zipcode}>
                                    <TextField name="zipcode" margin="normal" value={this.props.zipcode} onChange={this.props.onChange} label="Zipcode" type="text" className="formInput" fullWidth />
                                    {errors.zipcode && <InlineError text={errors.zipcode} />}
                                </Grid>
                                <Grid item xs={12} error={!errors.city}>
                                    <TextField name="city" margin="normal" value={this.props.city} onChange={this.props.onChange} label="City" type="text" className="formInput" fullWidth />
                                    {errors.city && <InlineError text={errors.city} />}
                                </Grid>
                                <Grid item xs={12} error={!errors.state}>
                                    <TextField name="state" margin="normal" value={this.props.state} onChange={this.props.onChange} label="State" type="text" className="formInput" fullWidth />
                                    {errors.state && <InlineError text={errors.state} />}
                                </Grid>
                                <Grid item xs={12} error={!errors.phoneNumber}>
                                    <TextField name="phoneNumber" margin="normal" value={this.props.phoneNumber} onChange={this.props.onChange} label="Phone Number" type="text" className="formInput" fullWidth />
                                    {errors.phoneNumber && <InlineError text={errors.phoneNumber} />}
                                </Grid>
                                {/* <Grid item xs={12} >
                                    <TextField name="login_email" margin="normal" onChange={this.onChange} label="Email" type="email" className="formInput" fullWidth />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <div className="h-45"></div>
                                    <div className="text-center btnSpace_Login"><Button type="submit" className="btnPrimary">Update</Button></div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
const mapSetStates = (state) => {
    return {
        errors: state.users.nonProfitSignupError
    }
}
export default connect(mapSetStates)(ProfileForm);
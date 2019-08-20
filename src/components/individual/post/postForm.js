import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import image from '../../../constants/image';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import InlineError from '../../shared/inlineError';
import Success from '../../shared/success';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class PostForm extends React.Component {
    constructor() {
        super();
        this.state = {
            successOpen: false,
            value: '',
        }
        this.ref = React.createRef();
    }
    handelclickOpen = (e) => {
        this.setState({
            value: e.target.value
        })
        this.props.handelclickOpen(e.target.value);
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            successOpen: false
        })
    }
    componentWillReceiveProps(postStatus) {
        if (postStatus.postStatus.status) {
            this.ref.current.reset();
            this.setState({
                successOpen: true,
                imagePreviewUrl:''
            })
        }
    }
    render() {
        const { errors } = this.props;
        return (
            <>
                <form onSubmit={this.props.onSubmit} ref={this.ref} >
                    <Grid container className="fontWeight-500" >
                        <Grid item xs={12} error={!errors.imagePost}>
                            <TextField onChange={this.props.handelFileUpload} name="imagePost" type="file" margin="normal" id="imagePost"
                                className="formInput" fullWidth style={{ display: "none" }} />
                            {this.props.imagePreviewUrl === '' ?
                                <label htmlFor="imagePost" className="cursor-pointer imagePost text-center">
                                    <div className="w-50">
                                        <img src={image.fileUpload} alt="file upload" width="20%" />
                                        <p className="uploadPhoto">Upload Photo</p>
                                    </div>
                                </label>
                                :
                                <label className="cursor-pointer imagePost text-center p-0 position-relative">
                                    <img src={this.props.imagePreviewUrl} alt="profile image" className="postImage img-fluid" />
                                    <label htmlFor="imagePost" style={{ right: "0px", bottom: "-25px" }} className="position-absolute cursor-pointer">
                                        <img src={image.editProfile} width="55px" alt="Edit profile picture" />
                                    </label>
                                </label>
                            }
                            {errors.imagePost && <InlineError text={errors.imagePost} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.itemDonate}>
                            <TextField onChange={this.props.onChange} label="Item to Donate" name="itemDonate" type="text"
                                margin="normal" className="formInput" fullWidth />
                            {errors.itemDonate && <InlineError text={errors.itemDonate} />}
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="position" error={!errors.sendMethod} name="sendMethod" className="formInput">
                                <label className="MuiInputLabel-shrink text-uppercase text-left color">Item Handover</label>
                                <FormControlLabel value="deliver" onClick={this.handelclickOpen} onChange={this.props.onChange} control={<Radio color="primary" />} label="Can Deliver item"
                                    labelPlacement="end" />
                                {this.state.value === "deliver" ?
                                    <div className="text-left" style={{ paddingLeft: "30px" }}>
                                        <p className="font-13 color-grey">How far i am willing to drive to deliver the donation</p>
                                        <div className="flex align-items-center">
                                            <Select
                                                value={this.props.miles}
                                                className="formInput"
                                                style={{width:"50%"}}
                                                onChange={this.props.onChange}
                                                input={<OutlinedInput name="miles" id="outlined-age-simple" />}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={15}>15</MenuItem>
                                            </Select>
                                            {/* <TextField id="outlined-bare" placeholder="Eg 5" name="miles" onChange={this.props.onChange} className="formInput" margin="normal" variant="outlined" /> */}
                                            <p className="font-13 color-grey" style={{ paddingLeft: "10px" }}>Miles</p>
                                        </div>
                                    </div>
                                    : null}
                                <FormControlLabel value="picked" onClick={this.handelclickOpen} onChange={this.props.onChange} control={<Radio color="primary" />} label="Item must be picked up"
                                    labelPlacement="end" />
                                {errors.sendMethod && <InlineError text={errors.sendMethod} />}
                            </RadioGroup>
                        </Grid>
                        <div className="text-center btnSpace_Login w-100">
                            <div className="h-45"></div>
                            <div className="h-45"></div>
                            <Button type="submit" className="btnPrimary">Post Item</Button>
                        </div>
                    </Grid>
                </form>
                <Success open={this.state.successOpen} onClose={this.handleClose} link="d-none" button="text-center"
                    text="You've successfully added an item for Donation" successimg={image.success} />
            </>

        )
    }
}
const mapSetStates = (state) => {
    return {
        errors: state.users.nonProfitSignupError,
        postStatus: state.individualUser.formPost
    }
}
export default connect(mapSetStates)(PostForm);
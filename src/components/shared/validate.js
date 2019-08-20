import validator from 'validator';

export const signupValidator = (data) => {
        const errors = {};
        if (!validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.name) errors.name = "Name can't be blank";
        if (!data.password) errors.password = "Password can't be blank";
        if (!validator.matches(data.password, /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) errors.password = "Password should be more than 8 character long, should contain 1 capital letter, 1 number, 1 special character";
        if (data.password !== data.confirm_password) errors.confirm_password = "Enter same Password";
        if (!data.address) errors.address = "Address can't be blank";
        if (!validator.isNumeric(data.zipcode)) errors.zipcode = "Enter only Zipcode";
        if (!validator.isLength(data.zipcode, {min:1, max: 6})) errors.zipcode = "Zipcode max length is 6";
        if (!data.zipcode) errors.zipcode = "Zipcode can't be blank";
        if (!data.city) errors.city = "City can't be blank";
        if (!data.state) errors.state = "State can't be blank";
        if (!validator.isMobilePhone(data.phone_number) && !data.phone_number ) errors.phone_number = "Enter only phone number";
        if (!data.phone_number) errors.phone_number = "Phone number can't be blank";
        return errors;
    }

    export const loginValidator = (data) => {
        const login_errors = {};
        if (!validator.isEmail(data.login_email)) login_errors.login_email = "Invalid email";
        if (!data.login_password) login_errors.login_password = "Password can't be blank";
        if (!validator.matches(data.login_password, /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) login_errors.login_password = "Password should be more than 8 character long, should contain 1 capital letter, 1 number, 1 special character";
        return login_errors;
    }
    export const forgotValidator = (data) => {
        const errors = {};
        console.log("forgot",data)
        if (!validator.isEmail(data.email)) errors.email = "Invalid email";
        return errors;
    }
    export const organizationSignup = (dataOrg) => {
        const errorsOrg = {};
        if (!dataOrg.organization) errorsOrg.organization = "Select one organization";
        return errorsOrg;
    }
    export const nonprofitStepOne = (data) => {
        const errors = {};
        console.log("error",data)
        if (!validator.isNumeric(data.ein_number)) errors.ein_number = "Enter only number";
        if (!data.ein_number) errors.ein_number = "EIN number can't be blank";
        if (!data.organization_name) errors.organization_name = "Organization Name can't be blank";
        if (!data.zip_code) errors.zip_code = "Zip code can't be blank";
        if (!validator.isNumeric(data.zip_code)) errors.zip_code = "Enter only Zipcode";
        return errors;
    }
    export const nonprofitStepTwo = (dataNew) => {
        const errorsNew = {};
        console.log("error",dataNew)
        if (!validator.isEmail(dataNew.email)) errorsNew.email = "Invalid email";
        if (!dataNew.name) errorsNew.name = "Name can't be blank";
        if (!validator.matches(dataNew.password, /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) errorsNew.password = "Password should be more than 8 character long, should contain 1 capital letter, 1 number, 1 special character";
        if (dataNew.password !== dataNew.confirm_password) errorsNew.confirm_password = "Enter same Password";
        if (!dataNew.address) errorsNew.address = "Address can't be blank";
        if (!dataNew.city) errorsNew.city = "City can't be blank";
        if (!dataNew.state) errorsNew.state = "State can't be blank";
        if (!dataNew.phone_number) errorsNew.phone_number = "Phone number can't be blank";
        if (!validator.isURL(dataNew.website)) errorsNew.website = "Enter website url";
        return errorsNew;
    }
    export const causeArea = (data) => {
        const errors = {};
        if (!data.causearea.length == 5) errors.causearea = "Select only Five Cause Area";
        return errors;
    }
    export const itemDonatePost = (data) => {
        const errors = {};
        if (!data.imagePost) errors.imagePost = "Image can't be blank";
        if (!data.itemDonate) errors.itemDonate = "Item to donate can't be blank";
        if (!data.sendMethod) errors.sendMethod = "Item handover can't be blank";
        return errors;
    }
    export const donationListSelect = (stepOneData) =>{
        const errors = {};
        if (!stepOneData.donationList.length) errors.donationList = "Select from your available Donations";
        return errors;
    }
    export const donationListMessage = (stepTwoData) =>{
        const errorMessage = {};
        if (!stepTwoData.donationMessage) errorMessage.donationMessage = "Message can't be blank";
        return errorMessage;
    }
    export const organizationForm = (data) =>{
        const errors = {};
        if (!data.itemMessage) errors.itemMessage = "Message can't be blank";
        if (!data.itemNeed) errors.itemNeed = "Item can't be blank";
        return errors;
    }
    export const profileForm = (data) =>{
        const errors = {};
        console.log(data,"err")
        if (!data.phoneNumber) errors.phoneNumber = "Phone number can't be blank";
        if (!data.zipcode) errors.zipcode = "Zipcode can't be blank";
        if (!data.city) errors.city = "City can't be blank";
        if (!data.address) errors.address = "Address can't be blank";
        if (!data.state) errors.state = "State can't be blank";
        if (!data.name) errors.name = "Name can't be blank";
        return errors;
    }
    export const profileFormOrg = (data) =>{
        const errors = {};
        console.log(data,"err")
        if (!data.phoneNumber) errors.phoneNumber = "Phone number can't be blank";
        if (!data.zipcode) errors.zipcode = "Zipcode can't be blank";
        if (!data.city) errors.city = "City can't be blank";
        if (!data.address) errors.address = "Address can't be blank";
        if (!data.state) errors.state = "State can't be blank";
        if (!data.organisationName) errors.organisationName = "Organisation name can't be blank";
        if (!validator.isURL(data.website)) errors.website = "Enter website url";
        if (!data.website) errors.website = "Website can't be blank";
        return errors;
    }
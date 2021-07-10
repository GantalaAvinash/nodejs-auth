const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";

    if (Validator.isEmpty(data.email)){
        errors.message = "Email field is required";
    }else if (!Validator.isEmail(data.email)) {
        errors.message = "Email is invaild";
    }
    if (Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }
    if (Validator.isEmpty(data.confirmpassword)){
        errors.message = "Confirm password field is required";
    }

    if(!Validator.equals(data.password, data.confirmpassword)) {
       errors.message = "Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
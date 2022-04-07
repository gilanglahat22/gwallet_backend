const Joi = require("joi");

// validation for sign up
const signupValidation = (req, res, next) => {
  const { fullname, email, password, requisite } = req.body;
  const validateData = Joi.object({
    fullname: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(16).alphanum().required(),
    requisite: Joi.string().required()
  });
  const { error } = validateData.validate({
    fullname: fullname,
    email: email,
    password: password,
    requisite: requisite
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return next({ status: 422, message: errorMessage });
  } else {
    next();
  }
};

const resetPasswordValidation = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const validateData = Joi.object({
    password: Joi.string().min(8).max(16).alphanum().required(),
    confirmPassword: Joi.string().min(8).max(16).alphanum().required()
  });
  const { error } = validateData.validate({
    password: password,
    confirmPassword: confirmPassword
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return next({ status: 422, message: errorMessage });
  } else {
    if (password !== confirmPassword) {
      return next({
        status: 400,
        message: "Password and Confirm Password is not match"
      });
    }
    next();
  }
};

const updateProfileValidation = (req, res, next) => {
  const { email, phone_number, fullname, city, address, post_code } = req.body;
  const validateData = Joi.object({
    email: Joi.string().email().lowercase().required(),
    phone_number: Joi.string().min(5).max(20).required().regex(/[0-9]/),
    fullname: Joi.string().min(5).max(30).required(),
    city: Joi.string().min(5).max(30).required(),
    address: Joi.string().min(5).max(120).required(),
    post_code: Joi.string().min(4).max(6).required().regex(/[0-9]/)
  });
  const { error } = validateData.validate({
    fullname: fullname,
    email: email,
    phone_number: phone_number,
    city: city,
    address: address,
    post_code: post_code
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return next({ status: 422, message: errorMessage });
  } else {
    next();
  }
};

module.exports = {
  signupValidation,
  resetPasswordValidation,
  updateProfileValidation
};

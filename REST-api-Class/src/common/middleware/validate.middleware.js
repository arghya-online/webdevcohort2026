import app from "../app.js";

const validate = (Dtoclasses) => {
  return (req, res, next) => {
    const { errors, value } = Dtoclasses.validate(req.body);

    if (errors) {
      throw ApiError.badRequest(errors.join(", "));
    }
    req.body = value; // Update req.body with the validated and sanitized data
    next();
  };
};

export default validate;

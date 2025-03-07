const {validationResult} = require("express-validator");
const AppError = require("../utilities/appError");

exports.validate = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            const errorsString = errors
                .array()
                .map((err) => err.msg)
                .join("; ");
            
            throw new AppError(errorsString, 400);
        }
        next();

    } catch (error) {
        next(error);
    }
}    

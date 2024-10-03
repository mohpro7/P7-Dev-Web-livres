const { userSchema } = require('../data-validation/userValidation');

const validateUser = (req, res, next) => {
    console.log(req.body);
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = validateUser;


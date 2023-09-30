const Joi = require('joi');

const loginValidation = user => {
    const schema = Joi.object({
        email: Joi.string()
            .ruleset.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            )
            .rule({ message: '"mail" mast be a valid mail' })
            .required(),
        password : Joi.string()
            .ruleset.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{7,}$/)
            .rule({message: "password must be at least 7 symbols and must have at least one capital letter, one lowercase letter, one digit and one of special symbols: '!@#$%^&*-'"})
            .required(),
    });

    return schema.validate(user);
};

module.exports = loginValidation;
const Joi = require("joi");

const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object()
      .keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).allow(""),
        last: Joi.string().min(2).max(256).required(),
      })
      .required(),
    isBusiness: Joi.boolean().required(),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({
        message:
          "valid phone format: 0xxxxxxxxx or 0xx-xxxxxxx or 0xx-xxx-xxxx",
      })
      .required(),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: '"mail" mast be a valid mail' })
      .required(),
    password: Joi.string()
      .ruleset.regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,}$/
      )
      .rule({
        message:
          "password must be at least 9 symbols and must have at least one capital letter, one lowercase letter, one digit and one of special symbols: '!@#$%^&*-'",
      })
      .required(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .uri()
          .rule({ message: "mast be a valid url" })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
    address: Joi.object()
      .keys({
        state: Joi.string().min(2).max(256).allow(""),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().integer().min(1).required(),
        zip: Joi.string()
          .ruleset.regex(/^[0-9]{4,}$/)
          .rule({ message: "valid zip must have at least 4 digits" })
          .allow(""),
      })
      .required(),
  });

  return schema.validate(user);
};

module.exports = registerValidation;

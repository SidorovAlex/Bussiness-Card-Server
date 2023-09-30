const Joi = require('joi');

const validateCard = (card) => {
    const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({ message: 'valid phone format: 0xxxxxxxxx or 0xx-xxxxxxx or 0xx-xxx-xxxx' })
      .required(),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'card "mail" mast be a valid mail' })
      .required(),

    web: Joi.string()
      .uri()
      .rule({ message: 'card "web" mast be a valid url' })
      .allow(""),

    image: Joi.object()
      .keys({
        url: Joi.string()
          .uri()
          .rule({ message: '"url" mast be a valid url' })
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
        zip: Joi.string().ruleset
        .regex(/^[0-9]{4,}$/)
        .rule({message: 'valid zip must have at least 4 digits'})
        .allow(""),
      })
      .required(),
    bizNumber: Joi.number().allow("").optional(),
    user_id: Joi.string().allow(""),
    });

    return schema.validate(card);
};

module.exports = validateCard;
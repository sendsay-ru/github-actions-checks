const Joi = require('joi');

module.exports = Joi.object({
  showComments: Joi.boolean(),
  jobs: Joi.array()
    .required()
    .items(
      Joi.object({
        key: Joi.string().required(),
        steps: Joi.array()
          .required()
          .items(
            Joi.object({
              key: Joi.string().required(),
              name: Joi.string().required(),
              command: Joi.string().required(),
            }),
          ),
      }),
    ),
  node: Joi.alternatives().try(Joi.number(), Joi.string().empty('')),
  installCommand: Joi.string().empty(''),
  buildCommand: Joi.string().empty(''),
});

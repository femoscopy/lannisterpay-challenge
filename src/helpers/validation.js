import { celebrate } from "celebrate";
import Joi from "joi";

export const validateTransactionObject = () => {
  const splitInfoValidation = Joi.object().keys({
    SplitType: Joi.valid("FLAT", "RATIO", "PERCENTAGE").required(),
    SplitValue: Joi.number().positive().required(),
    SplitEntityId: Joi.string().required(),
  });
  return celebrate({
    body: Joi.object({
      ID: Joi.number().required(),
      Amount: Joi.number().positive().required(),
      Currency: Joi.string().required(),
      CustomerEmail: Joi.string().email().required(),
      SplitInfo: Joi.array()
        .min(1)
        .items(splitInfoValidation)
        .min(1)
        .max(20)
        .required(),
    }),
  });
};

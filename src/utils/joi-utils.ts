import Joi from "joi";

function ObjectId(message: string = "24-digit hexadecimal") {
  return Joi.alternatives(
    Joi.string().regex(/^[0-9a-fA-F]{24}$/, message),
    Joi.object().keys({
      id: Joi.any(),
      _bsontype: Joi.allow("ObjectId"),
    }),
  );
}

export default {
  ObjectId,
};

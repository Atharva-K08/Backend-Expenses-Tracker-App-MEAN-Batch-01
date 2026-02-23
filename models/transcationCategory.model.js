const mongooes = require("mongoose");
const transcationCatetorySchema = mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongooes.Schema.Types.ObjectId,
    required: true,
  },
});
const TranscationCategoryModel = mongooes.model(
  "TranscationCategory",
  transcationCatetorySchema,
);
module.exports = TranscationCategoryModel;

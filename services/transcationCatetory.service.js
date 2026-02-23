const TranscationCategoryModel = require("../models/transcationCategory.model");

module.exports.createTranscationCategory = async (data) => {
  return await TranscationCategoryModel.create(data);
};

module.exports.getTranscationCategory = async (id) => {
  return await TranscationCategoryModel.findById(id);
};

module.exports.getTranscationCategories = async ({userId}) => {
  return await TranscationCategoryModel.find({ userId });
};

module.exports.deleteTranscationCategory = async (id) => {
  return await TranscationCategoryModel.findByIdAndDelete(id);
};

module.exports.updateTranscationCategory = async (id, data) => {
  return await TranscationCategoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

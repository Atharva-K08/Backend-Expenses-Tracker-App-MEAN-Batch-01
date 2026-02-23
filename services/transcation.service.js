const TranscationModel = require("../models/transcation.model");

module.exports.createTranscation = async (data) => {
    return await TranscationModel.create(data);
}

module.exports.getTranscationById = async (id) => {
    return await TranscationModel.findOne({ _id: id });
}

module.exports.getTranscations = async ({userId}) => {
    return await TranscationModel.find({ userId });
}

module.exports.deleteTranscation = async (id) => {
    return await TranscationModel.findByIdAndDelete(id);
}

module.exports.updateTranscation = async (id, data) => {
    return await TranscationModel.findByIdAndUpdate(id, data, { new: true });
}
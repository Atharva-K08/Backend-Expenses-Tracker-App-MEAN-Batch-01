const { mongoose } = require("mongoose");
const TranscationModel = require("../models/transcation.model");

module.exports.getAnalytics = async (userId, startOfMonth, endOfMonth) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  try {
    const totalStats = await TranscationModel.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const currentMonth = await TranscationModel.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const monthlyStats = await TranscationModel.aggregate([
      { $match: { userId: userObjectId } },

      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },

      {
        $sort: { "_id.month": 1 },
      },
    ]);

    return {
      totalStats,
      currentMonth,
      monthlyStats,
    };
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const mongooes = require("mongoose");

const transcationSchema = mongooes.Schema(
  {
    userId: {
      type: mongooes.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["cash", "card", "online", "check", "bank transfer"],
      required: true,
    },
    category: {
      type: mongooes.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const TranscationModel = mongooes.model("Transcation", transcationSchema);

module.exports = TranscationModel;

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: String,
    file: String,
  },
  {
    timestamps: true,
  }
);

const messages = mongoose.model("messages", messageSchema);

module.exports = messages;

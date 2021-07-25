const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoModel = Schema(
  {
    title: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoModel);

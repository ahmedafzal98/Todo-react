const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "Please enter your note"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;

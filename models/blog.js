const mongoose = require("mongoose");

const schema = mongoose.Schema;

const BlogSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blog = mongoose.model("Detail", BlogSchema);
module.exports = blog;

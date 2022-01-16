const mongoose = require("mongoose")

const Schema = mongoose.Schema

const gqlSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Shipped', gqlSchema)

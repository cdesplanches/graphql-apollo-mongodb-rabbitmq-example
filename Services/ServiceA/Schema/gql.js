const mongoose = require("mongoose")

const Schema = mongoose.Schema

const gqlSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Orders', gqlSchema)

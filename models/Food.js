const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }
})
const food = mongoose.model("Food", FoodSchema)
module.exports = food;
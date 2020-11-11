const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const FoodModel = require('./models/Food')
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:admin123@cluster0.yjoks.mongodb.net/food?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

app.post('/insert', async (req, res) => {
  const foodName = req.body.foodName
  const price = req.body.price
  const img = req.body.img
  const food = new FoodModel({ foodName: foodName, price: price, img: img })
  try {
    await food.save()
    res.send("inserted data")
  } catch (err) {
    console.log(err);
  }
})

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

app.delete("/delete/:id", async(req, res) => {
  const id = req.params.id
  await FoodModel.findByIdAndRemove(id).exec()
  res.send("deletado")
})

app.put("/update", async (req, res) => {
  const id = req.body.id
  const newFoodName = req.body.newFoodName
  const newPrice = req.body.newPrice
  const newImg = req.body.newImg
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName
      updatedFood.price = newPrice
      updatedFood.img = newImg
      updatedFood.save()
      res.send("update")
    })
  }catch(err){
    console.log(err);
  }
})

app.listen(3001)
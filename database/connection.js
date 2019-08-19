const { MONGO_DB } = process.env
const mongoose = require('mongoose')

module.exports = () => {
  const error = 'No MONGO_DB_CONNECTION set!'
  try {
    if (!MONGO_DB) {
      throw error
    }
    mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useFindAndModify: true
    })
    console.log("Connected to the MongoDB")
  } catch (e) {
    console.log("Something went wrong with the connection!")
  }
}

const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.mongo_uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host} `)
    }).catch(err=>console.error(`Error connecting to MongoDB: ${err.message}`))
}
module.exports = connectDatabase

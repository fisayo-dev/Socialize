import mongoose from 'mongoose'

const connectDB = (url) => {
    mongoose.set('strictQuery', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connect(url)
        .then(() => console.log('MongoDb connected'))
        .catch((error) => console.log(error))
}

export default connectDB;
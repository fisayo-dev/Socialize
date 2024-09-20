import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    text: {type: String, required: true},
    image: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    date: {type: Date, required: true},
})

const userModel = mongoose.models('Chat', ChatSchema)
export default userModel
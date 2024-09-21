import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    middle_name: {type: String, required: true},
    last_name: {type: String, required: true},
    profile_img: {type: String, required: true},
    gender: {type: String, required: true},
    country: {type: String, required: true},
    dob: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    friends: [{type: String, required: true}],
    requests: [{type: String, required: true}],
    blockers: [{ type: String, required: true }],
})

const userModel = mongoose.model('User', UserSchema)
export default userModel;
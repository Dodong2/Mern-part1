/* mongoose */
const mongoose = require('mongoose')

/* schema model 1 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    age: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
})

/* schema model 2 */
/* yung users nasa database yan, yan ang name ng collections mo */
const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel


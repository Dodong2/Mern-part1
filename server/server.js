/* express */
const express = require('express')
const app = express()
/* mongoose */
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://carl:KXFvvh3W2gaQGhIY@cluster0.jn0rg.mongodb.net/mernpart1?retryWrites=true&w=majority&appName=Cluster0')
/* cors */
const cors = require('cors')

/* middleware: para maging json lahat kahit naka object */
app.use(express.json())
app.use(cors())

/* user model */
const UserModel = require('./models/User')

/* simple get */
app.get('/getUsers', async (req, res) => {
        try{
            const users = await UserModel.find({})
            res.status(200).json(users)
        } catch(err) {
            console.log(err)
            res.status(500).json({ error: "An error occurred while fetching users." })
        }
})

//simple create
app.post('/createUser', async(req, res) => {
    try {
        const user = req.body
        const newUser = UserModel(user)
        await newUser.save(

            res.json(user)
        )
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "An error occurred while fetching users." })
    }
})

//sample update 
app.put('/updateUser/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body
        const user = await UserModel.findByIdAndUpdate(id, updatedData, { new: true })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "An error occurred while updating the user." })
    }
})

//simple delete user
app.post('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ error: "User not found." })
        }
        res.status(200).json({ message: "User deleted successfully." })
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "An error occurred while deleting the user." })
    }
})

/* ports */
app.listen(3001, () => {
    console.log('running on port: 3001')
})
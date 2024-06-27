const express = require('express');
require('./connection');
const user = require('./model/user');

// Initialization
const app = express();

// Middleware
app.use(express.json());

app.get('/add', (req, res) => {
    res.send('hello');
});

app.get('/login', (req, res) => {
    res.send('logged in successfully');
});

// To add data to the database
app.post('/add', async(req, res) => {
    try {
        console.log(req.body);
        await user(req.body).save();
        res.send({ message: 'Data added successfully' });
    } catch (error) {
        console.log(error)
       
    }
})
// to view all the users
app.get('/view',async(req,res)=>{
    try{
        const data=await user.find()
        res.send(data)
    }catch(error){
        console.log(error)
    }
})
//to delete any user
app.delete('/remove/:id',async(req,res)=>{
    try{
        var data=await user.findByIdAndDelete(req.params.id)
        res.send({message:"deleted"})
    }catch(error){
        console.log(error)
    }
})
app.put('/edit/:id',async(req,res)=>{
    try{

        var data=await user.findByIdAndUpdate(req.params.id,req.body)
        res.send({message:"Updated successfully",data})
    }catch(error){
        console.log(error)
    }
})
app.listen(3001, () => {
    console.log('Port is up and running on 3001');
});

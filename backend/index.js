const express = require('express');
require("./config");
const dbschema = require('./person');
const app = express();
const cors = require('cors');

const PORT = 5000;
app.use(express.json());

// app.use(cors({
//  origin : ["localhost:5000", "http://localhost:5000", 'http://localhost:3000', "localhost:3000"]
// }))
app.use(cors());
app.post("/create", async (req, resp) => {
    let data = new dbschema(req.body);
    try{
        const result = await data.save();
        console.log(result);
        resp.send(result);
    }catch(error){
        console.log("21",error);
        resp.send(error);
    }
   
//    resp.status(202).json({
//     "data":result
//    })
});

app.get("/list", async (req, resp) => {
    let data = await dbschema.find();
    // let data = await Person.find().sort({  createdAt: -1 });
    resp.send(data);
})

app.get("/list/:_id", async (req, resp) => {
    let data = await dbschema.find({_id: req.params});
    // let data = await Person.find().sort({  createdAt: -1 });
    resp.send(data[0]);
})

app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)

    //delete it will id
    let data = await dbschema.deleteOne(req.params);
    resp.send(data);
})


app.put("/update/:_id",async (req, resp) => {
    console.log(req.params)
    let data = await dbschema.updateOne(
        req.params,
        {$set: req.body}
    );
    resp.send(data);
})

app.listen(PORT,()=>{
    console.log(`Server Started ${PORT} `)

});

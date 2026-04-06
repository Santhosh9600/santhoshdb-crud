const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const app=express()

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://santhoshdb-crud.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())

mongoose.connect("mongodb+srv://user:user@cluster0.0rmgbcc.mongodb.net/food?retryWrites=true&w=majority")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const FoodModel = require("./models/food");

//insert the data

app.post("/insert",async(req,res)=>{
    const {foodName,description}=req.body;
    const food=new FoodModel({
        foodName:foodName,
        description:description
    })

    try{
        const result=await food.save()
        res.send(result)
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
})

//read the data

app.get("/read",async(req,res)=>{
    try{
        const food=await FoodModel.find();
        res.send(food)
    }
    catch(err){
        res.send("Error")
    }
})

//updating the data

app.put("/update",async(req,res)=>{
    const {newFoodName,newDescription,id}=req.body;
    try{
        const updateFood=await FoodModel.findById(id);
        if(!updateFood)
        {
            return res.status(400).send("data not found");
        }
        updateFood.foodName=newFoodName;
        updateFood.description = newDescription;
        await updateFood.save()
        res.send("data update...")
    }
    catch(err)
    {
        console.log(err);
    }
})

//deleting the data

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const result=await FoodModel.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).send("food item not found")
        }
        res.send("food item delete")
    }catch(err){
        console.error(err)
    }
})

app.listen(3001,()=>{
    console.log("server is running")
})

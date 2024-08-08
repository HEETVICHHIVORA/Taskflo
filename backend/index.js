const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { string } = require("postcss-selector-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/react-login-tut")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Failed to connect to MongoDB:", err));

// Define Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  team :[{type:mongoose.Schema.Types.ObjectId,ref:"team"}]  
});
const teamSchema = new mongoose.Schema({
    name :{type:string, required:true},
    users:{type:Array ,required:true},
    chats:{type:Array,required:true }
   
})

// Model
const User = mongoose.model("User", userSchema);

// Routes
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json("fail");
  }
});
app.post("/createteam",async (req,res)=>{
    try{
        const {name,users} = req.body;

        if(!name || !users){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const newTeam = await new teamSchema({
            name,
            users,
            chats:null
        })
        await newTeam.save();
    
        return res.json({
            success:true,
            message:"New team created successfully",
            newTeam:newTeam
        })
    }
    catch(e){

    }
})
app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json("exist");
    } else {
      const newUser = new User({ email, password, role, team :null});
      await newUser.save();
      res.json("notexist");
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json("fail");
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
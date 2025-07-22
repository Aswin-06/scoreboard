const db=require("../config/db");
const user=require("../model/user");

exports.addUser=async (req,res) => {
    if(!req || !req.body)
    {
        return res.status(404).send("No Data Found");
    }
    const newuser=new user({name:req.body.name,points:0});
    try {
        const addedUser=await newuser.save();
        return res.status(200).json(addedUser);
    } catch (error) {
        return res.status(404).send("Error Found");
    }
}

exports.getUser=async (req,res) => {
    const allUser=await user.find();
    return res.status(200).json(allUser);
}

exports.addScore=async (req,res) => {
    if(!req || !req.body)
        return res.status(404).send("No Data Found");
    const rank=Math.floor(Math.random()*10)+1;
    const findUser=await user.findById(req.body._id);
    findUser.points=findUser.points+rank;
    await user.updateOne({_id:req.body._id},findUser);
    return res.status(200).send(rank);
}


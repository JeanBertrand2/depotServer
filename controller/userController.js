//import { json } from "body-parser";
import User from "../model/userModel.js";

export const create = async(req,res)=>{
    try{
            const newUser = new User(req.body);
            const {email} = newUser;

            const userExist = await User.findOne({email})
            if(userExist)
            {
                return res.status(400).json({message : "User already exist"});
            }
            const savedData = await newUser.save();
            //res.status(200).json(savedData)
            res.status(200).json({message:"user created successfully"});
    }
    catch(error)
    {
        res.status(500).json({errorMessage:error.message})
    }
};
const ITEMS_PER_PAGE = 2;
export const getAllUsers = async(req,res)=>{
    const page = Number(req.query.page)  ||1;
    const query ={};
    try{
        const skip = (page-1) * ITEMS_PER_PAGE ;
        const countPromise =  User.estimatedDocumentCount(query)
        const userDataPromise =  User.find(query).limit(ITEMS_PER_PAGE).skip(skip);
        
        const[count,userData] = await Promise.all([countPromise,userDataPromise]);
        const pageCount = count / ITEMS_PER_PAGE;
        const pagination={
                            count,
                            pageCount,
                            }

        if(!userData || userData.length == 0)
        {
            return res.status(404).json({message :"User data not found."});
        }
        res.status(200).json({userData,
            pagination
            })
        //res.status(200).json(userData);
    }
    catch(error)
    {
        res.status(500).json({errorMessage: error.message});
    }
};
export const getUserById = async(req, res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({message: "User data not found"});
        }
        res.status(200).json(userExist);
    }
    catch(error)
    {
        res.status(500).json({errorMessage: error.message});
    }
}

export const update = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({message: "User data not found"});
        }

        const updateData = await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(200).json({message:"user updated successfully"});
        //res.status(200).json(updateData)
    }
    catch(error)
    {
        res.status(500).json({errorMessage: error.message});
    }
}
export const deleteUser = async(req,res) =>{

     try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({message: "User data not found"});
        }

        const updateData = await User.findByIdAndDelete(id)
        res.status(200).json({message : "User deleted successfully."})
    }
    catch(error)
    {
        res.status(500).json({errorMessage: error.message});
    }
}


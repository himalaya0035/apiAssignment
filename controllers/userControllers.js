const Users = require('../models/user');
const mongoose = require('mongoose');
const { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } = require('../constants/constant');


const generateResponseObject = (code,message,error,data) => {
    return {
        code : code,
        message : message,
        error : error,
        data : data
    }
}



const getUsers = async (req,res) => {
    try {
        const users = await Users.find().sort({createdAt:-1});
        users.map(user => {
            user.birthday = new Date(user.birthday).toLocaleDateString();
        })
        res.status(STATUS_OK).json(
            generateResponseObject(STATUS_OK,"All users fetched successfully",false,users));
    }catch (error){
        res.status(STATUS_BAD_REQUEST).json(
            generateResponseObject(STATUS_BAD_REQUEST,'Bad Request',error.message,null));
    }  
}


const getUser = async (req,res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(STATUS_NOT_FOUND).json(
                generateResponseObject(STATUS_NOT_FOUND,"The format of object Id is incorrect","Invalid Id",null)
            );
        }
        const user = await Users.findById({_id:id});
        if (!user){
            return res.status(STATUS_NOT_FOUND).json(
                generateResponseObject(STATUS_NOT_FOUND,"No user found","User does not exist",null)
            );
        }
        user.birthday = new Date(user.birthday).toLocaleDateString();
        return res.status(STATUS_OK).json(
            generateResponseObject(STATUS_OK,"User found successfully",false,user)
        );
    }catch(error) {
        res.status(STATUS_BAD_REQUEST).json(
            generateResponseObject(STATUS_BAD_REQUEST,'Bad Request',error.message,null)
        );
    }
}


const createUser = async (req,res) => {
    const {age,email} = req.body;
    try {
        const user = await Users.create({...req.body});
        user.birthday = new Date(user.birthday).toLocaleDateString();
        res.status(STATUS_OK).json(
            generateResponseObject(STATUS_OK,"User created successfully",false,user)
        );
    }catch (error){
        res.status(STATUS_BAD_REQUEST).json(
            generateResponseObject(STATUS_BAD_REQUEST,'Bad Request',error.message,null)
        );
    }  
}


const deleteUser = async (req,res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(STATUS_NOT_FOUND).json(
                generateResponseObject(STATUS_NOT_FOUND,"The format of object Id is incorrect","Invalid id",null)
            );
        }
        const user = await Users.findByIdAndDelete({_id:id});
        if (!user){
            return res.status(STATUS_NOT_FOUND).json(
                generateResponseObject(STATUS_NOT_FOUND,"No user found","User does not exist",null)
            );
        }
        user.birthday = new Date(user.birthday).toLocaleDateString();
        return res.status(STATUS_OK).json(
            generateResponseObject(STATUS_OK,"User deleted successfully",false,user)
        );
    }catch (error){
        res.status(STATUS_BAD_REQUEST).json(
            generateResponseObject(STATUS_BAD_REQUEST,'Bad Request',error.message,null)
        )
    }
}

const updateUser = async (req,res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(STATUS_NOT_FOUND).json(
                generateResponseObject(STATUS_NOT_FOUND,"The format of object Id is incorrect","Invalid Id",null)
            );
        }
        const user = await Users.findByIdAndUpdate({_id:id},{
            ...req.body
        });
        if (!user){
            return res.status(STATUS_NOT_FOUND).json(
                generateResponseObject(STATUS_NOT_FOUND,"No user found","User does not exist",null)
            );
        }
        user.birthday = new Date(user.birthday).toLocaleDateString();
        return res.status(STATUS_OK).json(user);
    }catch (error){
        res.status(STATUS_BAD_REQUEST).json(
            generateResponseObject(STATUS_BAD_REQUEST,'Bad Request',error.message,null)
        )
    }
}


module.exports = {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser
}
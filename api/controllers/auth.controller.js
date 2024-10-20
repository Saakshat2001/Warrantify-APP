import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

import Product from "../models/product.model.js";
import { log } from "console";

export const signin = async(req,res) => {
    console.log(req.body , 'req body --------->>>>>>>>>>>>>>>>>>>>>>> ');
    const {email, name, password} = req.body;
    const newUser = new User({
        email,
        name,
        password
    });
    await newUser.save();
     res.status(200).json({message: 'User Created'});
 
}
export const login = async(req,res) => {

    console.log(req.body , 'login req body ---------<<<<<<<<<<<<<<<< ');
    const {email, password} = req.body;
    const validUser = await User.findOne({email , password});
    if (!validUser) {
        console.log('wrong');
        res.status(404).json({message: 'User not found' , status : 404});
      }
      else{

      //  res.status(200).json({message: 'User found'});
      
        const rest = validUser._doc;
        console.log('================' ,rest);
        
        res
        .status(200)
        .json(rest);
      }
}

export const enterproductinfo = async(req,res) => {

  console.log(req.body , 'req body for product info --------->>>>>>>>>>>>>>>>>>>>>>> ');
  const {product, brand, modelNumber , Comments , dealer , dealerContactNumber, purchaseDate , warrantyEndDate , userId} = req.body;
  const newProduct = new Product({
    product,
    brand,
    modelNumber,
    Comments,
    dealer,
    dealerContactNumber,
    purchaseDate,
    warrantyEndDate,
    userId

  });
  await newProduct.save();
   res.json({message: 'Product Created'});

}
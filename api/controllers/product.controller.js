import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

import Product from "../models/product.model.js";
console.log('console');
// import messaging from '@react-native-firebase/messaging';
import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert('./config/serviceAccountKey.json'),
    databaseURL: 'https://react-native-dream-fccff-default-rtdb.firebaseio.com'
  });


  const sendPushNotification = async (deviceToken, title, body) => {
    try {
      const message = {
        notification: {
          title: title,
          body: body,
        },
        token: deviceToken,  // The device token that the notification will be sent to
      };
  
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

export const findproductinfo = async(req,res) => {

    console.log(req.params.userId , 'req params for product info --------->>>>>>>>>>>>>>>>>>>>>>> ');
    const { userId} = req.body;
    try {
        
        const product = await Product.find(req.params);
      
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    // await newProduct.save();
    //  res.json({message: 'Product Created'});
  
  }

//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled = 
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL 
    
//     if(enabled){
//         console.log('Authorization status:' ,authStatus);
        
//     }
     
// }
//         const getToken = async() => {
//             const token = await messaging().getToken();
//             console.log("Token = " , token);
//             return token;
//         }

  export const deleteCard = async(req,res) => {

    try{
        console.log('aara ----------__>>>>>>>>>>>>>> ' , req.headers);
        
        const card = await Product.findById(req.params.cardId);
     
        const token = req.headers.authorization?.split(' ')[1];
        console.log(' toeken is ------>>>>>>>.' , token);
        if(!card){
            return res.status(404).json({ message: 'Card not found' });
        }
       // res.status(200).json({message : 'Card deleted' });
          await Product.findByIdAndDelete(req.params.cardId);
        //   await requestUserPermission()
        //   let token = await getToken()
        //   if (!token) {
        //     return res.status(500).json({ message: 'Failed to get device token for push notification' });
        // }
          const title = "Product Deleted";
          const body = `The product watchis Whaat is  has been deleted successfully.`;
          await sendPushNotification(token, title, body);
          res.status(200).json({message : 'Card has been deleted'});
          
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

export const editCard = async(req,res) => {
    try{
        const card = await Product.findById(req.params.cardId);
        // if(!card){
        //     return next(errorHandler(404 , 'Comment not found'));
        // }
     
   console.log('in edit card --------------------- ');
   
          const editedComment = await Product.findByIdAndUpdate(req.params.cardId,
            {
                product : req.body.product,
                brand : req.body.brand,
                modelNumber : req.body.modelNumber,
                Comments : req.body.Comments,
                dealer : req.body.dealer,
                dealerContactNumber : req.body.dealerContactNumber,
                purchaseDate : req.body.purchaseDate,
                warrantyEndDate : req.body.warrantyEndDate
            },
            {new : true}
          );
          res.status(200).json({message : 'Card has been edited'});

}catch(err){
    res.status(500).json({ message: 'Server error' });
    //next(err);
}
}





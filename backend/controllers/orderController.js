import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL?.trim() || "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
    });
    
    // If payment method is COD, mark payment as true immediately
    if (req.body.paymentMethod === "COD") {
      newOrder.payment = true;
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      return res.json({ 
        success: true, 
        message: "Order placed successfully with Cash on Delivery",
        orderId: newOrder._id 
      });
    }
    
    // For online payment
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const amountInPaise = Math.round(req.body.amount * 100);
    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `${newOrder._id}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(orderOptions);
    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: orderOptions.amount,
      currency: orderOptions.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
};
const verifyOrder = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment verification failed" });
    }

    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// user orders for frontend
const userOrders =async(req,res)=>{
try {
  const orders =await orderModel.find({userId:req.body.userId});
  res.json({success:true,data:orders})
} 
catch (error) {
  console.log(error);
res.json({success:false,message:"Error"})
}
}
// Listing orders for admin panel
const listOrders =async (req,res)=>{
  try {
    const orders =await orderModel.find({});
    res.json({success:true,data:orders})
  } 
  catch (error) {
console.log(error)
res.json({success:false,message:"Error"})    
  }
}

// api for updating order status
const updateStatus = async(req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Updated"})
} 
catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}
export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus};

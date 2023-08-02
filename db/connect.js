import mongoose from "mongoose"



const connectdb=(url)=>mongoose.connect(url);


export default connectdb
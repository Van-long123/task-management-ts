import mongoose from "mongoose"



// module.exports này khi dùng require 
// module.exports.connect=async ()=>{

// hàm này là async nên phải cso Promise ko reutrn gì dùng void
export const connect=async () :Promise<void> =>{ 
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('Connect Success')
        });
    } catch (error) {
        console.log('Connect Error')
    }
}
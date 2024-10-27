import User from "../models/user.model"
import {Request,Response,NextFunction} from 'express';
// nhiệm vụ middleware này kiểm tra xem ở trong header của ông fe đưa lên có chứa token ko 
// khi viết theo kiểu api thì fe luôn gửi token lên khi api này là private 
// next ()ko trả về gì cả dùng void mà async là hàm bất đồng bộ them promise
export const requireAuth=async (req:Request, res:Response,next:NextFunction):Promise<void>=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        const user=await User.findOne({
            token:token,
            deleted:false
        }).select('-password')
        if(!user){
            res.json({
                code:400,
                message:"Token không hợp lệ!"
            })
            return 
        }

        // ở req:Request thì bắt buộc phải tuân theo kiểu   req['user'] này chớ ko phải req.user 
        
        req['user']=user 
        next()
        
    }
    else{
        res.json({
            code:400,
            message:"Vui lòng gửi kèm token!"
        })
    }
    
}
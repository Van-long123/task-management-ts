import Task from "../models/task.model"
import User from "../models/user.model"
import md5 from 'md5'
import * as generateHelper from '../../../helpers/generate'
import {Request,Response,Router} from 'express';
// Request và Response được express định nghĩa sẵn

export const register = async  (req:Request, res:Response) => {
    req.body.password=md5(req.body.password)
    const existEmail=await User.findOne({
        email:req.body.email,
        deleted:false
    })
    if(existEmail){
        res.json({
            code:400,
            message:"Email đã tồn tại"
        })
    }
    else{
        // const user=new User(req.body)
        // truyền kiểu ni an toàn hơn 
        const user=new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token:generateHelper.generateRandomString(30)
        })
        await user.save()
        const token=user.token
        res.cookie('token',token)
        res.json({
            code:200,
            message:"Tạo tài khoản thành công",
            //frontend tự lưu token này vào cookies 
            token:token
        })
    }
}
export const login = async  (req:Request, res:Response) => {
    const email:string= req.body.email
    const password:string= req.body.password
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        res.json({
            code:400,
            message:"Email không tồn tại!"
        })
        return 
    }
    if(user.password!==md5(password)){
        res.json({
            code:400,
            message:"Sai mật khẩu!"
        })
        return
    }
    const token:string=user.token 
    res.cookie('token',token)
    res.json({
        code:200,
        message:"Đăng nhập thành công!",
        token:token
    })
}

export const detail = async  (req:Request, res:Response) => {
    try {
        // nếu mà token ko đúng thì user là null thôi ko lọt vào cathc
        res.json({
            code:200,
            message:"Thành công!",
            info:req['user']
        })
    } catch (error) {
        res.json({
            code:400,
        })
    }
}
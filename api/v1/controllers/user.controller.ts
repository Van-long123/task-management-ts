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
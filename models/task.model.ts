import mongoose from "mongoose"
const taskSchema=new mongoose.Schema({
    title:String,
    status:String,
    content:String,
    timeStart:Date,
    timeFinish:Date,
    deleted:{
        type:Boolean,
        default:false
    },
    taskParentId:String,
    listUser:Array,
    createdBy:{
        user_id:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    deletedAt:Date,
},
 {
    timestamps:true
 })
// export const Task=mongoose.model('Task',taskSchema,'tasks');
const Task=mongoose.model('Task',taskSchema,'tasks');
// export default thường được sử dụng khi một module chỉ có một thành phần 
// chính vì vậy nên bên kia import Task from "./models/task.model";
// còn mà export ko có dèault  là phải import {Task} from "./models/task.model";
export default Task
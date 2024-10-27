import Task from "../models/task.model"
import {Request,Response,Router} from 'express';
import paginationHelper from '../../../helpers/pagination'
import searchHelper from '../../../helpers/search'
// Request và Response được express định nghĩa sẵn

export const index = async  (req:Request, res:Response) => {
    // khi tạo object với giá trị đầu tiên là deleted:false   thì mấy thằng sau phải là boolean 
    // find['status']=req.query.status để này thì ko lỗi 
    //biến 1 giá trị sang string thì tostring 
    interface Find{
        deleted:boolean,
        status?:string,
        title?:RegExp,
    }
    const find:Find={
        deleted:false  
    }
    if(req.query.status){
        find.status=req.query.status.toString()
    }
    // sort 
    let sort={}
    // từ a-z là asc tăng dần
    if(req.query.sortKey&&req.query.sortValue){
        const sortKey=req.query.sortKey.toLocaleString()//để này cho linh động ko cần dùng inter
        sort[sortKey]=req.query.sortValue
    }
    // sort 
    //Search
    const objectSearch=searchHelper(req.query)
    if(req.query.keyword){
        find.title=objectSearch.regex;
    }
    //end search

    // Pagination 
    const countTasks=await Task.countDocuments(find); //đem qua bên kia sẽ lỗi nếu thêm async vào trước function cũng lỗi vì bên này có 1 async rồi
    let objectPagination=paginationHelper(req.query,countTasks,
        // truyền object sang vì thằng này tách ra để dùng chung ví dụ này hiển thị 4 mà bên product client hiển thị 6 sản phẩm thì sao 
        {
            currentPage:1,
            limitItems:2
        }
    );
    // end Pagination 
    const tasks=await Task.find(find).sort(sort).limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    res.json(tasks)
}
export const detail = async  (req:Request, res:Response) => {
    try {
        const id: string=req.params.id
        const task=await Task.findOne({
            _id:id,
            deleted:false
        })
        res.json(task)//lúc này chỉ cần front nó truy cập vào link /task này ta sẽ trả cho ổng ấy chuỗi json
    } catch (error) {
        res.json("ko tìm thấy")
    }
}

export const changeStatus=async (req:Request, res:Response)=>{
    try {
        const id:string=req.params.id
        const status:string=req.body.status
        await Task.updateOne({
            _id:id,
        },{
            status:status
        })
        res.json({
            code:200,
            message:"cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Ko tồn tại"
        })
    }
}

export const changeMulti=async (req:Request, res:Response)=>{
    try {
        const ids:string[]=req.body.ids;
        const key:string=req.body.key;
        const value:string =req.body.value;

        // làm enum để gõ sai key khác sẽ báo lỗi 
        enum Key{
            STATUS='status',
            DELETE='delete'
        }
        switch(key) {
            case Key.STATUS:
                await Task.updateMany({ _id: { $in : ids } }, { status:value})
                res.json({
                    code:200,
                    message:"Cập nhật trạng thái thành công"
                })
                break;
            case Key.DELETE:
                await Task.updateMany({ _id: { $in : ids } }, { deleted:true,deletedAt:new Date()})
                res.json({
                    code:200,
                    message:"Xóa thành công"
                })
                break;
            default:
                res.json({
                    code:401,
                    message:"Ko tồn tại"
                })
                break;
        }
        
    } catch (error) {
        res.json({
            code:400,
            message:"Ko tồn tại"
        })
    }
}

export const create=async (req:Request, res:Response)=>{
    try {
        if(req.body.taskParentId){
            const taskParent=await Task.findOne({
                _id:req.body.taskParentId
            })
            if(!taskParent){
                res.json({
                    code:400,
                    message:"Task cha không tồn tại!",
                })
                return 
            }
        }
        const task=new Task(req.body)
        await task.save()
        
        res.json({
            code:200,
            message:"Tạo thành công!",
            data:task
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi!",
        })
    }
}
import Task from "../models/task.model"
import {Request,Response,Router} from 'express';
import paginationHelper from '../../../helpers/pagination'
// Request và Response được express định nghĩa sẵn

export const index = async  (req:Request, res:Response) => {
    // khi tạo object với giá trị đầu tiên là deleted:false   thì mấy thằng sau phải là boolean 
    // find['status']=req.query.status để này thì ko lỗi 
    //biến 1 giá trị sang string thì tostring 
    interface Find{
        deleted:boolean,
        status?:string
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

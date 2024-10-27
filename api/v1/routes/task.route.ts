import express, {Request,Response,Router} from 'express';
// const router=express.Router(); //c1
const router:Router=Router(); //c2 
import Task from "../models/task.model"
import * as controller from '../controllers/task.controller'
router.get('/',controller.index)

// //chi tiết công việc
router.get('/detail/:id',controller.detail)
router.patch('/change-status/:id',controller.changeStatus)
router.patch('/change-multi',controller.changeMulti)

router.post('/create',controller.create)
router.patch('/edit/:id',controller.edit)
router.delete('/delete/:id',controller.deleteTask)






// router.get('/',async  (req:Request, res:Response) => {
//     const tasks=await Task.find({
//         deleted:false  
//     })
//     res.json(tasks)
// })
// router.get('/detail/:id',async  (req:Request, res:Response) => {
//     try {
//         const id: string=req.params.id
//         const task=await Task.findOne({
//             _id:id,
//             deleted:false
//         })
//         res.json(task)//lúc này chỉ cần front nó truy cập vào link /task này ta sẽ trả cho ổng ấy chuỗi json
//     } catch (error) {
//         res.json("ko tìm thấy")
//     }

// })
export const taskRoutes:Router = router
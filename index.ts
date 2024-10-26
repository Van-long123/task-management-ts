import express, {Express,Request,Response} from "express"
import dotenv from "dotenv"
dotenv.config()
// * có nghĩa là trong file database có hàm gì thì nó sẽ import ra hết 
import * as database from "./config/database";

database.connect();
const app:Express = express();
const port:number|string=process.env.PORT || 3000
//Request và Response được express định nghĩa sẵn
import Task from "./models/task.model";
app.get('/tasks',async  (req:Request, res:Response) => {
    const tasks=await Task.find({
        deleted:false  
    })
    res.json(tasks)
})

app.get('/tasks',async  (req:Request, res:Response) => {
    const tasks=await Task.find({
        deleted:false  
    })
    res.json(tasks)
})
app.get('/tasks/detail/:id',async  (req:Request, res:Response) => {
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

})
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})
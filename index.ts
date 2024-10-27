import express, {Express,Request,Response} from "express"
import dotenv from "dotenv"
dotenv.config()
// * có nghĩa là trong file database có hàm gì thì nó sẽ import ra hết 
import * as database from "./config/database";
import mainV1Routes from "./api/v1/routes/index.route";

database.connect();
const app:Express = express();
const port:number|string=process.env.PORT || 3000
mainV1Routes(app)
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})
interface objectSearch{
    keyword:string,
    regex?:RegExp,
}
// Record<string, any> là một kiểu giúp định nghĩa một đối tượng có các key là string và value là bất kỳ kiểu dữ liệu nào (any).
const searchHelper =(query:Record<string,any>):objectSearch=>{
    let objectSearch:objectSearch={
        keyword:"",
    };
    if(query.keyword){
        objectSearch.keyword=query.keyword.trim();
        objectSearch.regex=new RegExp(objectSearch.keyword,"i");//RegExp(key) dùng để tìm kiếm trong 1 chuỗi có đúng chữ ta search 
    }
    return objectSearch
}
export default searchHelper
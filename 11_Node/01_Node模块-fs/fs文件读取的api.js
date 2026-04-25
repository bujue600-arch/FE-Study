const fs = require("fs")

//1、同步读取文件
const res1=fs.readFileSync("./abc.txt","utf-8")
console.log(res1)
console.log("后续代码")

//2、异步读取文件
fs.readFile("./abc.txt","utf-8",(err,res2)=>{
    if(err){
        console.log("读取文件失败",err)
    }else{
        console.log(res2)
    } 
})
console.log("后续代码")

//3、Promise方式读取文件
fs.promises.readFile("./abc.txt","utf-8").then(res3=>{
    console.log(res3)
}).catch(err=>{
    console.log("读取文件失败",err)
})
console.log("后续代码")
require('dotenv').config();
const PORT=process.env.PORT;
const express=require('express');
const app=express();
const path=require('path');
 
// My modules
const DB=require('./config.js');

app.use(express.json({limit: '50MB', extended: true}));

app.use('/',(req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Content-Type, Accept");
    next();
});
app.post('/set-array', async(req,resp)=>{
    try{
        let get_categories=await DB.pool.query('SELECT * FROM game WHERE name=?',[req.body.name]);
        if(get_categories[0].length!==0){
            await DB.pool.query('UPDATE game SET last_win_sum=?, last_win_img_sum=? WHERE name=?',[req.body.lastWinSum,req.body.lastWinImgSum,req.body.name]);
        }
        else{
            await DB.pool.query('INSERT INTO game (last_win_sum,last_win_img_sum,name) VALUE (?,?,?)',[req.body.lastWinSum,req.body.lastWinImgSum,req.body.name]);
        }
        return resp.json({success:true});
    }
    catch(err){  
        console.log(err)
        return resp.status(403).json({ err:err.message});
    }
})

app.post('/get-array', async(req,resp)=>{
    try{
        let get_categories=await DB.pool.query('SELECT * FROM game WHERE name=?',[req.body.name]);
        let data=get_categories[0][0];
        return resp.json({data});
    }
    catch(err){
        return resp.status(403).json({ err:err.message});
    }
})


app.listen(PORT);
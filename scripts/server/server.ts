import express from 'express';
import * as fs from 'fs';

const app = express();
app.get('/', (req,res)=>{
    res.send("string");
})

app.listen(8080);
// const express = require('express');
import express from 'express'; //because in package.json we define thr type module
// const multer = require('multer');
import multer from 'multer';
// const cors = require('cors');
import cors from 'cors';
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import {exec} from 'child_process';
import { stderr, stdout } from 'process';
import 'dotenv/config';

const app = express();
const port=process.env.PORT;

//multer middleware
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
    }
})

//multer configuration
const upload = multer({storage: storage});

app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:5173"],
        credentials: true,
    })
)

//middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  //Imp
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    return res.json({message: "Hello Its working"})
})

app.post("/upload", upload.single('file'), function(req, res){
    // console.log("file uploaded");
    const lessionId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/courses/${lessionId}`;
    const hlsPath = `${outputPath}/index.m3u8`;
    console.log('hlsPath', hlsPath);

    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath, {recursive: true})
    }

    //ffmpeg {magic part}
    // command to convert video to HLS format using ffmpeg

  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  // run the ffmpeg command; usually done in a separate process (queued)
  //No queue because of POC, not to be used in production
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if(error){
        console.log(`exec error:, ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    const videoUrl = `http://localhost:${port}/uploads/courses/${lessionId}/index.m3u8`;

    res.json({
        message: "Videos converted to HLS format",
        videoUrl: videoUrl,
        lessionId: lessionId,
    })
  })

})

app.listen(port, (req, res) => {
    console.log("server is started");
})
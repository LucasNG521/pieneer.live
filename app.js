#!/usr/bin/nodejs

const express = require("express");
const device = require("express-device");
const setupPassport = require("./passport")
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
// var multer = require('multer'); 


setupPassport(app);

const router = require('./routes/viewRoutes')(express);

const SocketIOConnection = require("./sockets/socket-connection");
const socketIOConnection = new SocketIOConnection(http);
socketIOConnection.router();

const ViewRouter = require("./routes/viewRoutes");
const ApiRouter = require('./routes/apiRoutes');

const ImageActions = require('./databaseActions/imageActions');
const FolderActions = require('./databaseActions/folderActions');
const DatabaseActions = require('./databaseActions/databaseActions');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data


app.use(device.capture());
app.use(express.static(__dirname + "/public"));

// file upload
const upload_path = './public/slides/';

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.post("/slides/upload-ppt", (req, res) => {
    var ext = req.files.file.name.split('.').pop();
    var md5_name = req.files.file.md5 + '.' + ext;
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    else {
        console.log('uploading ' + req.files.file.name);
    }
    console.log(req.files.file);
    req.files.file.mv(upload_path + md5_name, function (err) {
        if (err)
            return res.status(500).send(err);
        console.log(md5_name + ' uploaded');
        // TODO: convert ppt to jpeg https://github.com/w3nl/ppt-png
        res.send(md5_name);
    });
});
app.post("/slides/upload-image", (req, res) => {
    var ext = req.files.file.name.split('.').pop();
    var md5_name = req.files.file.md5 + '.' + ext;
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    else {
        console.log('uploading ' + req.files.file.name);
    }
    console.log(req.files.file);
    req.files.file.mv(upload_path + md5_name, function (err) {
        if (err)
            return res.status(500).send(err);
        console.log(md5_name + ' uploaded');
        res.send(md5_name);
    });
});

const config = require('./knexfile').development;
const knex = require('knex')(config);

// app.use("/", new ViewRouter().router());
app.use('/', router);
app.use('/api', new ApiRouter(new ImageActions(), new FolderActions(), new DatabaseActions(knex)).router());

 
http.listen(8181, () => console.log("App is running on 8181"));
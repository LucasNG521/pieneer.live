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
// dk api
var user_id = 1;  //req.xxx.id
app.post("/api_dk/presentation", (req, res) => {
    knex('dk_presentation')
        .insert({ "users_id": user_id }).returning("id")
        .then((id) => {
            var id = id.pop();
            var json = `{
                "title": "",
                "id": ${id},
                "location": "",
                "date": "",
                "speaker":"",
                "email":"",
                "phone":"",
                "slides": []
            }`;
            knex('dk_presentation')
                .where('id', id)
                .update('json', json)
                .then(() => {
                    res.json(JSON.parse(json));
                });
        });
});
app.get("/api_dk/presentation/", (req, res) => {
    knex('dk_presentation')
        .where('users_id', user_id)
        .then((presentations) => {
            for (presentation of presentations) {
                presentation.image_link = '/slides/sample.jpg';
                var json = JSON.parse(presentation.json);
                if (json.slides) {
                    for (slide of json.slides) {
                        if (slide.type == 'image') {
                            presentation.image_link = slide.link;    // get first image as cover
                            break;
                        }
                    }
                }
                delete presentation.json;
            }
            res.json(presentations);
        });
});
app.get("/api_dk/presentation/:id", (req, res) => {
    knex('dk_presentation')
        .where('id', req.params.id)
        .then((data) => {
            data = data.pop();
            res.json(JSON.parse(data.json));
        });
});
app.put("/api_dk/presentation/:id", (req, res) => {
    var json = req.body;
    knex('dk_presentation')
        .where('id', req.params.id)
        .update('title', json.title)
        .update('json', JSON.stringify(json))
        .then(() => {
            res.send('presentation saved');
        });
});
app.post("/api_dk/poll", (req, res) => {
    knex('dk_poll')
        .insert({ "vote0": 0, "vote1": 0, "vote2": 0, "vote3": 0, "vote4": 0, "vote5": 0 }).returning("id")
        .then((id) => {
            var id = id.pop();
            res.send('' + id);
        });
});
app.get("/api_dk/poll/:id", (req, res) => {
    knex('dk_poll')
        .where('id', req.params.id)
        .then((data) => {
            var data = data.pop();
            res.send({ data: [data.vote0, data.vote1, data.vote2, data.vote3, data.vote4, data.vote5] });
        });
});
app.get("/api_dk/q_a/:presentation_id", (req, res) => {
    knex('dk_q_a')
        .where('presentation_id', req.params.presentation_id)
        .orderBy('likes', 'desc')
        .then((data) => {
            res.json(data);
        });
});

const config = require('./knexfile').development;
const knex = require('knex')(config);

const SocketIOConnection = require("./sockets/socket-connection");
const socketIOConnection = new SocketIOConnection(http, knex);
socketIOConnection.router();

// app.use("/", new ViewRouter().router());
app.use('/', router);
app.use('/api', new ApiRouter(new ImageActions(), new FolderActions(), new DatabaseActions(knex)).router());


http.listen(8181, () => console.log("App is running on 8181"));
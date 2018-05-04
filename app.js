const express = require('express');
const device = require('express-device');
const bodyParser = require('body-parser');
const app = express();

app.use(device.capture());
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    if (req.device.type == 'desktop') {
        res.redirect('html_mock-up/desktop/');
    } else {
        res.redirect('html_mock-up/mobile/');
    }
});

app.listen(8181);
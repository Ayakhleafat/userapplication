const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 9000;

app.get('/', function(req, res) {
    res.send("start my server");
});

app.get('/listUsers', function(req, res) {
    var data = fs.readFileSync(__dirname + "/users.json"); //as byte
    res.send(String(data));
});

app.get('/user/:id', function(req, res) {
    var arr = ["1", "2", "3"];
    if (arr.includes(String(req.params.id))) {
        var data = fs.readFileSync(__dirname + "/users.json"); //as byte
        data = JSON.parse(String(data));
        console.log(data);
        var user = data['user' + req.params.id];
        console.log(user);
        res.send(user);
    } else {
        res.send("user id error");
    }
});

app.delete('/deleteUser/:id', function(req, res) {
    var data = fs.readFileSync(__dirname + "/users.json"); //as byte
    data = JSON.parse(String(data));
    delete data['user' + req.params.id];
    res.send(data);
});

app.post('/addUser', express.urlencoded({ extended: true }), function(req, res) {
    var newUser = {
        name: "",
        password: "",
        profession: ""
    };
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    var data = fs.readFileSync(__dirname + "/users.json"); //as byte
    data = JSON.parse(String(data));
    data['user4'] = newUser;
    res.send(data);
});

const server = app.listen(PORT, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server is running on http://${host}:${port}`);
});

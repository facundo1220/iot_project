
var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/datos';

xhr.open('POST', url, true);

xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

var obj = new Object();
obj.idnodo = 1;
obj.temperatura  = 26;
obj.humedad = 70;
obj.timestamp = "12-20-2000/3-13-5";
obj.id_invernadero = 1;

var json= JSON.stringify(obj);

console.log(json);

xhr.send(json);

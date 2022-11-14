

var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/alerta';

xhr.open('DELETE', url, true);

xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

var obj = new Object();
obj.id_alerta  = 2;

var json= JSON.stringify(obj);

console.log(json);

xhr.send(json);

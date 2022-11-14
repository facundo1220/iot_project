
var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/usuario';

xhr.open('GET', url, true);

var t=0;

xhr.addEventListener('readystatechange', function() {

  t=t+1;

  if (t==3) {

    var resp=xhr.responseText;

    respid = resp.split(/{"id_user":|,/);
    respuser = resp.split(/"user":"|",/);
    resppas = resp.split(/"password":"|",/);
    resprol = resp.split(/"rol":"|"}/);

    var id_user=[];
    var user=[];
    var password=[];
    var rol=[];

    for (var i = 1; i < respid.length; i=i+5) {

      id_user.push(respid[i]);

    }

    for (var i = 1; i < respuser.length; i=i+3) {

      user.push(respuser[i]);

    }

    for (var i = 2; i < resppas.length; i=i+3) {

      password.push(resppas[i]);

    }

    for (var i =1 ; i < resprol.length; i=i+2) {

      rol.push(resprol[i]);

    }

    console.log(id_user);
    console.log(user);
    console.log(password);
    console.log(rol);

  }

});

xhr.send();

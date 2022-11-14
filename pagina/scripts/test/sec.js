

var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/seccion';

xhr.open('GET', url, true);

var t=0;

xhr.addEventListener('readystatechange', function() {

  t=t+1;

  if (t==3) {

    var resp=xhr.responseText;

    respuser = resp.split(/":"|"}/);

    var user=[];

    for (var i = 1; i < respuser.length; i=i+2) {

      user.push(respuser[i]);

    }


    console.log(user);

  }

});

xhr.send();

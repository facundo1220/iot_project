
var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/datos';

xhr.open('GET', url, true);

var t=0;

xhr.addEventListener('readystatechange', function() {

  t=t+1;

  if (t==3) {

    var resp=xhr.responseText;

    respidd = resp.split(/"id":|,/);
    resptemp = resp.split(/"temperatura":|,/);
    respbp = resp.split(/"pulso":|,/);
    resppos = resp.split(/"orientacion":|,/);
    resptime = resp.split(/"timestamp":|,/);
    respbebe = resp.split(/"idbebe":|}/);

    var id=[];
    var temperature=[];
    var bpm=[];
    var position=[]
    var timestamp=[];
    var baby=[];

    for (var i = 1; i < respidd.length; i=i+7) {

      id.push(respidd[i]);

    }

    for (var i = 2; i < resptemp.length; i=i+7) {

      temperature.push(resptemp[i]);

    }

    for (var i = 3; i < respbp.length; i=i+7) {

      bpm.push(respbp[i]);

    }


    for (var i = 4; i < resppos.length; i=i+7) {

      position.push(resppos[i]);

    }


    for (var i = 5; i < resptime.length; i=i+7) {

      timestamp.push(resptime[i]);

    }

    for (var i = 1; i < respbebe.length; i=i+2) {

      baby.push(respbebe[i]);

    }

    console.log(baby);


  }

});

xhr.send();

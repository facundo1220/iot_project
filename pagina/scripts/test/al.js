
function main(){

var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/alerta';

xhr.open('GET', url, true);

var t=0;

xhr.addEventListener('readystatechange', function() {

  t=t+1;

  if (t==3) {

    var resp=xhr.responseText;

    respidd = resp.split(/"idalerta":|,"estado"/);
    respesta = resp.split(/"estado":"|",/);
    respval = resp.split(/"valor":|,/);
    resptime = resp.split(/"timestamp_alerta":"|",/);
    respid = resp.split(/"bebeid":|}/);

    var id=[];
    var status=[];
    var value=[];
    var timestamp=[];
    var baby=[];

    for (var i = 1; i < respesta.length; i=i+3) {

      status.push(respesta[i]);

    }

    for (var i = 3; i < respval.length; i=i+6) {

      value.push(respval[i]);

    }

    for (var i = 2; i < resptime.length; i=i+3) {

      timestamp.push(resptime[i]);

    }

    for (var i = 1; i < respid.length; i=i+2) {

      baby.push(respid[i]);

    }

    for (var i = 1; i < respidd.length; i=i+2) {

      id.push(respidd[i]);

    }

    console.log(id);
    console.log(status);
    console.log(value);
    console.log(timestamp);
    console.log(baby);


  }

});

xhr.send();
}

main();

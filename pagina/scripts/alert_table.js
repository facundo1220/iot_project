
function table(){

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/alerta';

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

      // Modify Table

      var table = document.getElementById("alert_table");

      for (var i = 0; i < status.length; i++) {

        var row = table.insertRow(i+1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.innerHTML = id[i];
        cell1.innerHTML = status[i];
        cell2.innerHTML = value[i];
        cell3.innerHTML = timestamp[i];

        var idd= id[i];

        var inner='<a style="color: red" onclick="delete_row('+idd.toString()+')"  href=" " >Delete</a>'

        cell4.innerHTML =inner;
      }

    }

  });

  xhr.send();

}

function delete_row(idd) {

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/alerta';

  xhr.open('DELETE', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var obj = new Object();

  obj.idalerta  = idd;

  var json= JSON.stringify(obj);

  xhr.send(json);

  alert('Alert deleted')

  location.reload();

}

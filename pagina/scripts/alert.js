
function al(){

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

      // Modify alerts

      var status_temp='Good';
      var status_pos='Good';
      var status_bpm='Good';

      for (var i = 0; i < status.length; i++) {

        if (status[i]=='Temperature alert') {

          status_temp='Temperature alert';

        }

        if (status[i]=='Position alert') {

          status_hum='Position alert';

        }

        if (status[i]=='BPM alert') {

          status_bpm='BPM alert';

        }

      }

      if (status_temp=='Good' && status_pos=='Good'&& status_bpm=='Good' ) {

        document.getElementById("gen_status").innerHTML='Good';
        document.getElementById("temp_status").innerHTML='Good';
        document.getElementById("pos_status").innerHTML='Good';
        document.getElementById("pbm_status").innerHTML='Good';

      }

      if (status_temp=='Temperature alert') {

        document.getElementById("gen_status").innerHTML='<a style="color: red" href="admin_alert.html" >Alert</a>';
        document.getElementById("temp_status").innerHTML=status_temp;

      }

      if (status_hum=='Position alert') {

        document.getElementById("gen_status").innerHTML='<a style="color: red"  href="admin_alert.html" >Alert</a>';
        document.getElementById("pos_status").innerHTML=status_hum;

      }

      if (status_bpm=='BPM alert') {

        document.getElementById("gen_status").innerHTML='<a style="color: red"  href="admin_alert.html" >Alert</a>';
        document.getElementById("pbm_status").innerHTML=status_bpm;

      }

    }

  });

  xhr.send();

}

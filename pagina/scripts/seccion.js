
function validation() {

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/seccion';

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


      if (user.length==0) {

        window.location.href='index.html';

      }

      else {

        document.getElementById('usersec').innerHTML=user[0];
        document.getElementById('usersec').value=user[0];

      }

    }

  });

  xhr.send();

}

function delete_seccion(){

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/seccion';

  xhr.open('DELETE', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var obj = new Object();

  obj.user  = document.getElementById('usersec').value;

  var json= JSON.stringify(obj);

  console.log(json);

  xhr.send(json);

  window.location.href="index.html"

}

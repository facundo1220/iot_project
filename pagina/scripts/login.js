
function login(){

  usert=document.getElementById('user').value;
  passwordt=document.getElementById('password').value;

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/usuario';

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

      var p = 0;
      var r;

      var idd;

      for (var i = 0; i < user.length; i++) {

        console.log(user[i]);

        if (usert==user[i] && passwordt==password[i]) {

          p = user.length;
          r=rol[i];

        }

      }

      if (p==user.length && r=='admin') {

        post_seccion ();

        window.location.href='admin_general.html';

      }

      else if (p==user.length && r=='user') {

        post_seccion ();

        window.location.href='user_general.html';

      }

      else {

        alert('The user or password are incorrect. Try again');

      }

    }

  });

  xhr.send();

}

function post_seccion (){

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/seccion';

  xhr.open('POST', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  usert=document.getElementById('user').value;

  var obj = new Object();
  obj.user = usert;

  var json= JSON.stringify(obj);

  console.log(json);

  xhr.send(json);

}

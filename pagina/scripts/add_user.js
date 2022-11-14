
function save_user() {

  usert=document.getElementById('new_user').value;
  passwordt=document.getElementById('new_password').value;

  rolt=document.getElementById('rolselect').value;

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/usuario';

  xhr.open('POST', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var obj = new Object();
  obj.user = usert;
  obj.password  = passwordt;
  obj.rol = rolt;

  var json= JSON.stringify(obj);

  console.log(json);

  xhr.send(json);

  alert('User saved');

  location.reload();

}


function user(){

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

      // Modify Table

      var table = document.getElementById("user_table");

      for (var i = 0; i < user.length; i++) {

        var row = table.insertRow(i+1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.innerHTML = id_user[i];
        cell1.innerHTML = user[i];
        cell2.innerHTML = password[i];
        cell3.innerHTML = rol[i];

        var idd= user[i];

        var inner='<a style="color: red" onclick="delete_user(\''+ idd.toString()+'\')"  href=" " >Delete</a> / <a style="color: Green" data-toggle="modal" data-target="#modalmodify"  href=" " >Modify</a>';

        cell4.innerHTML =inner+`

        <div class="modal fade" id="modalmodify" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modify user</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div class="modal-body">

                <br>

                <div class="form-floating">

                  <input type="text" class="form-control text-center" id="mod_user" placeholder="User" required>

                </div>

                <br>

                <div class="form-floating">

                  <input type="password" class="form-control text-center" id="mod_password" placeholder="Password" required>

                </div>

                <br>

                <div class="form-floating">

                  <input type="number" class="form-control text-center" id="mod_id" placeholder="id" required>

                </div>

                <br>

                <div class="form-group">

                  <select class="form-control text-center" id="modrolselect">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>

                </div>

              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="mod_userr()">Modify</button>
              </div>
            </div>
          </div>
        </div>

        `;

      }

    }

  });

  xhr.send();

}

function mod_userr() {

  usert=document.getElementById('mod_user').value;
  passwordt=document.getElementById('mod_password').value;
  idt=document.getElementById('mod_id').value;

  rolt=document.getElementById('modrolselect').value;

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/usuario';

  xhr.open('PUT', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var obj = new Object();
  obj.user = usert;
  obj.password  = passwordt;
  obj.rol = rolt;
  obj.id_user=parseInt(idt);

  var json= JSON.stringify(obj);

  xhr.send(json);

  alert('User modified');

  location.reload();

}

function data() {

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/datos';

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


      // Modify Table

      var table = document.getElementById("data_table");

      for (var i = 0; i < temperature.length; i++) {

        var row = table.insertRow(i+1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);

        cell0.innerHTML = id[i];
        cell1.innerHTML = temperature[i];
        cell2.innerHTML = bpm[i];
        cell3.innerHTML = position[i];
        cell4.innerHTML = timestamp[i];

        var idd= id[i];

        var inner='<a style="color: red" onclick="delete_row_data('+idd.toString()+')"  href=" " >Delete</a>';

        cell5.innerHTML =inner;
      }

    }

  });

  xhr.send();

}

function delete_user(userr) {

  alert('User deleted');

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/usuario';

  xhr.open('DELETE', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var obj = new Object();

  obj.user = userr;

  var json= JSON.stringify(obj);

  xhr.send(json);

}

function delete_row_data(idd) {

  alert('Data deleted')

  var xhr = new XMLHttpRequest();

  var url = 'http://20.93.0.27:3000/datos';

  xhr.open('DELETE', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var obj = new Object();

  obj.id  = idd;

  var json= JSON.stringify(obj);

  xhr.send(json);

}

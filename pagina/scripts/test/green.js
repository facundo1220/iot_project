
function main(){

var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();

var url = 'http://localhost:3000/invernadero';

xhr.open('GET', url, true);

var t=0;

xhr.addEventListener('readystatechange', function() {

  t=t+1;

  if (t==3) {

    var resp=xhr.responseText;

    respcul = resp.split(/"cultivo":"|",/);
    resptempmax = resp.split(/"valor_max_temp":|,/);
    resptempmin = resp.split(/"valor_min_temp":|,/);
    resphummin = resp.split(/"valor_min_hum":|,/);
    resfas = resp.split(/"fase_cultivo":"|"}/);

    var culti=respcul[1];
    var temp_max=resptempmax[2];
    var temp_min=resptempmin[3];
    var hum_min=resphummin[4];
    var fase=resfas[1];

    console.log(culti);
    console.log(temp_max);
    console.log(temp_min);
    console.log(hum_min);
    console.log(fase);

  }

});

xhr.send();
}

main();

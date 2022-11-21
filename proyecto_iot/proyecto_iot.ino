
// Librerias para wifi, cliente http y creacion de json

#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

// ssid y password de la red wifi que conectaremos el esp32

const char* ssid = "IphoneFacundo";
const char* password = "Valentina";

// Librerias para el uso del sensor de temperatura DHT11

#include "DHT.h"

#define DHTPIN 4 // Estara conectado en el pin 4

#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// variables para el calculo de latidos por minuto

float factor = 0.75;    // coeficiente para filtro pasa bajos
float maximo = 0.0;   // para almacenar valor maximo 
int minimoEntreLatidos = 300; // 300 mseg. de tiempo minimo entre latidos
float valorAnterior = 500;  // para almacenar valor previo
int latidos = 0;    // contador de cantidad de latidos

// Libreria para adquirir timestamp por suscripcion a un servidor NTP

#include <NTPClient.h>

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "co.pool.ntp.org", 3600, 60000);


// Librerias para giroscopio

#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;

double orientacion=0;

// setup

void setup() {
  
  Serial.begin(115200); 

  // Set up del wifi
  
  setup_wifi();
  delay(1500);

  // Inicializacion del sensor DHT11
  
  dht.begin();

  // Inicializacion cliente tiempo con ajuste de offset de zona horaria

  timeClient.begin();
  timeClient.setTimeOffset(-18000);

  // Inicializacion del giroscopio

  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
 
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);

  mpu.setFilterBandwidth(MPU6050_BAND_5_HZ);
  
}

// setup del wif

void setup_wifi() {
  
  delay(10); 
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}

// loop

void loop() {

  // Calculo de pulsos por minuto y orientacion

  int pu=0;

  int bpm=0;

  while(pu==0){

    // Medicion del pulso
  
    static unsigned long tiempoLPM = millis();  // tiempo Latidos Por Minuto con
              // valor actual devuelto por millis()
    static unsigned long entreLatidos = millis(); // tiempo entre Latidos con
              // valor actual devuelto por millis()
  
    int valorLeido = analogRead(36);    // lectura de entrada analogica A0
  
    float valorFiltrado = factor * valorAnterior + (1 - factor) * valorLeido; // filtro pasa bajos
    float cambio = valorFiltrado - valorAnterior;   // diferencia entre valor filtrado y
                // valor anterior
    valorAnterior = valorFiltrado;    // actualiza valor anterior con valor filtrado
  
    if ((cambio >= maximo) && (millis() > entreLatidos + minimoEntreLatidos)) { // si cambio es
            // es mayor o igual a maximo y pasaron al menos 300 mseg.
      maximo = cambio;      // actualiza maximo con valor de cambo
      entreLatidos = millis();    // actualiza variable entreLatidos con millis()
      latidos++;        // incrementa latidos en uno
      //Serial.println(latidos);
    }
    
    maximo = maximo * 0.97;   // carga maximo como el 97 por ciento de su propio
            // valor para dejar decaer y no perder pulsos
  
    if (millis() >= tiempoLPM + 20500) {    // si transcurrieron al menos 15 segundos
      bpm=latidos*4;
      pu=1;
      latidos = 0;        // coloca contador de latidos en cero
      tiempoLPM = millis();     // actualiza variable con valor de millis()
    }

    // Medicion del orientacion

    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);

    double vy=((g.gyro.y)*57.2857);

    if (vy==0){
  
      orientacion=orientacion;
      
      }
  
    else{
      
      orientacion=(orientacion+(vy*0.05))-0.04;
      
      }
    
    delay(50);        // demora entre lecturas de entrada analogica
    
  }

  // variable de lectura de temperatura
 
  int temp = dht.readTemperature();

  // Estimacion del timestamp

  timeClient.update();

  time_t epochTime = timeClient.getEpochTime();
  
  String formattedTime = timeClient.getFormattedTime();   
  
  struct tm *ptm = gmtime ((time_t *)&epochTime); // Estructura de tiempo

  int monthDay = ptm->tm_mday;

  int currentMonth = ptm->tm_mon+1;

  int currentYear = ptm->tm_year+1900;
  
  String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay); // Fecha

  String timestamp=currentDate+"/"+formattedTime;

  // Creacion del json

  String variable;
  
  DynamicJsonDocument doc(1024);
  
  doc["temperatura"] = temp;
  doc["pulso"] = bpm;
  doc["orientacion"]=orientacion;
  doc["timestamp"] = timestamp;
  doc["idbebe"] = 1;
  
  serializeJson(doc, variable);
  Serial.println("dato a enviar: "+ variable);

  // Envio de datos por HTTP
  
  HTTPClient http;
  WiFiClient client;
  
  // Ruta donde se enviaran los datos
  
  http.begin(client, "http://20.93.0.27:3000/datos");
  
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(variable);
  String payload = http.getString();
  Serial.println(httpCode);
  Serial.println(payload);
  http.end();
}

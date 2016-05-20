var w, h;
var minLat;
var maxLat;
var minLng;
var maxLng;
var dist;
var resSpace;

var numberSquare = 2000; //maximum number of square polygons on the screen
var intensityMap, intensityCount, distSum;

var jsonSensors =
  '{' + 
    '"width": 4,' +
    '"height": 3,' +
    '"dist": 0.04,' +
    '"sensors": [' + 
      '{"id": 0, "lat": -23.56, "lng": -46.65, "hsl": [120, 100, 50], "opacity": 0.7},' +
      '{"id": -1, "lat": -23.56, "lng": -46.61, "hsl": [0, 100, 100], "opacity": 0},' +
      '{"id": 1, "lat": -23.56, "lng": -46.57, "hsl": [60, 100, 50] , "opacity": 0.4},' +
      '{"id": 2, "lat": -23.56, "lng": -46.53, "hsl": [60, 100, 50] , "opacity": 0.75},' +
      '{"id": -1, "lat": -23.6, "lng": -46.65, "hsl": [0, 100, 100], "opacity": 0},' +
      '{"id": 3, "lat": -23.6, "lng": -46.61, "hsl": [0, 100, 50], "opacity": 0.9},' +
      '{"id": 4, "lat": -23.6, "lng": -46.57, "hsl": [120, 100, 50], "opacity": 0.4},' +
      '{"id": 5, "lat": -23.6, "lng": -46.53, "hsl": [60, 100, 50] , "opacity": 0.6},' +
      '{"id": -1, "lat": -23.64, "lng": -46.65, "hsl": [0, 100, 100], "opacity": 0},' +
      '{"id": 6, "lat": -23.64, "lng": -46.61, "hsl": [120, 100, 100], "opacity": 0.6},' +
      '{"id": 7, "lat": -23.64, "lng": -46.57, "hsl": [60, 100, 50] , "opacity": 0.5},' +
      '{"id": -1, "lat": -23.64, "lng": -46.53, "hsl": [0, 100, 50], "opacity": 0}' +
    ']' +
  '}';

function initVars(){
  var mapSensors = JSON.parse(jsonSensors);
  w = mapSensors.width+1;
  h = mapSensors.height+1;
  dist = mapSensors.dist;
  intensityMap = new Array(h);
  for(var i=0;i<h;i++){
    intensityMap[i] = new Array(w);
    for(var j=0;j<w;j++){
      intensityMap[i][j] = mapSensors.sensors[i*w+j];
    }
  }
  maxLat = intensityMap[0][0].lat;
  maxLng = intensityMap[h-1][w-1].lng;
  minLng = intensityMap[0][0].lng;
  minLat = intensityMap[h-1][w-1].lat;
}

function interpolateColor(c1, c2, fraction) {
  var color = [];
  for (var i = 0; i < 3; i++) {
    // Calculate color based on the fraction.
    color[i] = (c1[i] - c2[i]) * fraction + c2[i];
  }
  return color;
}

function convertCoordinates(lat, lng, scaledW, scaledH){
  var i = Math.floor(scaledH*(lng-minLng)/(maxLng-minLng));
  var j = Math.floor(scaledW*(lat-minLat)/(maxLat-minLat));
  return{
    "i": i,
    "j": j
  }
}


function interpolate(s1, s2, s3, s4, frac1, frac2) {
  var c1 = [];
  var c2 = [];
  var op1, op2;
  
  for (var i = 0; i < 3; i++) {
    // Calculate color based on the fraction.
    c1[i] = (s2.hsl[i] - s1.hsl[i]) * frac2 + s1.hsl[i];
    c2[i] = (s4.hsl[i] - s3.hsl[i]) * frac2 + s3.hsl[i];
  }
  op1 = (s2.opacity - s1.opacity) * frac2 + s1.opacity;
  op2 = (s4.opacity - s3.opacity) * frac2 + s3.opacity;

  var color = [];
  for (var i = 0; i < 3; i++) {
    color[i] = (c2[i] - c1[i]) * frac1 + c1[i];
  }
  var opacity = (op2 - op1) * frac1 + op1;

  return {"color": color, "opacity": opacity};
}

function drawIntensityMap(map){
  var scale = Math.sqrt((w*h)/numberSquare);
  var scaledH = Math.floor(h/scale);
  var scaledW = Math.floor(w/scale);
  var stepH = scaledH/h;
  var stepW = scaledW/w;

  var scaledMap = new Array(scaledH+1);
  for(var i=0;i<=scaledH;i++){
    scaledMap[i] = new Array(scaledW + 1);
    for(var j=0;j<=scaledW;j++){
      scaledMap[i][j] = null;
    }
  }
  
  for (var i=0;i<h;i++) {
    for(var j=0;j<w;j++){
      var s1= intensityMap[i][j];
      var s2 = {"id": -1, "lat": 0, "lng": 0, "hsl": [0, 100, 100], "opacity": 0};
      if(j+1 < w){
        s2 = intensityMap[i][j+1];
      }
      var s3 = {"id": -1, "lat": 0, "lng": 0, "hsl": [0, 100, 100], "opacity": 0};
      if(i+1 < h){
        s3 = intensityMap[i+1][j];
      }
      var s4 = {"id": -1, "lat": 0, "lng": 0, "hsl": [0, 100, 100], "opacity": 0};
      if(j+1 < w && i+1 < h){
        s4 = intensityMap[i+1][j+1];
      }

      for(var k=0;k<stepH;k++){
        for(var l=-0;l<stepW;l++){
          var frac1 = k/stepH;
          var frac2 = l/stepW;
          var interpolated = interpolate(s1, s2, s3, s4, frac1, frac2);
          var hsl = 'hsl(' + interpolated.color[0] + ',' + interpolated.color[1] + '%,' + interpolated.color[2] + '%)';
          
          var rectangle = new google.maps.Rectangle({
            strokeColor: "#FFFFFF",
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: hsl,
            fillOpacity: interpolated.opacity,
            map: map,
            bounds: {
              north: s1.lat-k*(dist/stepH),
              south: s1.lat-(k+1)*(dist/stepH),
              east: s1.lng + (l+1)*(dist/stepW),
              west: s1.lng + (l)*(dist/stepW)
            }
          });
        }  
      }
    }
  }
}



function initMap() {
  initVars();
  
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -23.558745, lng: -46.731859},
    scrollwheel: true,
    zoom: 12
  });
  drawIntensityMap(map)
  GMaps.geolocate(map)
}
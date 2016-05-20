var map, heatmap;

var minLat = -23.7;
var maxLat = -23.4;
var minLong = -46.75;
var maxLong = -46.45;
var resSpace;

var res = 50;
var intensityMap, intensityCount, distSum;

function initVars(){
  resSpace = (maxLong - minLong) / res; 
  intensityMap = new Array(res);
  for(var i=0;i<res;i++){
    intensityMap[i] = new Array(res);
    for(var j=0;j<res;j++){
      intensityMap[i][j] = 0;
    }
  }
  intensityCount = new Array(res);
  for(var i=0;i<res;i++){
    intensityCount[i] = new Array(res);
    for(var j=0;j<res;j++){
      intensityCount[i][j] = 0;
    }
  }
  distSum = new Array(res);
  for(var i=0;i<res;i++){
    distSum[i] = new Array(res);
    for(var j=0;j<res;j++){
      distSum[i][j] = 1;
    }
  }
}

var regions = {
  liberdade: {
    center: {lat: -23.56, lng: -46.6328},
    radius: 2,
    val: 0
  },
  usp: {
    center: {lat: -23.5614, lng: -46.7308},
    radius: 3,
    val: 1
  },
  jabaquara: {
    center: {lat: -23.6365, lng: -46.6452},
    radius: 2,
    val: 0
  },
  tucuruvi1: {
    center: {lat: -23.4739, lng: -46.6108},
    radius: 3,
    val: 1
  },
  tucuruvi2: {
    center: {lat: -23.473, lng: -46.610},
    radius: 2,
    val: 0
  },
  vila_guilherme: {
    center: {lat: -23.5153, lng: -46.6079},
    radius: 1,
    val: 0.5
  },
  santana: {
    center: {lat: -23.4982, lng: -46.6263},
    radius: 5,
    val: 1
  },
  bras1: {
    center: {lat: -23.5380, lng: -46.6139},
    radius: 2,
    val: 0
  },
  bras2: {
    center: {lat: -23.53, lng: -46.61},
    radius: 3,
    val: 0.5
  }
};

function interpolateColor(green, red, fraction) {
  var color = [];
  for (var i = 0; i < 3; i++) {
    // Calculate color based on the fraction.
    color[i] = (green[i] - red[i]) * fraction + red[i];
  }

  return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
}

function intensities(){
  initVars();
  
  for (var r in regions) {
    var x = Math.floor(res*(regions[r].center.lat-minLat) / (maxLat - minLat));
    var y = Math.floor(res*(regions[r].center.lng-minLong) / (maxLong - minLong));
    var radius = regions[r].radius;
      
    for(var offsetX = - radius; offsetX <= radius; offsetX++){
      for(var offsetY = -radius; offsetY <= radius; offsetY++){
        
        if(x + offsetX >= 0 && x + offsetX < res && y + offsetY >= 0 && y + offsetY < res){
          var dist = Math.sqrt(offsetX*offsetX + offsetY*offsetY)/radius;
          
          if(dist <= 1){
            intensityMap[x + offsetX][y + offsetY]+= regions[r].val;
            intensityCount[x + offsetX][y + offsetY]++;
          }
        }
      }
    }
  }
  var count = 0;
  for(var ii=0;ii<res;ii++){
    for(var jj=0;jj<res;jj++){
      count++;
      var c = [0, 0, 0];
      var op = 0;
      if(intensityCount[ii][jj] > 0){
        var frac = (intensityMap[ii][jj]+1)/(2*intensityCount[ii][jj]);
        c = interpolateColor([120, 100, 50],[0, 100, 50], frac);
        op += 0.25*intensityCount[ii][jj];
      }
      var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: c,
        fillOpacity: op,
        map: map,
        bounds: {
          north: resSpace*ii + minLat,
          south: resSpace*(ii+1) + minLat,
          east: resSpace*(jj+1) + minLong,
          west: resSpace*(jj) + minLong
        }
      });
    }
  }
}

function setCircles(){
  for (var r in regions) {
    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: r,
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: regions[r].color,
      fillOpacity: 0.35,
      map: map,
      center: regions[r].center,
      radius: Math.sqrt(regions[r].radius) * 100
    });
  }
}

function setHeatmap(){
  heatmap = new google.maps.visualization.HeatmapLayer({
      data: getPoints(),
      map: map
    });
    //heatmap.setMap(heatmap.getMap() ? null : map);
    var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 97, 0, 0.5)', // green
    'rgba(212, 255, 0, 0.9)',
    'rgba(255, 0, 0,1)'    // red
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
    heatmap.set('opacity', heatmap.get('opacity') ? null : 1);
}

function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: -23.558745, lng: -46.731859},
      scrollwheel: true,
      zoom: 14
    });
    //setCircles();
    intensities();
    setHeatmap();
  }
  

function getPoints() {
  return [
{location: new google.maps.LatLng(37.782, -122.447), weight: 0.5}, //weight vai definir a  cor do sensor 
  //new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 50},
  {location: new google.maps.LatLng(37.782, -122.441), weight: 100},
  {location: new google.maps.LatLng(37.782, -122.439), weight: 50},
  //new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

  {location: new google.maps.LatLng(37.785, -122.447), weight: 100},
  {location: new google.maps.LatLng(37.785, -122.445), weight: 50},
  //new google.maps.LatLng(37.785, -122.443),
  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
  //new google.maps.LatLng(37.785, -122.439),
  {location: new google.maps.LatLng(37.785, -122.437), weight: 100},
  {location: new google.maps.LatLng(37.785, -122.435), weight: 50}
  ];
}
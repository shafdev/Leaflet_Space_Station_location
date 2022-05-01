var issIcon = L.icon({
iconUrl: 'iss.png',
iconSize:     [30, 45], 
iconAnchor:   [25, 16], 
});

//setting the leaflet js map
const map = L.map('map').setView([0, 0],3);
const attribution= '&copy; <a href=https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(map);
var marker = L.marker([0,0],{icon:issIcon}).addTo(map);

//getting the position of ISS and setting the pointer of map every iteration
const url2 = "https://api.wheretheiss.at/v1/satellites/25544"

const  getData = async () =>{    
    const response = await fetch(url2);
    const data = await response.json();
    const lat = data.latitude.toFixed(2)
    const lng = data.longitude.toFixed(2)
    // console.log(lat);
    // console.log(lng);
    document.getElementById('lat').innerText = lat;
    document.getElementById('lng').innerText = lng;
    marker.setLatLng([lat,lng]);
    map.panTo([lat, lng]);

    getPlaceName(lat,lng);
  }

getData();


const getPlaceName =  async(lati,long)=>{
    console.log(lati);
    console.log(long);
    const lat = Math.round(lati);
    const lng = Math.round(long);
    const url3 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=60ca65d651b7a583e4ad566c9f910682`
    // const url3 = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=2408f90be4b74fc9a0225995c299c91b`
    const response = await fetch(url3);
    const data = await response.json();
    const place = data.name;
    const country = data.sys.country;
    document.getElementById('country').innerText = country;
    document.getElementById('place').innerText = place;
    // console.log(data);
    console.log(country)
    console.log(place)
  } 
 

// getPlaceName();
setInterval(getData,5000);

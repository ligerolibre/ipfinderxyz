// Leaflet 초기화
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 축척 막대를 지도 왼쪽 하단에 노출 
L.control.scale({imperial: true, metric: true}).addTo(map);

const ipInput = document.getElementById('ipInput')
const ipSubmit = document.getElementById('ipSubmit')
const resultIP = document.querySelector('#result>span')
const resultData = document.querySelector('#result>#resultData')


const getIPInfo = () => {
    // ipInput의 value 가져오기
    const ip = ipInput.value
    // ipInfo API에 요청하기
    fetch('https://api.ipfinder.xyz/' + ip, { // THIS IS MY BACKEND! USE http://ip-api.com/json/ ON YOUR SERVICE!
        method: 'get',
        headers: {
            'x-api-key': '7f7f5809-cc74-4214-869d-e02d958eaafb',
            "Access-Control-Allow-Origin": "https://api.ipfinder.xyz",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "*",
        }
    })
    .then(response => response.json())
    .then(res => {
        // 반환된 값을 화면에 표시하기
        resultIP.innerText = res['query']
        let resultHTML;
        const resKeys = Object.keys(res)
        let statusIndex = resKeys.indexOf('status')
        if (statusIndex != -1) resKeys.splice(statusIndex, 1)
        resKeys.forEach(element => {
            resultHTML += '<span>' + element + ': <strong>' + res[element] + '</strong></span>'
        });
        resultHTML = resultHTML.replaceAll('undefined', '')
        resultData.innerHTML = resultHTML
        map.setView([res['lat'], res['lon']], 13);
        L.marker({lon: res['lon'], lat: res['lat']}).bindPopup('Location').addTo(map);
    })
}

getIPInfo()

ipSubmit.addEventListener('click', getIPInfo)
ipInput.onkeydown = function(e){
    if(e.keyCode == 13){
      getIPInfo()
    }
 };

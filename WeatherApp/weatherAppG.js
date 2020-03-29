window.addEventListener('load', ()=> {
    let long;
    let lat;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/4b3e387f98f689951071e07c4c8d710a/${lat},${long}`;
            fetch(api)
            .then((response) => response.json())
            .then(data => {
                //display-load everything 
                displayStats(data);
            });
        });
    }
    else {
        alert('Error');
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color:"white"});
        const trenutna = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[trenutna]);
    }
    function displayStats(data){
        let temperatura = document.querySelector('.stepen');
        let vremenskaZona = document.querySelector('.time-zone');
        let vrijeme = document.querySelector('.summary-section');
        
        const {temperature, summary, icon} = data.currently;
        temperatura.textContent = `${Math.floor(temperature)} °F`;
        vremenskaZona.textContent = data.timezone;
        vrijeme.textContent = summary;
        //set icons
        setIcons(icon, document.querySelector('.icon'));
        //set forecast
        foreCast(data.daily.data);
        //event click
        temperatura.addEventListener('click', () =>{
            let celsius = (temperature - 32) * 5/9;
            if(temperatura.textContent.includes("C"))
                temperatura.textContent = `${Math.floor(temperature)} °F`;
            else
                temperatura.textContent = `${Math.floor(celsius)} °C`;
        });
    }
    function unixCast(unixtimestamp){
        var mjeseci = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var date = new Date(unixtimestamp*1000);
        var mj = mjeseci[date.getMonth()];
        var dan = date.getDate();
        var convdataTime = `${mj} ${dan}`;
        return convdataTime;
    }
    function foreCast(data){
        let List = [];
        List = data;
        data.forEach( el => {
             //create elements
             let div = document.createElement('div');
             div.className = 'forecast';   
             let canvas = document.createElement('canvas');
             setIcons(el.icon, canvas);
             canvas.className="added-icon";
             let date = document.createElement('h3');
             date.textContent = unixCast(el.time);
             let info = document.createElement('p');
             info.style.fontSize="17px";
             info.textContent = el.summary;
             date.className=info.className="added-text";
             //append elements 
             div.appendChild(canvas);
             div.appendChild(date);
             div.appendChild(info);
             document.querySelector('.wrap-forecast').appendChild(div);
        });
     }
    //  setInterval(() => {
    //      var date = new Date();
    //      document.querySelector('#hour').firstChild.textContent = `${date.getHours()}`;
    //      document.querySelector('#minutes').firstChild.textContent = `${date.getMinutes()}`;
    //      document.querySelector('#seconds').firstChild.textContent = `${date.getSeconds()}`;

    //  }, 1000);
});
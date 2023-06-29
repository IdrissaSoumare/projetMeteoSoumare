//Veuillez trouver le champ city afin d'y insérer la ville voulue dans le fichier conf.json

function getWeatherData(){ 
    fetch("conf.json") 
    .then(result => result.json()) 
    .then(result =>
        fetch(`https://api.weatherapi.com/v1/current.json?key=${result.keyApi}&q=${result.city}&lang=fr`) 
        .then(response => response.json()) 
        .then(data => {
            const time = data.location.localtime.split(" ") 
            document.getElementById("date").innerHTML = time[0].replace(/-/g, "/") 
            document.getElementById("hour").innerHTML = time[1].replace(":", "h") 

            if (data.current.is_day == 0){ 
                document.getElementById("time").children[0].setAttribute("src", "img/moon.png")
                document.getElementsByTagName("link")[1].setAttribute("href", "css/night.css")
            }else{
                document.getElementsByTagName("link")[1].setAttribute("href", "css/day.css")
            }

            document.getElementById("temperature").innerHTML = data.current.temp_c + "°C" 
            document.getElementById("context").innerHTML = data.current.condition.text 
            const location = document.getElementById("location") 
            location.children[1].innerHTML = data.location.name 
            location.children[2].innerHTML = ", " + data.location.country 
            
            const icon = document.getElementById("icon") 
            icon.children[0].setAttribute("src", data.current.condition.icon.replace(/64/g, "128")) 

            document.getElementById("humidity").children[1].innerHTML = "Humidité: " + data.current.humidity + "%" 
            const wind = document.getElementById("wind") 
            wind.children[0].innerHTML = "Vent: " + data.current.wind_kph + "km/h" 
            wind.children[1].setAttribute("src", "img/"+data.current.wind_dir+".png") 
        })
        .catch(error => console.log(error)) 
    )
    .catch(error => console.log(error)) 
}

getWeatherData();
setInterval(getWeatherData, 3600000);
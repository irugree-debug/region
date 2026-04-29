const speedometer = document.getElementById("speedometer");

cef.on("show_spedometr", () => {
    document.getElementById("spedometr").style = "display: block;";
});
cef.on("hide_spedometr", () => {
    document.getElementById("spedometr").style = "display: none;";
});
cef.on("speed_update", (type, value) => {
    if(type == 1) {
        if(value == 0) {
            document.getElementById("icon1").style = "fill: #fff;";
        }
        if(value == 1) {
            document.getElementById("icon1").style = "fill: #66cc00;";
        }
    }
    if(type == 2) {
        if(value == 0) {
            document.getElementById("icon2").style = "fill: #fff;";
        }
        if(value == 1) {
            document.getElementById("icon2").style = "fill: #66cc00;";
        }
    }
    if(type == 3) {
        if(value == 0) {
            document.getElementById("icon3").style = "fill: #fff;";
        }
        if(value == 1) {
            document.getElementById("icon3").style = "fill: #66cc00;";
        }
    }
    if(type == 4) {
        let fuel;
        fuel = 340 + value * 3.35;
        document.getElementById("etoFuel").style = `stroke-dasharray: 340;stroke-dashoffset: ${fuel};`;
    }
    cef.on("update_speed_val", (speed, fuel) => {
    // Обновляем числовое значение скорости
    const speedElement = document.getElementById("speedValue");
    if (speedElement) speedElement.innerText = speed;

    // Обновляем шкалу скорости (id="etoSpeed" из index.html)
    // 1208 - начальное смещение (0 км/ч), рассчитываем прогресс
    let speedOffset = -1208 + (speed * 2.5); 
    document.getElementById("etoSpeed").style.strokeDashoffset = speedOffset;

    // Обновляем топливо (используя вашу логику из JS)
    let fuelOffset = 340 + fuel * 3.35;
    document.getElementById("etoFuel").style.strokeDashoffset = fuelOffset;
});

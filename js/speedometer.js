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
});
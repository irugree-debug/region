const hudInterface = document.getElementById("hud-interface");
const hudNickname = document.getElementById("hud-nickname");
const hudPlayerId = document.getElementById("hud-player-id");
const hudTime = document.getElementById("hud-server-time");
const hudDate = document.getElementById("hud-server-date");
const hudArmour = document.getElementById("progress-armour-value");
const hudArmourProgress = document.getElementById("armour-progress");
const hudFood = document.getElementById("eat-value");
const hudFoodProgress = document.getElementById("eat-progress");
const hudHealth = document.getElementById("health-value");
const hudHealthProgress = document.getElementById("health-progress");
const hudMoney = document.getElementById("hud-rubles");
const hudGeo = document.getElementById("player-geo-text");
const hudStreet = document.getElementById("player-geo-street");

cef.emit("game:data:pollPlayerStats", true, 50);
cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {
    hudHealth.innerHTML = `${Math.round(hp)}`;
    hudHealthProgress.value = hp;

    hudArmour.innerHTML = `${Math.round(arm)}`;
    hudArmourProgress.value = arm;

    hudMoney.innerHTML = money;
});

cef.on("show-hud", () => {
    hudInterface.style = 'display: block;';
});

cef.on("hide-hud", () => {
    hudInterface.style = 'display: block;';
});

cef.on("hud-update-food", (value) => {
    hudFood.innerHTML = `${Math.round(value)}`;
    hudFoodProgress.value = value;
});

cef.on("hud-update-geo", (city, street) => {
    hudGeo.innerHTML = city;
    hudStreet.innerHTML = street;
});
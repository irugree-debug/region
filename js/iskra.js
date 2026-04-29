const currentInterface = document.getElementById("iskra");
const thisCarName = document.getElementById("name-car");
const thisCarNumber = document.getElementById("number-car");
const thisCarSpeed = document.getElementById("speed");
const thisCarWanted = document.getElementById("wanted");
let _iskra_show = false;

const tonicInterface = document.getElementById("tonik");
const zamer = document.getElementById("zamer");
const toner = document.getElementById("toner");

function iskra_interfaceShow(carName, carNumber, carSpeed, isWanted) {
    currentInterface.style = "display: block;";   

	thisCarName.innerText = carName;
	thisCarNumber.innerText = carNumber;
	thisCarSpeed.innerText = carSpeed;

	if(isWanted) {
		thisCarWanted.classList.add('circle-active')
	}
	else thisCarWanted.classList.remove('circle-active')
}

function tonic_interfaceShow(tonerValue) {
    tonicInterface.style = "display: block";
    toner.innerText = "Опред";
    zamer.classList.add('animation-tonik');

    setTimeout(() => {
        toner.innerText = tonerValue;
        zamer.classList.remove('animation-tonik');
    }, 3000);    
}

window.addEventListener("keyup", (event) => {
    if(event.keyCode === 27) {
        if(_iskra_show === true) {
            _iskra_show = false;
            currentInterface.style = "display: none;";
        }
        if(_toner_show === true) {
            _toner_show = false;
            tonicInterface.style = "display: none;";
        }        
    }
});

cef.on("show-iskra", (carName, carNumber, carSpeed, isWanted) => {
    iskra_interfaceShow(carName, carNumber, carSpeed, isWanted);
    _iskra_show = true;
});

cef.on("hide-iskra", () => {
    currentInterface.style = "display: none;";   
    _iskra_show = true;
});

cef.on("show-toner", (tonerValue) => {
    tonic_interfaceShow(tonerValue);
    _toner_show = true;
});
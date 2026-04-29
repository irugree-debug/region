const madinaInterface = document.getElementById("madina"),
manualButton = document.getElementById("manual"),
lightsButton = document.getElementById("lights"),
airHornButton = document.getElementById("airhorn"),
hotKeyButton = document.getElementById("hotkey");

function madinaShow(t, n, e, o) {
        madinaInterface.style = "display: block;",
        t && (manualButton.style = "background: green; box-shadow: 0px 0px 10px lime;"),
        n && (lightsButton.style = "background: green; box-shadow: 0px 0px 10px lime;"),
        e && (airHornButton.style = "background: green; box-shadow: 0px 0px 10px lime;"),
        o && (hotKeyButton.style = "background: green; box-shadow: 0px 0px 10px lime;")
}
function madinaHide() {
        madinaInterface.style = "display: none;",
        manualButton.style = "",
        lightsButton.style = "",
        airHornButton.style = "",
        hotKeyButton.style = ""
}
cef.on("show-madina", ((t, n, e, o) = > {
        madinaShow(t, n, e, o)
})),
cef.on("hide-madina", (() = > {
        madinaHide()
}));
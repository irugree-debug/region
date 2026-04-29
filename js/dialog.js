var dialogId = 0, dialog_type = 0, response = 1, listitem = 0, inputtext = "None", max_listitem = 0;

function update_color_list(list) {
	let dialog_item = document.querySelectorAll('.dialogItem');
	dialog_item.forEach( e => e.className = "dialogItem" );  	
	for(var i = 0; i < document.getElementsByTagName("span").length; i++) {
		document.getElementsByTagName("span")[i].className = "hover";
	}	      

	document.getElementsByClassName("dialogItem")[list].className = "dialogItem white_back";
	for( var i = 0; i < document.getElementsByClassName("dialogItem")[list].children.length; i++) {
		document.getElementsByClassName("dialogItem")[list].children[i].className = "hover active_text";
	}	

	listitem = document.getElementsByClassName("dialogItem")[list].getAttribute("data-value");

}

window.onclick = function (event) {
	if(dialogId) {
		if(event.target.parentNode.id === "dialogItem") {
			listitem = event.target.parentNode.getAttribute("data-value");
			callcack_dialog_response();		
		}
		if(event.target.id === "dialogItem") {
			if(listitem === event.target.getAttribute("data-value")) {
				console.log("callback listitem: " + event.target.getAttribute("data-value"));
				// callcack_dialog_response();
				return ;
			}
			
			listitem = event.target.getAttribute("data-value");
			update_color_list(listitem);

			callcack_dialog_response();
	    }
	}
};

window.addEventListener("keyup", (event) => {
	if(dialogId != 0) {
	    if(event.keyCode === 27) {
	    	response = 0;
	    	callcack_dialog_response();
	    }
	    if(event.keyCode === 13) {
	    	response = 1;
	    	callcack_dialog_response();
	    }
	    if(dialog_type === 2) {
		    if(event.keyCode === 40) {
		    	if(max_listitem === document.getElementsByClassName("dialogItem")[listitem].getAttribute("data-value")) return ;
		    	listitem++;
		    	update_color_list(listitem);
		    }
		    if(event.keyCode === 38) {
		    	if(listitem === document.getElementsByClassName("dialogItem")[0].getAttribute("data-value")) return ;
		    	listitem --;
		    	update_color_list(listitem);
		    }
	    }
	}
});

// create_dialog(1, 3, `{FFFFFF}Авторизация`, ``, `Далее`, `Выйти`);

function create_dialog(dialog_id, dialogType, dialogHeader, dialogText, button_1, button_2) {
	// dialogText = "2. {3399ff}Персональные настройки\nОтображение ников\nВключено\n3. {FF6347}Дополнительные услуги\nДа ты нахуй кто такой\n";

	dialogId = dialog_id, response = 1, listitem = 0, inputtext = "", dialog_type = dialogType;

	if(dialogType === 0 || dialogType === 1) {
		dialogText = dialogText.replace(/[\n]/g, "<br />");
	}
    var replacedColors = dialogText.replace(/\{(\w{3}|\w{6})\}[^{}]*/gi, (textWithColor) => {
		return textWithColor.replace(/{\w*\}/, (colorInBrackets) => {
			return `<span class="hover" style='--i: #${colorInBrackets.slice(1, -1).toLowerCase()}; --g: #252525;'>`
		}) + '</span>';
	});
    var header = dialogHeader.replace(/\{(\w{3}|\w{6})\}[^{}]*/gi, (textWithColor) => {
		return textWithColor.replace(/{\w*\}/, (colorInBrackets) => {
			return `<span class="hover" style='--i: #${colorInBrackets.slice(1, -1).toLowerCase()}; --g: #252525;'>`
		}) + '</span>';
	});	

   	var element = document.getElementById("dialog_container");
    if(element) { element.remove(); }   

	var body = document.getElementsByTagName("body")[0];
	var dialog_container = document.createElement('div');

	dialog_container.id = "dialog_container";
	body.append(dialog_container);

	var dialog_header = document.createElement('div');
	dialog_header.innerHTML = header;
	dialog_header.className = "dialogHeader";
	dialog_container.append(dialog_header);

	if(dialogType === 0 || dialogType === 1 || dialogType === 3) {
		var dialog_text = document.createElement('div');
		dialog_text.innerHTML = replacedColors;
		dialog_text.className = "dialogText";
		dialog_container.append(dialog_text);

		if(dialogType === 1 || dialogType === 3) {
			var input = document.createElement('input');
			input.placeholder = "Введите текст в это поле";
			input.id = "dialogInput";
			input.className = "dialog_input";
			input.setAttribute("autofocus", "autofocus");
			if(dialogType == 3) { input.setAttribute("type", "password"); }
			dialog_container.append(input);
		}	
	}

	var dialog_text = document.createElement('div');
	dialog_text.className = "dialogText";
	dialog_container.append(dialog_text);

	if(dialogType === 2) {
		var tabulations_delete = replacedColors.replace(/[\t]/, "");
        var lists = tabulations_delete.split(/[\n]/);      
        for(var i = 0; i < lists.length; i ++) {
        	if(lists[i].length === 0) continue;
        	else if (lists[i] === "</span>") continue;
	        var dialog_item = document.createElement("div");
	        dialog_item.innerHTML = `${lists[i]}`;     
	        dialog_item.id = "dialogItem";
	        dialog_item.setAttribute("data-value", i);

	        if(i === 0) {
				dialog_item.className = "dialogItem white_back";

				for(var j = 0; j < dialog_item.children.length; j++) {
					dialog_item.children[j].className = "hover active_text";
				}
	        }
	       	else dialog_item.className = "dialogItem";
	        dialog_text.append(dialog_item);
	        max_listitem = dialog_item.getAttribute("data-value");
    	}
    	listitem = document.getElementsByClassName("dialogItem")[0].getAttribute("data-value");
	}

	if(dialogType === 5) {
    	var replaceToDIV = (string) => {
			return string.split("\t").map((s) => `<div class="dialogItemHeader">${s}</div>`).join("");
		}
		var lists = replacedColors.split(/[\n]/);
		for(var i = 0; i < lists.length; i ++) {
        	if(lists[i].length === 0) continue;
        	else if (lists[i] === "</span>") continue;
			var set_tabulation = replaceToDIV(lists[i]);

            if ( i == 0 ) {
	            var dialogTablist = document.createElement('div');
	            dialogTablist.className = "styleDialogTablist tablist_headers";
	            dialogTablist.innerHTML = `${set_tabulation}`;
	            dialog_text.append(dialogTablist);
	            continue;
            }

			var dialog_item = document.createElement('div');
			dialog_item.innerHTML = `${set_tabulation}`;
			dialog_item.id = "dialogItem";
			dialog_item.setAttribute("data-value", i - 1);
			dialog_item.className = "dialogItem tablist_headers";

			dialog_text.append(dialog_item);
		}
	}

	var buttons = document.createElement('div');
	buttons.className = "buttons";
	dialog_container.append(buttons);

	var btn_1 = document.createElement('div');
	btn_1.innerText = button_1;
	btn_1.className = "clickBtn";
	buttons.append(btn_1);
    
    btn_1.onclick = function () { response = 1; callcack_dialog_response(); };             	

	if(button_2 != "") {
		var btn_2 = document.createElement('div');
		btn_2.innerText = button_2;
		btn_2.className = "clickBtn";
		btn_2.onclick = function () { response = 0; callcack_dialog_response(); };        
		buttons.append(btn_2);
	}
}

function callcack_dialog_response() {
	cef.set_focus(false);
    if(dialog_type === 1 || dialog_type === 3) {
    	var text = document.getElementById("dialogInput").value;
        inputtext = `${text}`;
    }
    cef.emit("callback_dialog_response", dialogId, response, listitem, inputtext);
   	dialogId = 0;
   	var element = document.getElementById("dialog_container");
    element.remove();               
}

cef.on("show_dialog", (dId, dType, dHeader, dText, dButton1, dButton2) => {
	create_dialog(dId, dType, dHeader, dText, dButton1, dButton2);
	cef.set_focus(true);
});
var ub = {};

(function() {
	ub.start = function() {
		ub.div = $(".ummbook");
		$.get({
			url: "game.json",
			success: ub.load
		});
		$(document).on("keypress", function(e) {
			var code = e.which;
			var n = code - 48;
			if (n >= 0 && n < 10) {
				var choice = n - 1;
				if (choice === -1) {
					choice = 9;
				}
				if (ub.scene.choices.length > choice) {
					ub.loadScene(ub.scene.choices[choice].scene);
				}
			}
		});
	};

	ub.load = function(data) {
		ub.game = data;
		ub.loadScene(ub.game.startScene);
	};

	ub.loadScene = function(name) {
		var scene = ub.game.scenes[name];
		var text = markdown.toHTML(scene.text);
		text = ub.processText(text);
		ub.div.html(text);
		if (scene.choices) {
			for (var i = 0; i < scene.choices.length; i++) {
				var c = scene.choices[i];
				var choice = document.createElement("p");
				var choiceText = document.createTextNode((i + 1) + ") " + c.text);
				choice.onclick = function(e) {
					var ele = e.toElement;
					var scene = ele.getAttribute("data-choice");
					ub.loadScene(scene);
				};
				choice.appendChild(choiceText);
				choice.setAttribute("data-choice", c.scene);
				choice.className = "ummbook-choice";
				ub.div[0].appendChild(choice);
			}
		}
		ub.scene = scene;
	};

	ub.processText = function(text) {
		var going = true;
		while (going) {
			var linkStart = text.indexOf("[[");
			var linkEnd = text.indexOf("]]");
			if (linkStart !== -1 && linkEnd !== -1 && linkEnd > linkStart) {
				var originalText = text.substring(linkStart, linkEnd+2);
				var linkText = text.substring(linkStart+2, linkEnd);
				var urlPosition = linkText.indexOf("|");
				urlPosition = urlPosition !== -1 ? urlPosition : 0;
				var v = urlPosition === 0 ? 0 : 1;
				var url = linkText.substring(urlPosition+v);
				if (urlPosition !== 0) {
					linkText = linkText.substring(0, urlPosition);
				} else {
					linkText = url;
				}
				var external = url.indexOf("http") === 0;
				if (external) {
					text = text.replace(originalText, "<a target='_blank' href='" + url + "'>" + linkText + "</a>");
				} else {
					text = text.replace(originalText, "<span class='ummbook-choice' onclick='ub.loadScene(\"" + url + "\")'>" + linkText + "</span>");
				}
			}
			going = false;
		}
		return text;
	};
})();

ub.start();

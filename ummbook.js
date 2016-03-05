var ub = {};

(function() {
	"use strict";
	ub.start = function() {
		ub.div = $(".ummbook");
		$.get({
			url: "game.json",
			success: ub.load
		});
		$(document).on("keypress", function(e) {
			var code = e.which;
			var n = code - 48;
			if (ub.scene.choices.length == 1) {
				ub.loadScene(ub.scene.choices[0].scene);
				return;
			}
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
		ub.loadScene(ub.game.startScene || "start");
	};

	ub.loadScene = function(name) {
		var scene = ub.game.scenes[name];
		var text = scene.text;
		var i;
		if (typeof(text) === "string") {
			text = [text];
		} else {
			text = text.slice();
		}
		if (scene.choices) {
			for (i = 0; i < scene.choices.length; i++) {
				var c = scene.choices[i];
				var temp = (i + 1) + ") ";
				if (scene.choices.length == 1) {
					temp = "";
				}
				text.push("[[" + temp + c.text + "|" + c.scene + "]]");
			}
		}
		var tempText = "";
		for (i = 0; i < text.length; i++) {
			tempText += text[i] + "\n\n";
		}
		text = tempText;
		text = markdown.toHTML(text);
		text = ub.processText(text);
		if (ub.game.clear === false) {
			text = ub.div.html() + text;
		}
		ub.div.html(text);
		ub.scene = scene;
	};

	ub.processText = function(text) {
		var going = true;
		var workingText = text;
		while (going) {
			var linkStart = workingText.indexOf("[[");
			var linkEnd = workingText.indexOf("]]");
			var commandStart = workingText.indexOf("{{");
			var commandEnd = workingText.indexOf("}}");
			var originalText;
			if (linkStart !== -1 && linkEnd !== -1 && linkEnd > linkStart) {
				originalText = workingText.substring(linkStart, linkEnd+2);
				var linkText = workingText.substring(linkStart+2, linkEnd);
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
				workingText = workingText.substring(linkEnd+2);
			} else if (commandStart !== -1 && commandEnd !== -1 && commandEnd > commandStart) {
				originalText = workingText.substring(commandStart, commandEnd+2);
				var commandText = workingText.substring(commandStart+2, commandEnd);
				if (commandText === "clear") {
					ub.div.html("");
				} else if (commandText === "stopclear" && ub.game.clear) {
					text = ub.div.html() + text;
				}
				workingText = workingText.substring(commandEnd+2);
				text = text.replace(originalText, "");
			} else {
				going = false;
			}
		}
		return text;
	};
})();

ub.start();

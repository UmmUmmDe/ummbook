var ub = {};

(function() {
	ub.start = function() {
		ub.div = $(".ummbook");
		$.get({
			url: "game.json",
			success: ub.load
		});
	};

	ub.load = function(data) {
		ub.game = data;
		ub.loadScene(ub.game.startScene);
	};

	ub.loadScene = function(name) {
		var scene = ub.game.scenes[name];
		var text = markdown.toHTML(scene.text);
		ub.processText(text);
		ub.div.html(text);
		if (scene.choices) {
			for (var i = 0; i < scene.choices.length; i++) {
				var c = scene.choices[i];
				var choice = document.createElement("p");
				var choiceText = document.createTextNode(c.text);
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
	};

	ub.processText = function(text) {
		//TODO: Add stuff here.
	};
})();

ub.start();

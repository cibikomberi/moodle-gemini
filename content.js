chrome.storage.sync.get(["key"]).then((result) => {
	const ui = document.createElement("p");
	ui.textContent = result.key;
	ui.style.fontSize = 0;
	ui.id = "api_key";
	document.body.appendChild(ui);
});

chrome.storage.sync.get(["model"]).then((result) => {
	const ui = document.createElement("p");
	ui.textContent = result.model;
	ui.style.fontSize = 0;
	ui.id = "model";
	document.body.appendChild(ui);
});

// const script = document.createElement("script");
// script.setAttribute("type", "module");
// script.setAttribute("src", chrome.runtime.getURL("main_working.js"));
// const head = document.head;
// head.insertBefore(script, head.lastChild);

// fetch("https://cibikomberi.github.io/moodle-gemini/update.json")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.latest);
//     if (chrome.runtime.getManifest().version < data.latest) {
//       if (confirm("Newer version available")) {
//         window.open(data.url, "_blank");
//       }
//     }
//   });

var ansList = []

if (document.readyState === 'complete') {
	onWindowLoad();
} else {
	window.addEventListener('load', onWindowLoad);
}

function onWindowLoad() {
	console.log('Window has been loaded.');
	var elements = document.getElementsByClassName("qtext");
	var elements1 = document.getElementsByClassName("answer");
	var port = chrome.runtime.connect({ name: "moodle" });

	port.onMessage.addListener(function (msg) {
		ansList.push(msg);
		for (let i = 0; i < elements.length; i++) {
			var qtext = elements[i].innerText + elements1[i].innerText + "Send only the answer without explanation";
			if (qtext === msg.reply.q) {
				var output = document.createElement("DIV");
				output.style.color = "white";
				output.style.padding = "5px";
				output.style.fontFamily = "Roboto";
				elements[i].appendChild(output);

				var out = document.createElement("DIV");
				out.innerHTML =
					"<img height='29.6px'alt='gemini-logo' src='https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'></img><p style='margin-bottom: 0px;'>ChatGPT Response</p>";
				out.style.display = "flex";
				out.style.fontSize = "24px";
				out.style.padding = "10px";
				out.style.backgroundColor = "#131314";
				out.style.borderTopLeftRadius = "10px";
				out.style.borderTopRightRadius = "10px";
				output.appendChild(out);

				var outVal = document.createElement("DIV");
				outVal.style.backgroundColor = "#282A2C";
				outVal.style.padding = "10px";
				outVal.style.borderBottomLeftRadius = "10px";
				outVal.style.borderBottomRightRadius = "10px";
				outVal.innerHTML = msg.reply.a;
				output.appendChild(outVal);
			}
		}
		console.log(msg);
	});
	setInterval(() => {
		port.postMessage({ ready: true });
	}, 1000);


	for (let i = 0; i < elements.length; i++) {
		var qtext = elements[i].innerText + elements1[i].innerText + "Send only the answer without explanation";
		port.postMessage({ question: qtext })

	}
}
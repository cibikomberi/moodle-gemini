console.log("hiii");

if (document.readyState === 'complete') {
	setTimeout(onWindowLoad, 3000);
} else {
	window.addEventListener('load', () => setTimeout(onWindowLoad, 3000));
}



// Function to be called when the window is fully loaded
function onWindowLoad() {
	console.log('Window has been loaded.');
	var port = chrome.runtime.connect({ name: "gpt" });

	port.postMessage({ ready: true });

	port.onMessage.addListener(function (msg) {
		console.log(msg.question);
		if (msg.question) {
			document.getElementById("prompt-textarea").value = msg.question
			document.execCommand("insertText", false, ' ');
			const button = document.querySelector('button[data-testid="send-button"]'); button.click();
		}
	});
}



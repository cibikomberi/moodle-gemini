let questionsList = [];
let completed = true
let sent = true
let start = true
let submitted = true

if (document.readyState === 'complete') {
	onWindowLoad();
} else {
	window.addEventListener('load', onWindowLoad);
}
var port = chrome.runtime.connect({ name: "gpt" });
function onWindowLoad() {
	console.log('Window has been loaded.');
	var lastAns = document.querySelector('.w-full:last-child > .text-base').innerText
	

	port.onMessage.addListener(function (msg) {
		if (msg.question) {
			console.log(msg.question);
			questionsList.push(msg.question);
			console.log(questionsList);
		}
	});
	setInterval(() => {
		if(document.querySelector('a.mt-5') !== null){
			document.querySelector('a.mt-5').click()
		}

		console.log(questionsList);
		
		port.postMessage({ ready: "true" });
		window.scrollTo(0, document.body.scrollHeight);
		let field = document.querySelector('button[data-testid="send-button"]');
		if (field !== null){
				completed = true;
			}else{
				completed = false;
			}
		
		if(!sent && completed && !start ){
			var i=2;
			var lastQ;
			var lastA;
			while (true) {
				var f = document.querySelector(`[data-testid="conversation-turn-${i}"] > .text-base`);
				if (f === null) {
					console.log(i);
					
					lastQ =  document.querySelector(`[data-testid="conversation-turn-${i-2}"] > .text-base`).innerText;
					lastA =  document.querySelector(`[data-testid="conversation-turn-${i-1}"] > .text-base`).innerText;
					break;
				}
				i++;
			}
			console.log(lastQ);
			console.log(questionsList[0]);
			
			if(lastQ.trim() == questionsList[0].trim()){
			console.log("sent: " + lastA);
			
			port.postMessage({q:questionsList[0] , answer:lastA});
			questionsList.splice(0,1);
			sent = true;}
		}
		if(completed && questionsList.length > 0 && sent){
			submitted = true;
			document.getElementById("prompt-textarea").value = questionsList[0];
			document.execCommand("insertText", false, ' ');
			const button = document.querySelector('button[data-testid="send-button"]');
			if(button.disabled === true){
				submitted = false
				document.getElementById("prompt-textarea").value = questionsList[0];
				document.execCommand("insertText", false, ' ');
			}
			button.click();
			completed = false;
			sent = false;
			start = false;
		}
	}, 1000);
}

window.onbeforeunload = function(evt) {

    // Cancel the event (if necessary)
    // evt.preventDefault();
	port.postMessage({ ready: "false" });
    // Google Chrome requires returnValue to be set
    evt.returnValue = '';

    return null;
};
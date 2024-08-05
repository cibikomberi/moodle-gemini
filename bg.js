

let questionsList = []
let answersList = [{q:"hi",a:"hi"}]
let GPTalive = false
let GPTlastAlive = false
let GPTa = 0


chrome.runtime.onConnect.addListener(function (port) {
	if (port.name === "gpt") {
		port.onMessage.addListener(function (msg) {
			console.log(msg);
			
			if (msg.ready === "true") {
				GPTa++;
				GPTalive = true;
				console.log("ready to answer");
				if(questionsList.length > 0){
					port.postMessage({ question: questionsList[0] });
					questionsList.splice(0,1);
				}
			}
			if (msg.ready === "false") {
				GPTalive = false;
			}
			if (msg.q && msg.answer) {
				console.log(answersList);
				answersList.push({q:msg.q , a:msg.answer});
			}
		});
	}

	if (port.name === "moodle") {
		port.onMessage.addListener(function (msg) {
			
			if (!GPTalive) {
					chrome.tabs.create({ url: 'https://chatgpt.com' ,active : false}, function (tab) {
					});
				GPTalive = true;
			}

			if (msg.ready) {
				console.log(questionsList);
				if(answersList.length > 0){
					port.postMessage({ reply: answersList[0] });
					answersList.splice(0,1);
				}
			}
			if (msg.question) {
				questionsList.push(msg.question);
				console.log(questionsList);
			}
		});
	}
});

setInterval(() => {
	if (GPTa < 7) {
		GPTalive = false;
	}
}, 10000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'keepAlive') {
	  console.log('Received keep-alive message.');
	  fetch('https://example.com')
		.then(response => console.log('Fetched keep-alive resource:', response))
		.catch(error => console.error('Keep-alive fetch error:', error));
	  sendResponse({ status: 'ok' });
	}
  });
  
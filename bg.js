

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
				chrome.windows.getCurrent(function (winCurrent) {
					chrome.windows.create({ url: 'https://chatgpt.com' }, function (tab) {
						chrome.windows.update(winCurrent.id, { focused: true });
						gptTabId = tab.id + 1;
					});
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
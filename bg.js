// Create a new tab in the background
let gptTabId = 0

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(tabId === gptTabId && changeInfo.status === 'complete'){
      handleQuestion();
  }
})
function handleQuestion(){
  console.log("ready to answer");
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

      chrome.windows.getCurrent(function(winCurrent){
        chrome.windows.create({url:'https://chatgpt.com'}, function(tab){
            chrome.windows.update(winCurrent.id, {focused: true});
            gptTabId = tab.id + 1;
        });
    });


      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );


// background.js

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "gpt") {
    
    port.onMessage.addListener(function(msg) {
      if (msg.ready) {
        console.log("ready to answer");
        port.postMessage({question: "Who's there?"});
      }
    });
  }
});


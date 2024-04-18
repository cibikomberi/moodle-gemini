document.getElementById("myBtn").addEventListener("click", insertAPI);

function insertAPI(){
    let api = document.getElementById("inp").value;
    chrome.storage.sync.set({ key: api }).then(() => {
        console.log("Value is set");
      });
      
      chrome.storage.sync.get(["key"]).then((result) => {
        
      });
}


 chrome.identity.getProfileUserInfo(function(userInfo) {
  // Use userInfo.email or userInfo.id
  // They will be empty if the user is not signed in to Chrome
  let email = "unknown user.bit"
  email = userInfo.email;
  email = email.substring(0, email.lastIndexOf("@"));

  while(email.lastIndexOf(".") != -1){
    email = email.substring(0, email.lastIndexOf("."));
  }
  //email = email.substring(0, email.lastIndexOf("."));
  email=email.toLocaleUpperCase();
console.log(email);
let yt = document.getElementById("3");
yt.innerText =  email;
});





var j = document.getElementById("api_key");

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const API_KEY = j.innerText;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

var elements = document.getElementsByClassName("qtext");
var elements1 = document.getElementsByClassName("answer");
const butt = document.createElement("button");
butt.style.fontSize = "14px";
butt.value = "Next page";
butt.name = "next";
butt.id = "mod_quiz-next-nav";
butt.className = "myBtn";
butt.textContent = "Next";
if (elements1.length) {
  elements1[elements1.length - 1].appendChild(butt);
}




// for (let i = 0; i < elements.length; i++) {
  
// }


var allImages = document.querySelector("img");
  let imageParts = [];
  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
  async function fileToGenerativePart() {
    
    toDataURL(allImages.src)
     .then(dataUrl => {
        let data = dataUrl;
        let base64EncodedDataPromise = data.split(',')[1];
        let fileType = data.split(',')[0].split(':')[1].split(';')[0];
        let a= {
            inlineData: { data:base64EncodedDataPromise, mimeType: fileType },
          };
        imageParts.push(a);
     })
}
  fileToGenerativePart()

  var textContent = elements[0].innerText;
  console.log(textContent);

  var textContent1 = elements1[0].innerText;
  console.log(textContent1);

  async function run() {

    const prompt = "what is this image";
    console.log(prompt);
    let result;
    // if (allImages.length === 0) {
    //   result = await model.generateContent(prompt);
    // } else {
      console.log("imageParts")
      console.log(imageParts)
      result = await model.generateContent([prompt, ...imageParts]);
    // }
    const response = await result.response;
    
    const text = response.text();

    const textBox = document.createElement("P");
    textBox.textContent = text;
    textBox.style.padding = "5px";
    textBox.style.color = "red";
    textBox.style.fontWeight = "bold";

    textBox.style.fontFamily = "sans-serif";
    elements[0].appendChild(textBox);
  }

  run();
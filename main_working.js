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


const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
async function fileToGenerativePart(img) {
  toDataURL(img.src).then((dataUrl) => {
    let data = dataUrl;
    let base64EncodedDataPromise = data.split(",")[1];
    let fileType = data.split(",")[0].split(":")[1].split(";")[0];
    let a = {
      inlineData: { data: base64EncodedDataPromise, mimeType: fileType },
    };
    imageParts.push(a);
  });
}

for (let i = 0; i < elements.length; i++) {
  var allImages = elements[i].getElementsByTagName("img");
  console.log(allImages);
  let imageParts = [];
  for (let i = 0; i < allImages.length; i++) {
    fileToGenerativePart(allImages[i]);
  }

  var textContent = elements[i].innerText;
  console.log(textContent);

  var textContent1 = elements1[i].innerText;
  console.log(textContent1);

  async function run() {

    const prompt = "What is this image about?";
    console.log(prompt);
    let result;
    // if (allImages.length === 0) {
    //   result = await model.generateContent(prompt);
    // } else {

      result = await model.generateContent([prompt, ...imageParts]);
    // }
    const response = await result.response;
    
    const text = response.text();
    console.log(i+" "+prompt + text );
    console.log(imageParts);

    const textBox = document.createElement("P");
    textBox.textContent = text;
    textBox.style.padding = "5px";
    textBox.style.color = "red";
    textBox.style.fontWeight = "bold";

    textBox.style.fontFamily = "sans-serif";
    elements[i].appendChild(textBox);
  }

  run();
}

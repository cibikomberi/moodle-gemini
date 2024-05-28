var j = document.getElementById("api_key");

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const API_KEY = j.innerText;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



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

for (let i = 0; i < elements.length; i++) {

    const allImages = elements[i].getElementsByTagName("img");
    console.log("allImages");
    console.log(allImages);

    let imageParts = [];
    async function fileToGenerativePart1() {
    toDataURL(allImages[0].src)
        .then((dataUrl) => {
        let data = dataUrl;
        let base64EncodedDataPromise = data.split(",")[1];
        let fileType = data.split(",")[0].split(":")[1].split(";")[0];
        let a = {
            inlineData: { data: base64EncodedDataPromise, mimeType: fileType },
        };
        imageParts.push(a);
        })
        .then(() => {
        console.log("HI");
        run();
        });
    }

  fileToGenerativePart1();

  async function run() {
    const prompt = "What's this image about";

    console.log("imageParts");
    console.log(imageParts);
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  let a = document.getElementById("asd");
  a.onclick = run;
}

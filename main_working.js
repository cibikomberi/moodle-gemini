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

    const allImagesQ = elements[i].getElementsByTagName("img");
    const allImagesO = elements1[i].getElementsByTagName("img");
    const allImages = [...allImagesQ, ...allImagesO];
    console.log("allImages "+i);
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
        if(allImages.length>1){
          for (let j = 1; j < allImages.length; j++) {
            toDataURL(allImages[j].src)
            .then((dataUrl) => {
            let data = dataUrl;
            let base64EncodedDataPromise = data.split(",")[1];
            let fileType = data.split(",")[0].split(":")[1].split(";")[0];
            let a = {
              inlineData: { data: base64EncodedDataPromise, mimeType: fileType },
            };
            imageParts.push(a);})
          }
        }
        })
        .then(() => {
        console.log("HI");
        run();
        });
    }
  if(allImages.length){
    fileToGenerativePart1();}
  else{
    run();
  }
  async function run() {
    const prompt = elements.innerText + elements1.innerText;

    console.log("imageParts");
    console.log(imageParts);
    let result;
    if(allImages.length){
      result = await model.generateContent([prompt, ...imageParts]);}
    else{
      result = await model.generateContent(prompt);
    }
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

}

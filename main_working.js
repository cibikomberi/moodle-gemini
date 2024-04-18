var j=document.getElementById("api_key");



import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const API_KEY = j.innerText;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

var elements = document.getElementsByClassName("qtext");
var elements1 = document.getElementsByClassName("answer");
const butt = document.createElement('button');
butt.style.fontSize = "14px"
butt.value = "Next page";
butt.name = "next";
butt.id = "mod_quiz-next-nav";
butt.className = "myBtn";
butt.textContent = "Next";
elements1[(elements1.length-1)].appendChild(butt);

for(let i = 0;i<elements.length;i++){   
      var textContent = elements[i].innerText;
      console.log(textContent);
      
      var textContent1 = elements1[i].innerText;
      console.log(textContent1);

      async function run() {
            const prompt = textContent + textContent1

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);

            const textBox = document.createElement("P");
            textBox.textContent = text;
            textBox.style.padding = '5px';
            textBox.style.color = 'red';
            textBox.style.fontWeight = 'bold';
            
            textBox.style.fontFamily = 'sans-serif';
            elements[i].appendChild(textBox);
            
      }

      run();
}



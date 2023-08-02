const btnEl = document.querySelector(".changecolorbtn");
const gridEl = document.querySelector(".colorGrid");

btnEl.addEventListener("click",async ()=>{
    let [tab] = await chrome.tabs.query({active:true, currentWindow: true});

    //injecting and executing js code into a webpage context from the browser extension
    chrome.scripting.executeScript({
        target: {tabId: tab.id}, // Specify the tab where you want to execute the script
        function: pickColor,
    });
});

function pickColor(){
    
}
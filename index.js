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

async function pickColor(){
    //using a try catch for exception handling as we are working with external api
    try{
        //Picker
        const eyeDropper = new EyeDropper();
        const selectedColor = await eyeDropper.open();
        console.log(selectedColor);
    }catch(err){
        console.error(err);
    }
}
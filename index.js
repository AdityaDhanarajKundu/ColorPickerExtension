const btnEl = document.querySelector(".changecolorbtn");
const gridEl = document.querySelector(".colorGrid");
const valueEl = document.querySelector(".colorValue");

btnEl.addEventListener("click",async ()=>{
    let [tab] = await chrome.tabs.query({active:true, currentWindow: true});

    //injecting and executing js code into a webpage context from the browser extension
    chrome.scripting.executeScript({
        target: {tabId: tab.id}, // Specify the tab where you want to execute the script
        function: pickColor,
    },
    async (injectionResults)=>{ //it takes whatever returned by the injection function
        console.log(injectionResults); //this should be visible in the console of the extension
        let [data] = injectionResults;
        if(data.result){
            let color = data.result.sRGBHex;
            gridEl.style.backgroundColor= color;
            valueEl.textContent = color;
            try{
                await navigator.clipboard.writeText(color).then(()=>{
                    alert("Color code is copied");
                })
            }
            catch(err){
                console.error(err);
            }
        }
    });
});

async function pickColor(){
    //using a try catch for exception handling as we are working with external api
    try{
        //Picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    }catch(err){
        console.error(err);
    }
}
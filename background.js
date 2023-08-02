//background files are used to store the system information 
//so that they can be fetched from this file to other files whenever needed

let color = "red";

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({color});
});
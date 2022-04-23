console.log("lmaojsdsdaaaaaaaaaaaaaaasdi")

function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}


function goToURL(url){
    return null;
}


document.onmouseup = document.onkeyup = function() {
  document.body.onclick = function(e) {
    if (e.ctrlKey) {
        let word = getSelectionText();
        alert(word);
        chrome.runtime.sendMessage({greeting: "hello", search_query: word}, function(response) {
          console.log(response.farewell);
        });   
    };
  }

};
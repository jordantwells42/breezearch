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


document.onmouseup = document.onkeyup = function() {
  document.body.onclick = function(e) {
    if (e.altKey) || (e.metaKey) {
        let word = getSelectionText();
        chrome.runtime.sendMessage({greeting: "hello", search_query: word}, function(response) {
          console.log(response.farewell);
        });   
    };
  }

};
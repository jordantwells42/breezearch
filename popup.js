chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {

  if (request.greeting == "img") {
    let img = document.createElement("img");
    img.src = request.src;
    img.width = 400;
    img.height = 400;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);

  };



}
)
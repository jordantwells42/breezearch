chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    let search_urls = ["https://www.google.com/search?q=", "https://www.amazon.com/s?k=", "https://www.youtube.com/results?search_query=",
      "https://www.etsy.com/search?q="];

    for (let search_url of search_urls){
      search_url = search_url + request.search_query ;
      console.log(search_url)
      tab = chrome.tabs.create({url:search_url});
      console.log(tab)

    }
    
    sendResponse({farewell: request.search_query});
  }
);
function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}


chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    if (request.greeting == 'hello'){

      let search_urls = ["https://www.google.com/search?q=", "https://en.wikipedia.org/w/index.php?search=", "https://www.encyclopedia.com/gsearch?q="];

      let tabs = []

      let current_tab = await chrome.tabs.query({highlighted: true, active: true});
      current_tab = current_tab[0]


      for (let search_url of search_urls){
        search_url = search_url + request.search_query ;
        tab = await chrome.tabs.create({url:search_url});
        tabs.push(tab)

      };


      let ids = [];

      for (let tab of tabs){
        ids.push(tab.id)
        
        /*
        chrome.tabs.update(tab.id, {active: true});
          
        img_url = await chrome.tabs.captureVisibleTab({}, {}, {});

        console.log(img_url)
        chrome.runtime.sendMessage({greeting: "img", src: img_url}, function(response) {
            console.log(response.farewell);
        });
        
        */
      };


      groupId = await chrome.tabs.group({tabIds : ids})
      chrome.tabGroups.update(groupId, {title: request.search_query, collapsed: true})

      chrome.tabs.update(current_tab.id, {highlighted:true, selected: true, active: true});

      sendResponse({farewell: request.search_query});

    };
  }
);
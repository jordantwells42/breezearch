function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}


const manifest = chrome.runtime.getManifest();

function installContentScript() {
  // iterate over all content_script definitions from manifest
  // and install all their js files to the corresponding hosts.
  let contentScripts = manifest.content_scripts;
  for (let i = 0; i < contentScripts.length; i++) {
    let contScript = contentScripts[i];
    chrome.tabs.query({ url: contScript.matches }, function(foundTabs) {
      for (let j = 0; j < foundTabs.length; j++) {
        let javaScripts = contScript.js;
        for (let k = 0; k < javaScripts.length; k++) {
          chrome.tabs.executeScript(foundTabs[j].id, {
            file: javaScripts[k]
          });          
        }
      }
    });
  }
}

chrome.runtime.onInstalled.addListener(installContentScript);


chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    if (request.greeting == 'hello'){

      let search_urls = ["https://www.google.com/search?q=", "https://en.wikipedia.org/w/index.php?search=", "https://www.youtube.com/results?search_query="];


      let tabs = []

      let current_tab = await chrome.tabs.getCurrent();


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

      chrome.tabs.update(current_tab.id, {active: true});

      sendResponse({farewell: request.search_query});

    };
  }
);
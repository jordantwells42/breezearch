// Restores checkbox state using the preferences stored in chrome.storage.sync
function restoreOptions() {
    // Use default value = false.
    chrome.storage.sync.get({
        value: false
    }, function (items) {
        document.getElementById('popup').checked = items.value;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    document.getElementById("popup").addEventListener('click', runTimer);
    console.log("DOM Loaded");
});


let shopping = document.getElementById("shopping").addEventListener('click', event => {
	if(event.target.checked) {
		alert("Checkbox checked!");
	}
});

shopping_urls = ['https://www.amazon.com/s?k=','https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=','https://www.target.com/s?searchTerm=','https://www.walmart.com/search?q=']

research_urls = ['https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q='];
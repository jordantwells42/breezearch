// Restores checkbox state using the preferences stored in chrome.storage.sync

async function storeOptions(){
	  let topics = ["research", "shopping", "travel", "social"];
      let number = 0

      options = [false, false, false, false];
      for (let topic of topics){
        options[number] = document.getElementById(topic).checked;
        number = number + 1;
      };
      //alert(options)
	localStorage.setItem("values", JSON.stringify(options))
}



async function restoreOptions() {
    // Use default value = false.
    values = JSON.parse(localStorage.getItem("values"))

    let topics = ["research", "shopping", "travel", "social"];
    let number = 0
    for (let topic of topics){
        document.getElementById(topic).checked = values[number];
        number = number + 1;    
    };
    
};

restoreOptions()


document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
});

document.getElementById("shopping").addEventListener('click', event => {
	if(event.target.checked) {
		alert("Checkbox checked!");
	}

	storeOptions();

});

shopping_urls = ['https://www.amazon.com/s?k=','https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=','https://www.target.com/s?searchTerm=','https://www.walmart.com/search?q=']

research_urls = ['https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q='];
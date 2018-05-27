const apiKey = '9d6f75d59a2049e79a885e0731ba4a64'; 
const main= document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'national-geographic';

/*
Notification.requestPermission(function(status) {
	console.log('Notification permission status:', status);
});

function displayNotification(){

if (Notification.permission == 'granted') {
	navigator.serviceWorker.getRegistration().then(function(reg) {

		var options = {
			body: 'Here is a notification body!',
			icon: 'images/icons/icon-72x72.png',
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: 1
			}
		};

		reg.showNotification('Hello world!');
	
	});
}

}

*/




window.addEventListener('load', async e => {
	updateNews();
	await updateSources();
	sourceSelector.value = defaultSource;

	sourceSelector.addEventListener('change' , e => { 

		updateNews(e.target.value);

	 } )

	if ('serviceWorker' in navigator ) {
		try{
			navigator.serviceWorker.register('sw.js');
			console.log(`SW ENREGITRÉ ! `);	
		
		}

		catch(error){
			console.log(`SW NON ENREGITRÉ ! `);
		}

	}

});

async function updateSources(){

	const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
	const json = await res.json();

	sourceSelector.innerHTML = json.sources
	.map( src =>`<option value="${src.id}" > ${src.name}  </option>`)
	.join('\n');


}

async function updateNews(  source = defaultSource) {
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
	const json = await res.json();

	main.innerHTML = json.articles.map(createArticle).join('\n');
}



function createArticle(article){

			return `
			    <div class="article">
			      <a href="${article.url}">
			        <h2>${article.title}</h2>
			        <img src="${article.urlToImage}" alt="${article.title}">
			        <p>${article.description}</p>
			      </a>
			    </div>
			  `;
}


function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: 'images/icons/icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}

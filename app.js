const apiKey = '9d6f75d59a2049e79a885e0731ba4a64'; 
const main= document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'national-geographic';

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
/*
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

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
*/

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});
	
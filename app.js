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
	
function displayNotification(){
	navigator.serviceWorker.getRegistration().then(function(swreq){
		swreq.showNotification('bienvenue dans nka news !');
	});
}
*/


var deferredPrompt;
var enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

function displayConfirmNotification() {
  if ('serviceWorker' in navigator) {
    var options = {
      body: 'You successfully subscribed to our Notification service!',
      icon: '/src/images/icons/app-icon-96x96.png',
      image: '/src/images/sf-boat.jpg',
      dir: 'ltr',
      lang: 'en-US', // BCP 47,
      vibrate: [100, 50, 200],
      badge: '/src/images/icons/app-icon-96x96.png'
    };

    navigator.serviceWorker.ready
      .then(function(swreg) {
        swreg.showNotification('Successfully subscribed (from SW)!', options);
      });
  }
}

function askForNotificationPermission() {
  Notification.requestPermission(function(result) {
    console.log('User Choice', result);
    if (result !== 'granted') {
      console.log('No notification permission granted!');
    } else {
      displayConfirmNotification();
    }
  });
}

if ('Notification' in window) {
  for (var i = 0; i < enableNotificationsButtons.length; i++) {
    enableNotificationsButtons[i].style.display = 'inline-block';
    enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
  }
}
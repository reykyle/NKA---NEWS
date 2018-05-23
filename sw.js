importScripts('./node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.3.js');
const staticAssets = [
		
	'./',
	'./styles.css',
	'./app.js',
	'./fallback.json',
	'./images/photo.jpg',
	'index.html'


];

const wb = new WorkboxSW();
wb.precache(staticAssets);

wb.router.registerRoute('https://newsapi.org/(.*)',wb.strategies.networkFirst());
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/,wb.strategies.cacheFirst({
	cacheName: 'news-images',
	cacheExpiration: {maxEntries: 20, maxAgeSeconds: 12*60*60},
	cacheableResponse: {statuses: [0,200]}
}));

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

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

  window.addEventListener('appinstalled', (evt) => {
	app.logEvent('a2hs', 'installed');
  });

/*
// activer le manifest en horsligne 
self.addEventListener("fetch", function(event) {} );


self.addEventListener('install', async event => {

	const cache = await caches.open('news-static');
	cache.addAll(staticAssets);

} );

self.addEventListener(`fetch`, event => {

	const req = event.request;
	const url = new URL(req.url);
	
	if (url.origin === location.origin ) {

		event.respondWith(cacheFirst(req));
	}

	else {

		event.respondWith(networkFirst(req));
	}


});

async function cacheFirst(req){

	const cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}

async function networkFirst(req) {

	const cache = await caches.open('news-dynamic');

	try {

		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	}

	catch (error) {
		const  cachedResponse = await cache.match(req);
		return cachedResponse || await caches.match('./fallback.json');
	}
}

*/
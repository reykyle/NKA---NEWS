importScripts('https://cdn.pushbots.com/js/pushbots-worker.js');
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






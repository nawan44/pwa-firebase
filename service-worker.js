const CACHE_NAME = 'firstpwa-v6';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/admin.html',
	'/pages/contact.html',
	'/pages/product.html',
	'/pages/input-product.html',

	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/images/icons/icon-72x72.png',
	'/images/icons/icon-96x96.png',
	'/images/icons/icon-128x128.png',
	'/images/icons/icon-144x144.png',
	'/images/icons/icon-152x152.png',
	'/images/icons/icon-192x192.png',
	'/images/icons/icon-384x384.png',
	'/images/icons/icon-512x512.png',
	'/manifest.json'

];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll(urlsToCache);
			})
	);
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
			.then(function (cacheNames) {
				return Promise.all(
					cacheNames.map(function (cacheName) {
						if (cacheName != CACHE_NAME) {
							console.log("ServiceWorker: cache " + cacheName + " deleted");
							return caches.delete(cacheName);
						}
					})
				);
			})
	);
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request, { cacheName: CACHE_NAME })
			.then(function (response) {
				if (response) {
					console.log("ServiceWorker: Use asset from cache: ", response.url);
					return response;
				}

				console.log("ServiceWorker: Load Asset from server: ", event.request.url);
				return fetch(event.request);
			})
	);
});
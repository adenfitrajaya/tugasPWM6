var	CACHE_NAME	=	'aden-cache';
/*program di atas di gunakan untuk memberikan nama cache yang kita inginkan pada saat riqust ke service worker*/
var	urlsToCache	=	[
		'.',
		'pages/images',
		'index.html',
		'nav.html',
		'pages/about.html',
		'pages/contact.html',
		'pages/home.html',
		'pages/Galeri.html',
		'css/materialize.css',
		'css/materialize.min.css'
		
];
self.addEventListener('install',	function(event)	{
		event.waitUntil(
				caches.open(CACHE_NAME)
				.then(function(cache)	{
						return	cache.addAll(urlsToCache);
				})
		);
});

self.addEventListener('fetch',	function(event)	{
		event.respondWith(
				caches.match(event.request)
				.then(function(response)	{
						return	response	||	fetchAndCache(event.request);
				})
		);
});
function	fetchAndCache(url)	{
		return	fetch(url)
		.then(function(response)	{
				//	Check	if	we	received	a	valid	response
				if	(!response.ok)	{
						throw	Error(response.statusText);
				}
				return	caches.open(CACHE_NAME)
				.then(function(cache)	{
						cache.put(url,	response.clone());
						return	response;
				});
		})
		.catch(function(error)	{
				console.log('Request	failed:',	error);
				//	You	could	return	a	custom	offline	404	page	here
		});
}


self.addEventListener('install',	function(event)	{
		console.log('Service	worker	installing...');
		/* pada bagian di atas berfungsi untuk menginstal service worker yang di mana akan tampil di bagian console apabila berhasil terinstal*/
		//	TODO	3.4:	Skip	waiting
		self.skipWaiting();
});
self.addEventListener('activate',	function(event)	{
		console.log('Service	worker	activating...');
		/*pada bagian di gunakan untuk mengaktivkan server worker*/
});
self.addEventListener('fetch',	function(event)	{
		console.log('Fetching:',	event.request.url);
		/*pada bagian di atas berfungsi untuk mengambil data yang mana akan menampilkan URL yang telah di ambil*/
});
const API = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';
const content = null || document.getElementById('content')
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '655ff6fb9cmsh9871bfa2a9e09d5p19139bjsnd6f39ba64e9a',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData (urlApi) {
    const response = await fetch(urlApi, options)
    const data = await response.json()
    return data
}

//funcion que se invoca a si misma
(async() => {
    try {
        const videos = await fetchData(API)
        let view =  
        `${videos.items.map(video => `<div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>
      </div>`).slice(0, 4).join('')}`         // unir todos los elementos
            content.innerHTML = view
    } catch (error) {
        console.log.error
    }
}) ()
/*try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}*/
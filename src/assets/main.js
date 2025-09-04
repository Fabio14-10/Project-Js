const CONTENT = document.getElementById("content");

const videos = [
  "https://www.tiktok.com/@norfarsaludfarmacenter2/video/7541033017226054968",
  "https://www.tiktok.com/@norfarsaludfarmacenter2/video/7535094054900567302",
  "https://www.tiktok.com/@norfarsaludfarmacenter2/video/7531486440237075718",
  "https://www.tiktok.com/@norfarsaludfarmacenter2/video/7325064574460300549",
  "https://www.tiktok.com/@norfarsaludfarmacenter2/video/7311392037893410054"
];

// Usa oEmbed de TikTok para obtener la portada
async function fetchThumbnail(url) {
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error("No se pudo cargar");
    const data = await res.json();
    return { cover: data.thumbnail_url, title: data.title, link: url };
  } catch (e) {
    console.error("Error:", e);
    return { cover: "./assets/fallback.jpg", title: "Video TikTok", link: url };
  }
}

async function renderVideos() {
  CONTENT.innerHTML = "<p class='text-slate-500'>Cargando videos...</p>";

  const items = await Promise.all(videos.map(v => fetchThumbnail(v)));

  CONTENT.innerHTML = "";
  items.forEach(v => {
    const card = document.createElement("a");
    card.href = v.link;
    card.target = "_blank";
    card.rel = "noopener";
    card.className =
      "snap-start group block rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md transition";

    card.innerHTML = `
      <div class="relative">
        <img src="${v.cover}" alt="${v.title}"
             class="aspect-[9/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]">
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
        <div class="absolute bottom-2 left-2 flex items-center gap-2">
          <div class="grid place-items-center h-8 w-8 rounded-full bg-black/60">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M8 5v14l11-7z"></path></svg>
          </div>
        </div>
      </div>
      <div class="p-2">
        <p class="text-sm text-slate-800 font-medium leading-snug line-clamp-2">${v.title}</p>
      </div>
    `;
    CONTENT.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderVideos);





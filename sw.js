const CACHE_NAME = "v1789193505407";
const ASSETS = ["icons/icon-192.png","Lore/Lanternfalls/Places/The Bookwyrm Bazaar.html","Lore/Lanternfalls/Cities/The Six Regions.html","Lore/Lanternfalls/Places/The Stacks of Echoes.html","Lore/Lanternfalls/Places/The Relic Foundry.html","Lore/Lanternfalls/NPC/Merrin Quill.html","Lore/Lanternfalls/NPC/Elowen Bramble.html","Lore/Lanternfalls/NPC/Cael Vey.html","Lore/Lanternfalls/NPC/Professor Orla Voss.html","Lore/Lanternfalls/NPC/Oriel Ash.html","Lore/Lanternfalls/NPC/Iven Caldar.html","Lore/Lanternfalls/NPC/The Unwritten.html","Lore/Lanternfalls/Items/Consumables/Potions/Tonic of Insight.html","Lore/Lanternfalls/Items/Consumables/Potions/Tonic of Fortune.html","Lore/Lanternfalls/Items/Consumables/Potions/Tonic of Focus.html","Lore/Lanternfalls/Items/Consumables/Potions/Tonic of Momentum.html","Lore/Lanternfalls/Items/Consumables/Potions/Tonic of the Hunt.html","Lore/Lanternfalls/Items/Consumables/Potions/Tonic of Wonders.html","Lore/Lanternfalls/Items/Equipment/Weapons/Reader's Orb.html","Lore/Lanternfalls/Items/Equipment/Weapons/The Inkblaster.html","Lore/Lanternfalls/Items/Equipment/Weapons/The Quillstaff.html","Lore/Lanternfalls/Items/Equipment/Weapons/info.html","Lore/Lanternfalls/Cities/info.html","Lore/Lanternfalls/Items/Equipment/Weapons/Boomerang Bookmark.html","index.html","_assets/archive.css","manifest.json"];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

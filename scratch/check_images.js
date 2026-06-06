import https from 'https';

const urls = [
  "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200",
  "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?q=80&w=1200",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
  "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200",
  "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=1200",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
  "https://images.unsplash.com/photo-1561361531-99522904d9c4?q=80&w=1200",
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200",
  "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200"
];

for (const url of urls) {
  https.get(url, (res) => {
    console.log(`${url.substring(0, 50)}... -> Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`${url.substring(0, 50)}... -> Error: ${err.message}`);
  });
}

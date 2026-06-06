import https from 'https';

const urls = [
  "https://images.unsplash.com/photo-1601999109332-542b18dbec57?q=80&w=1200", // Varanasi
  "https://images.unsplash.com/photo-1561361531-c4d20455c412?q=80&w=1200", // Varanasi
  "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200",  // Varanasi
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200"  // Kashmir
];

for (const url of urls) {
  https.get(url, (res) => {
    console.log(`${url} -> Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`${url} -> Error: ${err.message}`);
  });
}

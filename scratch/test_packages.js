import http from 'http';

http.get('http://localhost:5000/api/packages', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', res.headers);
    console.log('BODY LENGTH:', data.length);
    try {
      const parsed = JSON.parse(data);
      console.log('PACKAGES COUNT:', parsed.length);
      if (parsed.length > 0) {
        console.log('FIRST PACKAGE:', parsed[0].title);
      } else {
        console.log('BODY:', data);
      }
    } catch (e) {
      console.log('JSON Parse failed:', e.message);
      console.log('BODY:', data);
    }
  });
}).on('error', (err) => {
  console.error('ERROR:', err.message);
});

const https = require('https');
const data = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "find",
  params: {
    contract: "marketpools",
    table: "pools",
    query: { tokenPair: { "$regex": "BYTE" } }
  }
});
const options = {
  hostname: 'api.hive-engine.com',
  port: 443,
  path: '/rpc/contracts',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};
const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body).result, null, 2)));
});
req.write(data);
req.end();

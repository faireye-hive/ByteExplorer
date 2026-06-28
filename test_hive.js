const fetch = require('node-fetch');

async function test() {
  const body = {
    jsonrpc: "2.0",
    method: "bridge.get_account_posts",
    params: {
      sort: "feed",
      account: "faireye",
      limit: 2
    },
    id: 1,
  };
  const res = await fetch("https://api.hive.blog", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log(JSON.stringify(data).substring(0, 500));
}
test();

import http from "http";
import https from "https";
import { URL } from "url";

const TARGET = "https://clob.polymarket.com";
const PORT   = parseInt(process.env.PORT ?? "3000", 10);

const target = new URL(TARGET);

const server = http.createServer((req, res) => {
  const options = {
    hostname: target.hostname,
    port: 443,
    path: req.url,
    method: req.method,
    headers: { ...req.headers },
  };

  delete options.headers["host"];
  options.headers["host"] = target.hostname;

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (err) => {
    res.writeHead(502);
    res.end(JSON.stringify({ error: err.message }));
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, () => {
  console.log(`Proxy listening on :${PORT} → ${TARGET}`);
});

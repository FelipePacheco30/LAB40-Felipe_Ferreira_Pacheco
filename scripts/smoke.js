"use strict";

const assert = require("node:assert/strict");
const http = require("node:http");
const { createServer } = require("node:http");
const app = require("../src/app");

function request(port, path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: "127.0.0.1", port, path, ...options }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
    req.end(options.body);
  });
}

async function main() {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  try {
    const { port } = server.address();
    const health = await request(port, "/health");
    assert.equal(health.status, 200);
    assert.deepEqual(JSON.parse(health.body), { status: "ok", application: "LAB40" });

    const feature = await request(port, "/api/features/19", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valores: [8, 2, 5] })
    });
    assert.equal(feature.status, 200);
    assert.equal(JSON.parse(feature.body).result.menor, 2);
    console.log("Smoke test aprovado: /health e Feature 19 responderam corretamente.");
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

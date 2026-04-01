// osInfo.js
const os = require("os");

console.log("Hostname:", os.hostname());
console.log("Platform:", os.platform());
console.log("Uptime (seconds):", os.uptime());

// Convert bytes to MB
const totalMem = os.totalmem() / (1024 * 1024);
const freeMem = os.freemem() / (1024 * 1024);

console.log("Total Memory (MB):", totalMem.toFixed(2));
console.log("Free Memory (MB):", freeMem.toFixed(2));

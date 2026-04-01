// server.js
const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Welcome to the homepage");
    } 
    else if (req.url === "/about") {
        res.write("This is the about page");
    } 
    else {
        res.write("404 Page Not Found");
    }
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

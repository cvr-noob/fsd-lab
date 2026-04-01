const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Welcome to the homepage");
    } 
    else if (req.url === "/about") {
        res.write("This is the about page");
    } 
    else if (req.url === "/api/data") {
        const data = {
            name: "Ram",
            age: 35,
            city: "Hyderabad"
        };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
    } 
    else {
        res.write("404 Page Not Found");
    }
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

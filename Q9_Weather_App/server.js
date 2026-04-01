const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const API_KEY = "YOUR_API_KEY";

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/weather", async (req, res) => {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const r = await axios.get(url);
        res.render("weather", {
            city: r.data.name,
            temp: r.data.main.temp,
            humidity: r.data.main.humidity,
            condition: r.data.weather[0].description
        });
    } catch (error) {
        res.send("Error fetching weather data");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

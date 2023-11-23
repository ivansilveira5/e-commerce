const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html
const fs = require("fs");

const app = express(); // Crea una instancia de ExpressJS

const port = 4700;

const jwt = require("jsonwebtoken");

const SECRET_KEY = "Secreto"

let cors = require("cors");
app.use(cors());

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON


app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.use("/json/*", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.get("/json/:foldername/:file.json", (req, res) => {   
  const foldername = req.params.foldername;
  const fileName = req.params.file;

  // Assuming your JSON file path is constructed based on foldername
  const jsonFilePath = `./json/${foldername}/${fileName}.json`;

  // Read the JSON data from the file
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);

      // Send the entire JSON object as the response
      res.json(jsonData);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: 'Error parsing JSON' });
    }
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /people
app.use("/json/:foldername/:file.json", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no 11autorizado" });
  }
});




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


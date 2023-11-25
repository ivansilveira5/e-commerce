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

// Middleware que autoriza a realizar peticiones a /cartData
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

app.post("/product-info", (req, res) => {
  /* La propiedad "body" del request permite acceder a los datos 
       que se encuentran en el cuerpo de la petición */

    cart.push(req.body); // Añadimos un nuevo elemento al array

  res.json(req.body); // Le respondemos al cliente el objeto añadido
});

app.post("/cart", (req, res) => {
  const userId = 25801; // ID de usuario para agregar al archivo correcto
  const path = `./json/user_cart/${userId}.json`; // Dirección del archivo con el ID de usuario
  const newData = req.body; // Datos enviados en la solicitud POST

  fs.readFile(path, 'utf-8', (errorRead, data) => {
    if (errorRead) {
      console.error(errorRead);
      console.log('Algo salió mal');
      res.status(500).send('Error en la lectura del archivo');
      return;
    }

    const cartData = JSON.parse(data); // Parsear los datos del carrito

    // Encontrar el usuario por su ID o agregar uno nuevo si no existe
    let user = cartData.find(user => user.user === userId);
if (!user) {
  user = {
    user: userId,
    articles: []
  };
  cartData.push(user);
}
// agrega la nueva data a la lista del carrito
let existingArticle = user.articles.find(article => article.id === newData.id);
if (existingArticle) {
  existingArticle.count += 1;
} else {
  user.articles.push({...newData, count: 1});
}

    // Escribir de vuelta al archivo
    fs.writeFile(path, JSON.stringify(cartData), errorWrite => {
      if (errorWrite) {
        console.error(errorWrite);
        console.log('Error al escribir el archivo');
        res.status(500).send('Error al escribir en el archivo');
      } else {
        console.log('Actualizado!');
        res.json(newData);
      }
    });
  });
});

app.delete("/cart/:objid", (req, res) => {
  const userId = 25801; // ID de usuario para agregar al archivo correcto
  const path = `./json/user_cart/${userId}.json`;
  const deleteid = parseInt(req.params.objid);
  
  

  fs.readFile(path, 'utf-8', function(errorRead, data){
    
    if (errorRead) {
      console.error(errorRead);
      console.log('Algo salió mal');
      res.status(500).send('Error en la lectura del archivo');
      return;
    }

    const dataObj = JSON.parse(data);
    const cartdelete = dataObj[0].articles;
    const index = cartdelete.findIndex(item => item.id == deleteid);
    
    
    if(index >= 0 && index < cartdelete.length){
      cartdelete.splice(index, 1);
    
      fs.writeFile(path, JSON.stringify(dataObj), function(errorWrite) {
        if(errorWrite){
          console.error(errorWrite);
          console.log('Error al escribir en el archivo');
          res.status(500).send('Error al escribir en el archivo');
        } else{
          console.log('Eliminado con éxito');
          res.json(cartdelete)
        }
      })
    } else {
      console.log('Índice fuera de rango');
      res.status(400).send('Índice fuera de rango')
    }
  })
});


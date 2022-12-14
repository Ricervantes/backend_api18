//usamos el frameworks express para a API rest
const express = require('express');
//usaremos cors para permitir conexiones  entre distintos dominios localhost
const cors = require('cors');
require('dotenv').config();
//ponemos express en la variable server
const server = express();
//usamos el middleware de cors de express de cor que importamos previamente
server.use(cors());
//usamos el middleware de express.json para poder leer los datos que nos envian en el body
server.use(express.json());
//ponemos el puerto en una constante
const PORT = process.env.PORT;
//creamos un array de objetos para simular una base de datos
let platillos = [
    { nombre: 'chocolates', precio: 50 },
    { nombre: "mole", precio: 100 },
];

//verbos http
//get obtener datos
//post crear datos o realizar un proceso en servidor
//put actualizar datos
//delete eliminar datos
//creando endpoint principal
server.get("/", (request, response) => {
    response.send("API v1.01");
});
server.get("/platillos", (request, response) => {
    // response.send(platillos);
    response.json(
        {
            //data:platillos,
            data: platillos.map((platillo, index) => {
                return { index, ...platillo };
            }),
            count: platillos.length,
            mensaje: "platillos obtenidos correctamente"
        }
    );
});
// creando el endpoint para agregar un platillo
server.post("/platillos", (request, response) => {
    // response.send(platillos);
    //como lo agrego al array ?
    const platillo = request.body;
    if (!platillo.nombre || !platillo.precio) {
        return response.status(400).json({ mensaje: "el platillo necesita un nombre y un precio" });
    }
    platillos.push(platillo);
    response.json(
        {
            data: platillo,
            mensaje: "entro a la funcion de agregar platillos"
        }
    );

    //una funcion de flecha que accede a un req o res es una middleware
});
server.put("/platillos/:index", (request, response) => {
    const { index } = request.params;
    const platillo = request.body;
    platillos[index] = platillo;
    // response.send(platillos);
    //como lo agrego al array ?
    response.json(
        {
            data: platillo,
            mensaje: "entro a la funcion de agregar platillos"
        }
    );

    //una funcion de flecha que accede a un req o res es una middleware
});
//agregar el /al final del endpoint
server.delete("/platillos/:index", (request, response) => {
    const { index } = request.params;
    // sacaremos el  indice el parametro de la url
    platillos.splice(index, 1);
    //eliminaremos el elemento del array
    response.json(
        {
            mensaje: "platillo eliminado correctamente"
        }
    );

    //una funcion de flecha que accede a un req o res es una middleware
});
//iniciamos el servidor de express
server.listen(PORT, () => {
    console.log("se elimino correctamente");
});


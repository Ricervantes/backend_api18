//usamos el frameworks express para a API rest
const express=require('express');
//usaremos cors para permitir conexiones  entre distintos dominios localhost
const cors= require('cors');
//ponemos express en la variable server
const server = express();
//usamos el middleware de cors de express de cor que importamos previamente
server.use(cors());
//usamos el middleware de express.json para poder leer los datos que nos envian en el body
server.use(express.json());
//ponemos el puerto en una constante
const PORT=3000;
//creamos un array de objetos para simular una base de datos
let platillos =[
    {nombre:'Tacos', precio:50},
    {nombre:"mole", precio:100},
];

//verbos http
//get obtener datos
//post crear datos o realizar un proceso en servidor
//put
//delete
//creando endpoint principal
server.get("/",(request,response)=>{
    response.send("API v1.01");
});
server.get("/platillos",(request,response)=>{
   // response.send(platillos);
    response.json(
    {
        data:platillos,
        count:platillos.length,
        mensaje:"platillos obtenidos correctamente"
    }
    );
});
    // creando el endpoint para agregar un platillo
server.post("/platillos",(request,response)=>{
   // response.send(platillos);
   //como lo agrego al array ?
   const platillo=request.body;
   if(platillo.nombre){
    return response.status(400).json({mensaje:"el pletillo necesita un nombre"});
   }
   platillos.push(platillo);
    response.json(
    {
        data:platillo,
       mensaje:"entro a la funcion de agregar platillos"
    }
    );

    //una funcion de flecha que accede a un req o res es una middleware
});
//iniciamos el servidor de express
server.listen(PORT,()=>{
    console.log("servidor iniciado en el puerto 3000");
});

import express from 'express'
import userRoutes from './src/routers/user.routers.js';
import cors from 'cors'


const app= express()

app.use(cors()) 

app.use(express.json())

app.use(userRoutes)



app.listen(3000, () => {
  console.log("servidor corriendo en el puerto 3000");
});


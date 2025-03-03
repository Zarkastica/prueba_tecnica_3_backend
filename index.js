require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const app = express()
const PORT = process.env.PORT || 3000;
const api = require('./routes/api.routes');

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', api);
app.listen(PORT, () =>  {
    console.log(`Servidor corriendo en el puerto ${PORT}`);  
  })
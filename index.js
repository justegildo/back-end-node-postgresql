const express = require('express');
const port = 5000;
const app =express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ingredientRoutes = require('./src/routes/ingredient.routes');
const recetteRoutes = require('./src/routes/recette.routes');
const userRoutes = require ('./src/routes/utilisateur.routes');
const fournisseurRoutes = require ('./src/routes/fournisseur.routes');
const commandeRoutes = require ('./src/routes/commande.routes');
const ligneRoutes = require ('./src/routes/ligne.routes');
require('dotenv').config({path: './config/.env'});
const fileUpload = require('express-fileupload');

app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,',
    'preflightContinue': false 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    
}));


//ingredient router
app.use('/api/ingredient', ingredientRoutes);

//recette router
app.use('/api/recette', recetteRoutes);

//utilisateur
app.use('/api/user', userRoutes);

app.use('/api/fournisseur', fournisseurRoutes);

app.use('/api/commande', commandeRoutes);

app.use('/api/choice', ligneRoutes);

app.listen(port, () => 
    console.log(`Server started in port ${port}`
));
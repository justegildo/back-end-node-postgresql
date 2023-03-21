const recipePost = require("../config/dbConfig");
const ingredientQueries = require('../queries/ingredient.queries');

//afficher tous les ingredients
module.exports.getAllIngredients = async (req, res) => {
    recipePost.query(ingredientQueries.getAllIngredients, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// récupérer un ingrédient
module.exports.getIngredientById = (req, res) =>{
    const id = parseInt(req.params.id);
    recipePost.query(ingredientQueries.getIngredientById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    } )
} 

//env
module.exports.addIngredient =  (req, res) => {
    const { nom, description, categorie, unite_mesure, fournisseur, pays_origine, saisonnalite, allergenes, valeur_nutritionnelle } = req.body;

    //vérifier si l'ingrédient existe
    recipePost.query(ingredientQueries.checkLibelleExists, [nom], (error, results) =>{
        if (results.rows.length) {
            res.send("Cet ingrédient existe déjà dans la base de données !");
            //console.log("Erreur");
        } else {
            //ajouter un ingrédient
            recipePost.query(ingredientQueries.addIngredient, [nom, description, categorie, unite_mesure, fournisseur.id_fournisseur, pays_origine, saisonnalite, allergenes, valeur_nutritionnelle], (error, results) => {
                if (error) throw error;
                res.status(201).send("Ingrédient créee avec succès !");
            })
        }
    })
} 


//modifier un ingredient
module.exports.updateIngredient = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, description, categorie, unite_mesure, fournisseur, pays_origine, saisonnalite, allergenes, valeur_nutritionnelle } = req.body;

    recipePost.query(ingredientQueries.getIngredientById, [id], (error, results) =>{
        const noIngredientFound = !results.rows.length;
        if (noIngredientFound) {
            res.send("Impossible de modifier cet ingrédient car il n'existe pas dans la base de données.");
        } else {
            recipePost.query(ingredientQueries.updateIngredient, [nom, description, categorie, unite_mesure, fournisseur, pays_origine, saisonnalite, allergenes, valeur_nutritionnelle, id], (error, results) =>{
                if (error) throw error;
                res.status(200).send("Ingrédient modifié avec succès !");
            })
        }
    })
} 


//supprimer un ingredient
module.exports.deleteIngredient = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(ingredientQueries.getIngredientById, [id], (error, results) =>{

        const noIngredientFound = !results.rows.length;
        if (noIngredientFound) {
            res.send("Impossible de supprimer cet ingrédient car il n'existe pas dans la base de données. ");
        } else {
            recipePost.query(ingredientQueries.deleteIngredient, [id], (error, results) =>{
                if (error) throw error;
                res.status(200).send("Ingrédient supprimé avec succès");
            }) 
        }
    })
} 


module.exports.pictureIngredient = (req, res) =>{
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Aucun fichier téléchargé.');
    } else{
        // The nom of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.file;
        uploadPath = __dirname + '/imgIngredient/' + 'ingredient_' + sampleFile.name;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send('Fichier téléchargé avec succès!');
            }
            

        });
    }
  
    
  
}








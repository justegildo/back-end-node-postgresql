const recipePost = require("../config/dbConfig");
const recetteQueries = require('../queries/recette.queries');

//afficher tous les recettes
module.exports.getAllRecettes = async (req, res) => {
    recipePost.query(recetteQueries.getAllRecettes, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// récupérer une recette
module.exports.getRecetteById = (req, res) =>{
    const id = parseInt(req.params.id);
    recipePost.query(recetteQueries.getRecetteById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    } )

} 

//envoyer une recette
module.exports.addRecette =  (req, res) => {
    const { libelle, description, temps_preparation, temps_cuisson, instructions, prix_recette, difficulte, categorie, type, regime_alimentaire, note } = req.body;

    //console.log(req.body);
    //vérifier si la recette existe
    recipePost.query(recetteQueries.checkLibelleExists, [libelle], (error, results) =>{
        if (results.rows.length) {
            res.send("Cette recette existe déjà dans la base de données !");
        } else {
            //ajouter une recette
            recipePost.query(recetteQueries.addRecette, 
            [ libelle, description, temps_preparation, temps_cuisson, instructions, prix_recette, difficulte, categorie, type, regime_alimentaire, note ], (error, results) =>{

            if (error) throw error;
            res.status(201).send("Recette créee avec succès !");
            })
        }
    })
} 


//modifier une recette
module.exports.updateRecette = async (req, res) => {
    const id = parseInt(req.params.id);
    const { libelle, description, temps_preparation, temps_cuisson, instructions, prix_recette, difficulte, categorie, type, regime_alimentaire, note } = req.body;

    recipePost.query(recetteQueries.getRecetteById, [id], (error, results) =>{
        const noRecetteFound = !results.rows.length;
        if (noRecetteFound) {
            res.send("Impossible de modifier cette recette car il n'existe pas dans la base de données.");
        } else {
            recipePost.query(recetteQueries.updateRecette, 
                [ libelle, description, temps_preparation, temps_cuisson, instructions, prix_recette, difficulte, categorie, type, regime_alimentaire, note, id ], (error, results) =>{
    
                if (error) throw error;
                res.status(200).send("Recette modifiée avec succès !");
            })
        }
    })
} 


//supprimer un recette
module.exports.deleteRecette = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(recetteQueries.getRecetteById, [id], (error, results) =>{

        const noRecetteFound = !results.rows.length;
        if (noRecetteFound) {
            res.send("Impossible de supprimer cette recette car il n'existe pas dans la base de données. ");
        } else {
            recipePost.query(recetteQueries.deleteRecette, [id], (error, results) =>{
                if (error) throw error;
                res.status(200).send("Recette supprimée avec succès");
            })
        }
    })
} 

module.exports.pictureRecette = (req, res) =>{
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Aucun fichier téléchargé.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '/imgRecette/' + 'recette_' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err){
        return res.status(500).send(err);
      }
      res.send('Fichier téléchargé avec succès!');
      
  });
}






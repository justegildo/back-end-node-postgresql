const recipePost = require("../config/dbConfig");
const ligneQueries = require('../queries/ligne.queries');

//afficher tous les lignes
module.exports.getAllLignes = async (req, res) => {
    recipePost.query(ligneQueries.getAllLignes, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// récupérer un ingrédient
module.exports.getLigneById = (req, res) =>{
    const id = parseInt(req.params.id);
    recipePost.query(ligneQueries.getLigneById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    } )
} 

//env
module.exports.addLigne =  (req, res) => {
    const { id_recette, id_ingredient, unite, quantite } = req.body;

    //ajouter un ingrédient
    recipePost.query(ligneQueries.addLigne, [id_recette, id_ingredient, unite, quantite], (error, results) => {
        if (error) throw error;
        res.status(201).send("Ligne créee avec succès !");
    })
} 


//modifier un ligne
module.exports.updateLigne = async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_recette, id_ingredient, unite, quantite } = req.body;

    recipePost.query(ligneQueries.getLigneById, [id], (error, results) =>{
        const noligneFound = !results.rows.length;
        if (noligneFound) {
            res.send("Impossible de modifier cette ligne car il n'existe pas dans la base de données.");
        }

        recipePost.query(ligneQueries.updateLigne, [id_recette, id_ingredient, unite, quantite, id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Ligne modifié avec succès !");
        })
    })
} 


//supprimer un ligne
module.exports.deleteLigne = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(ligneQueries.getLigneById, [id], (error, results) =>{

        const noLigneFound = !results.rows.length;
        if (noLigneFound) {
            res.send("Impossible de supprimer cette ligne car il n'existe pas dans la base de données. ");
        }

        recipePost.query(ligneQueries.deleteLigne, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Ligne supprimé avec succès");
        }) 
    })
} 








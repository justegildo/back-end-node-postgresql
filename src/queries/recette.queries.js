const getAllRecettes = "SELECT recette.*, array_agg(ingredient.nom || ', ') as ingredients FROM recette JOIN ligne_recette_ingredient ON recette.id_recette = ligne_recette_ingredient.id_recette JOIN ingredient  ON ligne_recette_ingredient.id_ingredient = ingredient.id_ingredient GROUP BY recette.id_recette, ingredient.nom "; 

const getRecetteById = "SELECT * FROM recette WHERE id_recette = $1 ";

const checkLibelleExists = "SELECT libelle FROM recette WHERE libelle = $1 ";

const addRecette = 
    "INSERT INTO recette (libelle, description, temps_preparation, temps_cuisson, instructions, prix_recette, difficulte, categorie, type, regime_alimentaire, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

const deleteRecette = "DELETE FROM recette WHERE id_recette = $1";

const updateRecette = 
    "UPDATE recette SET libelle = $1, description = $2, temps_preparation = $3, temps_cuisson = $4, instructions = $5, prix_recette =$6, difficulte = $7, categorie = $8, type = $9, regime_alimentaire = $10, note = $11 WHERE id_recette = $12";



module.exports = {
    getAllRecettes,
    getRecetteById,
    checkLibelleExists,
    addRecette,
    deleteRecette,
    updateRecette
}

const getAllLignes = "SELECT * FROM ligne_recette_ingredient"; 

const getLigneById = "SELECT * FROM ligne_recette_ingredient WHERE id = $1 ";

const addLigne = "INSERT INTO ligne_recette_ingredient (id_recette, id_ingredient, unite, quantite) VALUES ($1, $2, $3, $4)";

const deleteLigne = "DELETE FROM ligne_recette_ingredient WHERE id = $1";

const updateLigne = "UPDATE ligne_recette_ingredient SET id_recette = $1, id_ingredient = $2, unite = $3, quantite = $4 WHERE id = $5";



module.exports = {
    getAllLignes,
    getLigneById,
    addLigne,
    deleteLigne,
    updateLigne
}
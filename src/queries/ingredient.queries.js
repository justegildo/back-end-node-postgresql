const getAllIngredients = "SELECT *, fournisseur.nom_fournisseur FROM ingredient LEFT JOIN fournisseur ON ingredient.fournisseur = fournisseur.id_fournisseur"; 

const getIngredientById = "SELECT * FROM ingredient WHERE id_ingredient = $1 ";

const checkLibelleExists = "SELECT nom FROM ingredient WHERE nom = $1 ";

const addIngredient = "INSERT INTO ingredient (nom, description, categorie, unite_mesure, fournisseur, pays_origine, saisonnalite, allergenes, valeur_nutritionnelle) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

const deleteIngredient = "DELETE FROM ingredient WHERE id_ingredient = $1";

const updateIngredient = "UPDATE ingredient SET nom = $1, description = $2, categorie = $3, unite_mesure = $4, fournisseur = $5, pays_origine = $6, saisonnalite = $7, allergenes = $8, valeur_nutritionnelle = $9 WHERE id_ingredient = $10";



module.exports = {
    getAllIngredients,
    getIngredientById,
    checkLibelleExists,
    addIngredient,
    deleteIngredient,
    updateIngredient
}
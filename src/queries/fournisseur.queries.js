const getAllFournisseurs = "SELECT * FROM fournisseur"; 

const getFournisseurById = "SELECT * FROM fournisseur WHERE id_fournisseur = $1 ";

const checkEmailExists = "SELECT * FROM fournisseur WHERE email = $1 ";

const addFournisseur = "INSERT INTO fournisseur (nom_fournisseur, adresse ,ville, pays, telephone, email, site_web, personne_contact, type_produit, note, conditions_paiement, remise_rabais) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";

const deleteFournisseur = "DELETE FROM fournisseur WHERE id_fournisseur = $1";

const updateFournisseur = "UPDATE fournisseur SET nom_fournisseur = $1, adresse = $2, ville = $3, pays = $4, telephone = $5, email = $6, site_web = $7, personne_contact = $8, type_produit = $9, note = $10, conditions_paiement = $11, remise_rabais = $12 WHERE id_fournisseur = $13";



module.exports = {
    getAllFournisseurs,
    getFournisseurById,
    checkEmailExists,
    addFournisseur,
    deleteFournisseur,
    updateFournisseur
}
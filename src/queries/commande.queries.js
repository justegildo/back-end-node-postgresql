const getAllCommandes = "SELECT * FROM commande"; 

const getCommandeById = "SELECT * FROM commande WHERE id_commande = $1 ";

//const checkLibelleExists = "SELECT nom_produit FROM commande WHERE nom_produit = $1 ";

const addCommande = "INSERT INTO commande (nom_produit, date_commande, quantite, prix_unitaire, id_fournisseur, delai_livraison) VALUES ($1, $2, $3, $4, $5, $6)";

const deleteCommande = "DELETE FROM commande WHERE id_commande = $1";

const updateCommande = "UPDATE commande SET nom_produit = $1, date_commande = $2, quantite = $3, prix_unitaire = $4, id_fournisseur = $5, delai_livraison = $6 WHERE id_Commande = $7";



module.exports = {
    getAllCommandes,
    getCommandeById,
    //checkLibelleExists,
    addCommande,
    deleteCommande,
    updateCommande
}
const recipePost = require("../config/dbConfig");
const commandeQueries = require('../queries/commande.queries');

//afficher tous les Commandes
module.exports.getAllCommandes = async (req, res) => {
    recipePost.query(commandeQueries.getAllCommandes, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// récupérer un ingrédient
module.exports.getCommandeById = (req, res) =>{
    const id = parseInt(req.params.id);
    recipePost.query(commandeQueries.getCommandeById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    } )
} 

//env
module.exports.addCommande =  (req, res) => {
    const { nom_produit, date_commande, quantite, prix_unitaire, id_fournisseur, delai_livraison } = req.body;

    //ajouter un ingrédient
    recipePost.query(commandeQueries.addCommande, [nom_produit, date_commande, quantite, prix_unitaire, id_fournisseur, delai_livraison], (error, results) => {
        if (error) throw error;
        res.status(201).send("Commande créee avec succès !");
    })

} 


//modifier un Commande
module.exports.updateCommande = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nom_produit, date_commande, quantite, prix_unitaire, id_fournisseur, delai_livraison } = req.body;

    recipePost.query(commandeQueries.getCommandeById, [id], (error, results) =>{
        const noCommandeFound = !results.rows.length;
        if (noCommandeFound) {
            res.send("Impossible de modifier cet commande car il n'existe pas dans la base de données.");
        }

        recipePost.query(commandeQueries.updateCommande, [nom_produit, date_commande, quantite, prix_unitaire, id_fournisseur, delai_livraison, id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Commande modifié avec succès !");
        })
    })
} 


//supprimer un Commande
module.exports.deleteCommande = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(commandeQueries.getCommandeById, [id], (error, results) =>{

        const noCommandeFound = !results.rows.length;
        if (noCommandeFound) {
            res.send("Impossible de supprimer cette commande car il n'existe pas dans la base de données. ");
        }

        recipePost.query(commandeQueries.deleteCommande, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Commande supprimé avec succès");
        }) 
    })
} 


module.exports.pictureCommande = (req, res) =>{
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Aucun fichier téléchargé.');
    }
  
    // The nom of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirnom + '/imgCommande/' + 'commande_'+ sampleFile.nom ;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err){
        return res.status(500).send(err);
      }
      res.send('Fichier téléchargé avec succès!');
      
  });
  
}








const recipePost = require("../config/dbConfig");
const fournisseurQueries = require('../queries/fournisseur.queries');

//afficher tous les Fournisseur
module.exports.getAllFournisseurs = async (req, res) => {
    recipePost.query(fournisseurQueries.getAllFournisseurs, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// récupérer une fournisseur
module.exports.getFournisseurById = (req, res) =>{
    const id = parseInt(req.params.id);
    recipePost.query(fournisseurQueries.getFournisseurById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    } )
} 

//ajouter une fournisseur
module.exports.addFournisseur = async (req, res) => {
    const { nom_fournisseur, adresse, ville, pays, telephone, email, site_web, personne_contact, type_produit, note, conditions_paiement, remise_rabais } = req.body;
    
     //vérifier si l'ingrédient existe
    recipePost.query(fournisseurQueries.checkEmailExists, [email], (error, results) =>{
        if (results.rows.length) {
            res.send("Cet email existe déjà dans la base de données !");
            //console.log("Erreur");
        } else{
            //ajouter un ingrédient
            recipePost.query(fournisseurQueries.addFournisseur, [nom_fournisseur, adresse, ville, pays, telephone, email, site_web, personne_contact, type_produit, note, conditions_paiement, remise_rabais], (error, results) => {
            if (error) throw error;
            res.status(201).send("Fournisseur créee avec succès !");
        })
        }
    })
} 


//modifier un fournisseur
module.exports.updateFournisseur = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nom_fournisseur, adresse, ville, pays, telephone, email, site_web, personne_contact, type_produit, note, conditions_paiement, remise_rabais } = req.body;

    recipePost.query(fournisseurQueries.getFournisseurById, [id], (error, results) =>{
        const noFournisseurFound = !results.rows.length;
        if (noFournisseurFound) {
            res.send("Impossible de modifier ce fournisseur car il n'existe pas dans la base de données.");
        } else{
            recipePost.query(fournisseurQueries.updateFournisseur, 
                [nom_fournisseur, adresse, ville, pays, telephone, email, site_web, personne_contact, type_produit, note, conditions_paiement, remise_rabais, id], (error, results) =>{
    
                if (error) throw error;
                res.status(200).send("Fournisseur modifié avec succès !");
            })
        }
    })
} 


//supprimer un fournisseur
module.exports.deleteFournisseur = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(fournisseurQueries.getFournisseurById, [id], (error, results) =>{

        const noFournisseurFound = !results.rows.length;
        if (noFournisseurFound) {
            res.send("Impossible de supprimer ce fournisseur car il n'existe pas dans la base de données. ");
        } else {
            recipePost.query(fournisseurQueries.deleteFournisseur, [id], (error, results) =>{
                if (error) throw error;
                res.status(200).send("Fournisseur supprimé avec succès");
            }) 
        }
    })
} 

module.exports.pictureFournisseur = (req, res) =>{
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Aucun fichier téléchargé.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '/imgFournisseur/' + 'fournisseur_' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err){
        return res.status(500).send(err);
      }
      res.send('Fichier téléchargé avec succès!');
      
  });
  
}







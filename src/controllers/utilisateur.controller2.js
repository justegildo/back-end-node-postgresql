const recipePost = require("../config/dbConfig");
const utilisateurQueries = require('../queries/utilisateur.queries');
const bcrypt = require('bcryptjs')

//afficher tous les utilisateurs
module.exports.getAllUtilisateurs = async (req, res) => {
    recipePost.query(utilisateurQueries.getAllUtilisateurs, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// récupérer une utilisateur
module.exports.getUtilisateurById = (req, res) =>{
    const id = parseInt(req.params.id);
    recipePost.query(utilisateurQueries.getUtilisateurById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    } )

} 

//ajouter une utilisateur
module.exports.addUtilisateur =  (req, res) => {
    const { nom, prenom, date_naissance, sexe, email, telephone, nationalite, password, type_utilisateur_id } = req.body;
    //.log(password);
    var hashPassword = bcrypt.hashSync(password);

    //vérifier si l'utilisateur existe
    recipePost.query(utilisateurQueries.checkEmailExists, [email], (error, results) =>{
        if (results.rows.length) {
            res.send("Cet utilisateur existe déjà dans la base de données !");
        }
    })
    //ajouter un utilisateur
    recipePost.query(utilisateurQueries.addUtilisateur, 
        [ nom, prenom, date_naissance, sexe, email, telephone, nationalite, hashPassword, type_utilisateur_id ], (error, results) =>{

        if (error) throw error;
        res.status(201).send("Utilisateur créee avec succès !");
    })
} 


//modifier un utilisateur
module.exports.updateUtilisateur = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, prenom, date_naissance, sexe, email, telephone, nationalite } = req.body;

    recipePost.query(utilisateurQueries.getUtilisateurById, [id], (error, results) =>{
        const noUtilisateurFound = !results.rows.length;
        if (noUtilisateurFound) {
            res.send("Impossible de modifier cet utilisateur car il n'existe pas dans la base de données.");
        }

        recipePost.query(utilisateurQueries.updateUtilisateur, 
            [nom, prenom, date_naissance, sexe, email, telephone, nationalite, id], (error, results) =>{

            if (error) throw error;
            res.status(200).send("Utilisateur modifié avec succès !");
        })
    })
} 


//supprimer un utilisateur
module.exports.deleteUtilisateur = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(utilisateurQueries.getUtilisateurById, [id], (error, results) =>{

        const noUtilisateurFound = !results.rows.length;
        if (noUtilisateurFound) {
            res.send("Impossible de supprimer cet utilisateur car il n'existe pas dans la base de données. ");
        }

        recipePost.query(utilisateurQueries.deleteUtilisateur, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("utilisateur supprimé avec succès");
        }) 
    })
} 








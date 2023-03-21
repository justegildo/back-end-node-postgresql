const recipePost = require("../config/dbConfig");
const utilisateurQueries = require('../queries/utilisateur.queries');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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
    })
} 

//ajouter une utilisateur
module.exports.addUtilisateur = async (req, res) => {
    const { nom, prenom , sexe, date_naissance, email, telephone, nationalite, password, id_type_utilisateur } = req.body;
    var hashPassword = bcrypt.hashSync(password);

    //vérifier si l'utilisateur existe
    recipePost.query(utilisateurQueries.checkEmailExists, [email], (error, results) =>{
        if (results.rows.length) {
            res.send("Cet email existe déjà dans la base de données !");
        } else {
            try {
                // Insert the new user into the database
                const result = recipePost.query(utilisateurQueries.addUtilisateur,
                    [nom, prenom, sexe, date_naissance, email, telephone, nationalite, hashPassword, id_type_utilisateur ]);
        
                // Send a welcome email to the new user
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    service: 'gmail',
                    auth: {
                        user: 'dossousedjrogildas@gmail.com' , // replace with your own email
                        pass: 'icsdmparqmlkjmfw' // replace with your own email password
                    }
                });
        
                 //génération du code de confirmation
                const crypto = require('crypto');
                const codeConfirmation = crypto.randomBytes(3).toString('hex');
                //console.log(codeConfirmation);
        
                //insertion du code dans la BD
                recipePost.query(utilisateurQueries.insertCodeConfirm, [ codeConfirmation], (err, res) => {
                    if (err) throw err;
                    console.log('Code de confirmation inséré avec succès dans la base de données');
                }) 
        
                //envoie du message à l'utilisateur
                let mailOptions = {
                    from: 'dossousedjrogildas@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: 'Re-Recipe', // Subject line
                    text: "Inscription réussie avec succès ! ", // plain text body
                    html: `<p>${prenom + ' ' + nom} une très chaleureuse bienvenue à vous sur notre plateforme Re-Recipe ! C\ agréable de vous avoir parmi nous ! </p><br> <p>Votre code de confirmation pour se connecter est : ${codeConfirmation}</p>`
                };
        
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email envoyé: ' + info.response);
                    }
                });
        
                res.json({
                    message: 'Utilisateur crée avec succès !'
                });
            } catch (err) {
                console.log(err.message);
            }
        }
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
        } else{
            recipePost.query(utilisateurQueries.updateUtilisateur, 
                [nom, prenom, date_naissance, sexe, email, telephone, nationalite, id], (error, results) =>{
    
                if (error) throw error;
                res.status(200).send("Utilisateur modifié avec succès !");
            })
        }
    })
} 


//supprimer un utilisateur
module.exports.deleteUtilisateur = (req, res) => {
    const id = parseInt(req.params.id);

    recipePost.query(utilisateurQueries.getUtilisateurById, [id], (error, results) =>{

        const noUtilisateurFound = !results.rows.length;
        if (noUtilisateurFound) {
            res.send("Impossible de supprimer cet utilisateur car il n'existe pas dans la base de données. ");
        } else{
            recipePost.query(utilisateurQueries.deleteUtilisateur, [id], (error, results) =>{
                if (error) throw error;
                res.status(200).send("utilisateur supprimé avec succès");
            }) 
        }
    })
} 

module.exports.pictureUser = (req, res) =>{
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Aucun fichier téléchargé.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '/profile/' + 'profile_' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err){
        return res.status(500).send(err);
      }
      res.send('Fichier téléchargé avec succès!');
      
  });
  
}







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
    } )
} 

//ajouter une utilisateur
module.exports.addUtilisateur = async (req, res) => {
    const { nom, prenom, date_naissance, sexe, email, telephone, nationalite, password, role } = req.body;
    var hashPassword = bcrypt.hashSync(password);

    try {
        // Insert the new user into the database
        const result = await recipePost.query(utilisateurQueries.addUtilisateur,
            [nom, prenom, date_naissance, sexe, email, telephone, nationalite, hashPassword, role ]);

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

        const crypto = require('crypto');
        const codeConfirmation = crypto.randomBytes(3).toString('hex');
        console.log(codeConfirmation);


        let mailOptions = {
            from: 'dossousedjrogildas@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Re-Recipe', // Subject line
            text: "Inscription réussie avec succès ! ", // plain text body
            html: `<p>${prenom + ' ' + nom} une très chaleureuse bienvenue à vous sur notre plateforme Re-Recipe ! C\ agréable de vous avoir parmi nous !</p>`
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


//modifier un utilisateur
module.exports.updateUtilisateur = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, prenom, date_naissance, sexe, email, telephone, nationalite, role } = req.body;

    recipePost.query(utilisateurQueries.getUtilisateurById, [id], (error, results) =>{
        const noUtilisateurFound = !results.rows.length;
        if (noUtilisateurFound) {
            res.send("Impossible de modifier cet utilisateur car il n'existe pas dans la base de données.");
        }

        recipePost.query(utilisateurQueries.updateUtilisateur, 
            [nom, prenom, date_naissance, sexe, email, telephone, nationalite, role, id], (error, results) =>{

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







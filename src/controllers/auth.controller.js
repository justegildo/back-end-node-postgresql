const jwt = require('jsonwebtoken');
const recipePost = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const utilisateurQueries = require('../queries/utilisateur.queries');

const maxAge = 3 ;
function generateAuthToken(userId) {
  return jwt.sign({ userId }, 'your-secret-key', {
    expiresIn: maxAge
  });
}

//module pour vérifier le code de confirmation
module.exports.verifyCode = async(req, res) =>{
  const email = req.body.email;
  const code_confirmation = req.body.code_confirmation;

  const query = `SELECT email, code_confirmation FROM utilisateur WHERE email = '${email}' AND code_confirmation = '${code_confirmation}'`;
  const result = await recipePost.query(query);
  const user = result.rows[0];
  
  if (!user) {
    res.status(401).send('Utilisateur non authentifié');
    return;
  } else {
    res.status(200).send('Utilisateur authentifié avec succès');
    return;
  }
}


//module pour s'authenrifier 
module.exports.signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //se connecter
  const query = `SELECT * FROM utilisateur WHERE email = '${email}'`;
  const result = await recipePost.query(query);
  const user = result.rows[0];
  //console.log(user);

  if (!user) {
      res.status(401).send('Utilisateur non trouvé');
      return;
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
      res.status(401).send('Mot de passe incorrect');
      return;
  } else {
    const token = generateAuthToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, expiresIn: 3});
    res.send({ user:user, token: token });
  }
  }
}


//module pour upadte le mot de passe
module.exports.updatePassword = async (req, res) =>{
  const newPassword = req.body.passwordNew;
  var hashPassword = bcrypt.hashSync(newPassword);
  const email = req.body.email;

  const query = `SELECT * FROM utilisateur WHERE email = '${email}'`;
  const result = await recipePost.query(query);
  const user = result.rows[0];

  if (!user) {
    res.status(401).send("Cet email n'existe pas dans la base de données. Merci de saisir un email correct");
    return;
  } else {
      recipePost.query(utilisateurQueries.updatePass, [hashPassword, email], (err, res) => {
        //console.log(err ? err.stack : 'Password updated');
      })
      res.send('Mot de passe modifié avec succès !!!');
  }
}


//deconnexion 
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

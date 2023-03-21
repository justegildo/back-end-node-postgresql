const router = require('express').Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const authController = require('../controllers/auth.controller');


//auth
router.post('/verify-code', authController.verifyCode);
router.post('/login', authController.signIn);
router.post('/update', authController.updatePassword);
router.get('/logout', authController.logout);

router.post("/register", utilisateurController.addUtilisateur);
router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.put('/:id', utilisateurController.updateUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);  

router.post('/upload-profile', utilisateurController.pictureUser);


module.exports = router;
const router = require('express').Router();
const fournisseurController = require('../controllers/fournisseur.controller');



router.post("/register", fournisseurController.addFournisseur);
router.get('/', fournisseurController.getAllFournisseurs);
router.get('/:id', fournisseurController.getFournisseurById);
router.put('/:id', fournisseurController.updateFournisseur);
router.delete('/:id', fournisseurController.deleteFournisseur);  

router.post('/upload-picture-fournisseur', fournisseurController.pictureFournisseur); 


module.exports = router;
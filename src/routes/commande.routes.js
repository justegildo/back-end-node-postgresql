const router = require('express').Router();
const commandeController = require('../controllers/commande.controller');



router.post("/register", commandeController.addCommande);
router.get('/', commandeController.getAllCommandes);
router.get('/:id', commandeController.getCommandeById);
router.put('/:id', commandeController.updateCommande);
router.delete('/:id', commandeController.deleteCommande);  

router.post('/upload-picture-commande', commandeController.pictureCommande); 


module.exports = router;
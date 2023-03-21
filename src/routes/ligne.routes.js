const router = require('express').Router();
const ligneController = require('../controllers/ligne.controller');



router.post("/register", ligneController.addLigne);
router.get('/', ligneController.getAllLignes);
router.get('/:id', ligneController.getLigneById);
router.put('/:id', ligneController.updateLigne);
router.delete('/:id', ligneController.deleteLigne);  


module.exports = router;
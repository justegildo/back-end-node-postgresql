const router = require('express').Router();
const recetteController = require('../controllers/recette.controller');

router.post("/register", recetteController.addRecette);
router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.getRecetteById);
router.put('/:id', recetteController.updateRecette);
router.delete('/:id', recetteController.deleteRecette);  

router.post("/upload-picture-recette", recetteController.pictureRecette);


module.exports = router;
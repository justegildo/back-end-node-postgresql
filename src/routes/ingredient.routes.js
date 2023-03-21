const router = require('express').Router();
const ingredientController = require('../controllers/ingredient.controller');



router.post("/register", ingredientController.addIngredient);
router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredientById);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);  

router.post('/upload-picture-ingredient', ingredientController.pictureIngredient); 


module.exports = router;
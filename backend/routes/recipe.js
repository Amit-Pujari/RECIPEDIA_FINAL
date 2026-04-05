const express = require("express")
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload, getComments, addComment } = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router = express.Router()

router.get("/", getRecipes) //Get all recipes
router.get("/:id", getRecipe) //Get recipe by id
router.post("/", upload.single('file'), verifyToken , addRecipe) //add recipe
router.put("/:id", upload.single('file'), editRecipe) //Edit recipe
router.delete("/:id", deleteRecipe) //Delete recipe

router.get("/:id/comments", getComments)
router.post("/:id/comments", addComment)

module.exports = router

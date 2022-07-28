const SchoolControleur = require("../controleur/schoolDB");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;


router.get("/all/:offset",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,SchoolControleur.getAllSchools);
router.get("/nb",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,SchoolControleur.getCountSchools);
router.patch("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,SchoolControleur.updateSchool);
router.get("/:id",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,SchoolControleur.getSchool);
router.post("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,SchoolControleur.postSchool);
router.delete("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,SchoolControleur.deleteSchool);

module.exports = router;
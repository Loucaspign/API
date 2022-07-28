const LocationControleur = require("../controleur/locationDB");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;


router.get("/all/:offset",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,LocationControleur.getAllLocations);
router.get("/nb",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,LocationControleur.getCountLocations);
router.patch("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,LocationControleur.updateLocation);
router.get("/:id",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,LocationControleur.getLocation);
router.post("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,LocationControleur.postLocation);
router.delete("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,LocationControleur.deleteLocation);

module.exports = router;
const ColocationControler = require("../controleur/colocationDB");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;


router.get("/all/:offset",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ColocationControler.getAllColocations);
router.get("/nb",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ColocationControler.getCountcolocations);
router.patch("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ColocationControler.updateColocation);
router.get("/:id",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ColocationControler.getColocation);
router.post("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ColocationControler.postColocation);
router.delete("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ColocationControler.deleteColocation);

module.exports = router;
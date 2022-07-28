const UserControler = require("../controleur/userDB");
const Router = require("express-promise-router");
const router = new Router;
const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const UserControlerJWT = require('../controleur/userJWTdb');


router.get("/all/:offset",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, UserControler.getAllUsers);
router.get("/nb",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,UserControler.getCountUsers);
router.post("/login",UserControlerJWT.login);
router.get("/admin",JWTMiddleWare.identification,AuthoMiddleware.mustBeAdmin,module.exports.result = (req, res) => { res.json ( {"admin" : true});});
router.get("/:id",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,UserControler.getUser);
router.patch("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,UserControler.updateUser);
router.post("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,UserControler.postUser);
router.delete("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,UserControler.deleteUser);

module.exports = router;
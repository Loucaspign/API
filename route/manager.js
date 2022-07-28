const ManagerControler = require("../controleur/managerDB");
const Router = require("express-promise-router");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const router = new Router;


router.get("/all/:offset",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControler.getAllManagers);
router.get("/nb",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControler.getCountManagers);
router.patch("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControler.updateManager);
router.get("/:id",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,ManagerControler.getManager);
router.post("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControler.postManager);
router.delete("/",JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ManagerControler.deleteManager);

module.exports = router;
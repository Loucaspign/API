const userRouter = require("./user");
const colocationRouter = require("./colocation");
const locationRouter = require("./location");
const managerRouter = require("./manager");
const schoolRouter = require("./school");
const router = require("express").Router();

router.use("/user",userRouter);
router.use("/colocation",colocationRouter);
router.use("/location",locationRouter);
router.use("/manager",managerRouter);
router.use("/school",schoolRouter);

module.exports = router;
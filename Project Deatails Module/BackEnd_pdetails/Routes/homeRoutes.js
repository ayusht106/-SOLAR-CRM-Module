const router= require("express").Router();
const hcontro= require('../Controller/userController');

router.post("/login", hcontro.logins);

router.post("/register", hcontro.registers);

module.exports = router;


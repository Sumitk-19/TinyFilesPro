const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { getHistory } = require("../controllers/history.controller");

router.get("/", auth, getHistory);

module.exports = router;

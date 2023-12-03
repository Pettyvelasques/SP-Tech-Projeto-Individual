var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/obterDadosDash", function (req, res) {
	medidaController.obterDadosDash(req, res);
});

module.exports = router;

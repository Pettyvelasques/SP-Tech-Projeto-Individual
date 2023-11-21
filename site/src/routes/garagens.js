var express = require("express");
var router = express.Router();

var garagemController = require("../controllers/garagemController");

router.get("/:idUsuario", function (req, res) {
	garagemController.buscarMotosPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
	garagemController.cadastrar(req, res);
});

router.post("/deletar", function (req, res) {
	garagemController.deletar(req, res);
});

router.post("/possuiMoto", function (req, res) {
	garagemController.possuiMoto(req, res);
});

module.exports = router;

var garagemModel = require("../models/garagemModel");

function buscarMotosPorUsuario(req, res) {
	var idUsuario = req.params.idUsuario;

	garagemModel
		.buscarMotosPorUsuario(idUsuario)
		.then((resultado) => {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).json([]);
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log("Houve um erro ao buscar a garagem: ", erro.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function cadastrar(req, res) {
	var fkGaragem = req.body.fkGaragemServer;
	var fkUsuario = req.body.fkUsuarioServer;
	var fkMoto = req.body.fkMotoServer;

	if (fkGaragem == undefined) {
		res.status(400).send("fkGaragem está undefined!");
	} else if (fkUsuario == undefined) {
		res.status(400).send("fkUsuario está undefined!");
	} else if (fkMoto == undefined) {
		res.status(400).send("fkMoto está undefined!");
	} else {
		garagemModel
			.cadastrar(fkGaragem, fkUsuario, fkMoto)
			.then((resultado) => {
				res.status(201).json(resultado);
			})
			.catch((erro) => {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function deletar(req, res) {
	var fkGaragem = req.body.fkGaragemServer;
	var fkUsuario = req.body.fkUsuarioServer;
	var fkMoto = req.body.fkMotoServer;

	if (fkGaragem == undefined) {
		res.status(400).send("fkGaragem está undefined!");
	} else if (fkUsuario == undefined) {
		res.status(400).send("fkUsuario está undefined!");
	} else if (fkMoto == undefined) {
		res.status(400).send("fkMoto está undefined!");
	} else {
		garagemModel
			.deletar(fkGaragem, fkUsuario, fkMoto)
			.then((resultado) => {
				res.status(201).json(resultado);
			})
			.catch((erro) => {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function possuiMoto(req, res) {
	var fkMoto = req.body.fkMotoServer;
	var temMoto = req.body.temMotoServer;

	if (fkMoto == undefined) {
		res.status(400).send("fkMoto está undefined!");
	} else if (temMoto == undefined) {
		res.status(400).send("temMoto está undefined!");
	} else {
		garagemModel
			.possuiMoto(fkMoto, temMoto)
			.then((resultado) => {
				res.status(201).json(resultado);
			})
			.catch((erro) => {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	buscarMotosPorUsuario,
	cadastrar,
	deletar,
	possuiMoto,
};

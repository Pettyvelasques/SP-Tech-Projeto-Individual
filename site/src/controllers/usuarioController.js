var usuarioModel = require("../models/usuarioModel");
var garagemModel = require("../models/garagemModel");

function autenticar(req, res) {
	var username = req.body.usernameServer;
	var senha = req.body.senhaServer;

	if (username == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está undefined!");
	} else {
		usuarioModel
			.autenticar(username, senha)
			.then(function (resultadoAutenticar) {
				console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
				console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

				if (resultadoAutenticar.length == 1) {
					console.log(resultadoAutenticar);

					garagemModel
						.buscarMotosPorUsuario(resultadoAutenticar[0].idUsuario)
						.then((resultadoMotos) => {
							if (resultadoMotos.length >= 0) {
								console.log(resultadoMotos);

								garagemModel.buscarMotosLoja().then((resultadoMotosLoja) => {
									if (resultadoMotosLoja.length > 0) {
										console.log(resultadoMotosLoja);

										res.json({
											id: resultadoAutenticar[0].idUsuario,
											username: resultadoAutenticar[0].username,
											nome: resultadoAutenticar[0].nome,
											sobrenome: resultadoAutenticar[0].sobrenome,
											cidade: resultadoAutenticar[0].cidade,
											senha: resultadoAutenticar[0].senha,
											idGaragem: resultadoAutenticar[0].idGaragem,
											motosUsuario: resultadoMotos,
											motosLoja: resultadoMotosLoja,
										});
									} else {
										res.status(204).json({ motosLoja: [] });
									}
								});
							} else {
								res.status(204).json({ motosUsuario: [] });
							}
						});
				} else if (resultadoAutenticar.length == 0) {
					res.status(403).send("Email e/ou senha inválido(s)");
				} else {
					res.status(403).send("Mais de um usuário com o mesmo login e senha!");
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o login! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function cadastrar(req, res) {
	// Crie uma variável que vá recuperar os valores do arquivo cadastro.html

	var usuario = req.body.usuarioServer;
	var nome = req.body.nomeServer;
	var sobrenome = req.body.sobrenomeServer;
	var cidade = req.body.cidadeServer;
	var email = req.body.emailServer;
	var senha = req.body.senhaServer;

	// Faça as validações dos valores
	if (usuario == undefined) {
		res.status(400).send("Seu usuário está undefined!");
	} else if (nome == undefined) {
		res.status(400).send("Seu nome está undefined!");
	} else if (sobrenome == undefined) {
		res.status(400).send("Seu sobrenome está undefined!");
	} else if (cidade == undefined) {
		res.status(400).send("Sua cidade está undefined!");
	} else if (email == undefined) {
		res.status(400).send("Seu email está undefined!");
	} else if (senha == undefined) {
		res.status(400).send("Sua senha está undefined!");
	} else {
		// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
		usuarioModel
			.cadastrar(usuario, nome, sobrenome, cidade, email, senha)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
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
	autenticar,
	cadastrar,
};

var medidaModel = require("../models/medidaModel");

function obterDadosDash(req, res) {
	var fkUsuario = req.body.fkUsuarioServer;
	var fkGaragem = req.body.fkGaragemServer;

	if (fkUsuario == undefined) {
		res.status(400).send("fkUsuario está undefined!");
	} else if (fkGaragem == undefined) {
		res.status(400).send("fkGaragem está undefined!");
	} else {
		medidaModel
			.quantMotosGaragem(fkGaragem, fkUsuario)
			.then(function (resultadoMotosGaragem) {
				console.log(
					`\nResultados encontrados: ${resultadoMotosGaragem.length}`
				);
				console.log(`Resultados: ${JSON.stringify(resultadoMotosGaragem)}`); // transforma JSON em String

				if (resultadoMotosGaragem.length == 1) {
					console.log(resultadoMotosGaragem);

					medidaModel
						.quantMotosCompradas(fkGaragem, fkUsuario)
						.then((resultadoMotosCompradas) => {
							if (resultadoMotosCompradas.length >= 0) {
								console.log(resultadoMotosCompradas);

								medidaModel
									.valorMotosGaragem(fkGaragem, fkUsuario)
									.then((resultadoValorGaragem) => {
										if (resultadoValorGaragem.length > 0) {
											console.log(resultadoValorGaragem);

											medidaModel
												.valorMotosCompradas(fkGaragem, fkUsuario)
												.then((resultadoValorCompradas) => {
													if (resultadoValorCompradas.length > 0) {
														console.log(resultadoValorCompradas);

														medidaModel
															.dadosTodasMotos()
															.then((resultadoTodasMotos) => {
																if (resultadoTodasMotos.length > 0) {
																	console.log(resultadoTodasMotos);

																	medidaModel
																		.dadosMotosGaragem(fkGaragem, fkUsuario)
																		.then((resultadoTodasMotosGaragem) => {
																			if (
																				resultadoTodasMotosGaragem.length > 0
																			) {
																				console.log(resultadoTodasMotosGaragem);

																				res.json({
																					quantGaragem:
																						resultadoMotosGaragem[0].totalMotos,
																					quantComprada:
																						resultadoMotosCompradas[0]
																							.totalCompradas,
																					valorGaragem:
																						resultadoValorGaragem[0].precoTotal,
																					valorComprada:
																						resultadoValorCompradas[0]
																							.precoCompradas,
																					motosGaragem:
																						resultadoTodasMotosGaragem,
																					motosLoja: resultadoTodasMotos,
																				});
																			} else {
																				res
																					.status(204)
																					.send(
																						"Nenhum resultado encontrado para Todas as Motos"
																					);
																			}
																		})
																		.catch(function (erro) {
																			console.log(erro);
																			console.log(
																				"\nNenhum resultado encontrado para Todas as Motos",
																				erro.sqlMessage
																			);
																			res.status(500).json(erro.sqlMessage);
																		});
																} else {
																	res
																		.status(204)
																		.send(
																			"Nenhum resultado encontrado para Todas as Motos"
																		);
																}
															})
															.catch(function (erro) {
																console.log(erro);
																console.log(
																	"\nNenhum resultado encontrado para Todas as Motos",
																	erro.sqlMessage
																);
																res.status(500).json(erro.sqlMessage);
															});
													} else {
														res
															.status(204)
															.send(
																"Nenhum resultado encontrado para Valor Total das Motos Compradas"
															);
													}
												})
												.catch(function (erro) {
													console.log(erro);
													console.log(
														"\nNenhum resultado encontrado para Valor Total das Motos Compradas",
														erro.sqlMessage
													);
													res.status(500).json(erro.sqlMessage);
												});
										} else {
											res
												.status(204)
												.send(
													"Nenhum resultado encontrado para Valor Total das Motos na Garagem"
												);
										}
									})
									.catch(function (erro) {
										console.log(erro);
										console.log(
											"\nNenhum resultado encontrado para Valor Total das Motos na Garagem",
											erro.sqlMessage
										);
										res.status(500).json(erro.sqlMessage);
									});
							} else {
								res
									.status(204)
									.send(
										"Nenhum resultado encontrado para Quantidade de Motos Compradas"
									);
							}
						})
						.catch(function (erro) {
							console.log(erro);
							console.log(
								"\nNenhum resultado encontrado para Quantidade de Motos Compradas",
								erro.sqlMessage
							);
							res.status(500).json(erro.sqlMessage);
						});
				} else {
					res
						.status(204)
						.send(
							"Nenhum resultado encontrado para Quantidade de Motos na Garagem"
						);
				}
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nNenhum resultado encontrado para Quantidade de Motos na Garagem",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	obterDadosDash,
};

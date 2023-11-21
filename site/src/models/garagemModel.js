var database = require("../database/config");

function buscarMotosPorUsuario(idUsuario) {
	instrucaoSql = `select m.idMoto, m.modelo, m.marca, m.preco, m.cilindrada, m.potencia, m.torque, m.consumo, m.tanque, mg.motoComprada from motoNaGaragem as mg join moto as m on fkMoto = idMoto where mg.fkUsuario = ${idUsuario}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarMotosLoja() {
	instrucaoSql = `select * from moto`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrar(fkGaragem, fkUsuario, fkMoto) {
	instrucaoSql = `insert into motoNaGaragem values (${fkGaragem}, ${fkUsuario}, ${fkMoto}, 0);`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function deletar(fkGaragem, fkUsuario, fkMoto) {
	instrucaoSql = `delete from motoNaGaragem where fkGaragem=${fkGaragem} and fkUsuario=${fkUsuario} and fkMoto=${fkMoto}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function possuiMoto(fkMoto, temMoto) {
	instrucaoSql = `update motoNaGaragem set motoComprada=${temMoto} where fkMoto=${fkMoto}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	buscarMotosPorUsuario,
	buscarMotosLoja,
	possuiMoto,
	cadastrar,
	deletar,
};

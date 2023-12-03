var database = require("../database/config");

function quantMotosGaragem(fkGaragem, fkUsuario) {
	instrucaoSql = `select count(fkMoto) as totalMotos from motoNaGaragem where fkGaragem=${fkGaragem} and fkUsuario=${fkUsuario}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function quantMotosCompradas(fkGaragem, fkUsuario) {
	instrucaoSql = `select count(fkMoto) as totalCompradas from motoNaGaragem where motoComprada=1 and fkGaragem=${fkGaragem} and fkUsuario=${fkUsuario}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function valorMotosGaragem(fkGaragem, fkUsuario) {
	instrucaoSql = `select sum(m.preco) as precoTotal from motoNaGaragem as mg join moto as m on fkMoto = idMoto where mg.fkGaragem=${fkGaragem} and mg.fkUsuario=${fkUsuario}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function valorMotosCompradas(fkGaragem, fkUsuario) {
	instrucaoSql = `select sum(m.preco) as precoCompradas from motoNaGaragem as mg join moto as m on fkMoto = idMoto where mg.motoComprada=1 and mg.fkGaragem=${fkGaragem} and mg.fkUsuario=${fkUsuario}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dadosMotosGaragem(fkGaragem, fkUsuario) {
	instrucaoSql = `select * from motoNaGaragem as mg join moto on fkMoto = idMoto where mg.fkGaragem = ${fkGaragem} and mg.fkUsuario=${fkUsuario}`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function dadosTodasMotos() {
	instrucaoSql = `select * from moto`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	quantMotosGaragem,
	quantMotosCompradas,
	valorMotosGaragem,
	valorMotosCompradas,
	dadosMotosGaragem,
	dadosTodasMotos,
};

var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
	instrucaoSql = "";

	if (process.env.AMBIENTE_PROCESSO == "producao") {
		instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
	} else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
		instrucaoSql = `select
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
	} else {
		console.log(
			"\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
		);
		return;
	}

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
	instrucaoSql = "";

	if (process.env.AMBIENTE_PROCESSO == "producao") {
		instrucaoSql = `select top 1
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        CONVERT(varchar, momento, 108) as momento_grafico,
                        fk_aquario
                        from medida where fk_aquario = ${idAquario}
                    order by id desc`;
	} else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
		instrucaoSql = `select
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico,
                        fk_aquario
                        from medida where fk_aquario = ${idAquario}
                    order by id desc limit 1`;
	} else {
		console.log(
			"\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
		);
		return;
	}

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

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
	buscarUltimasMedidas,
	buscarMedidasEmTempoReal,
	quantMotosGaragem,
	quantMotosCompradas,
	valorMotosGaragem,
	valorMotosCompradas,
	dadosMotosGaragem,
	dadosTodasMotos,
};

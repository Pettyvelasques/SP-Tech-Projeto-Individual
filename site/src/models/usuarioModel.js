var database = require("../database/config");

function autenticar(username, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		username,
		senha
	);
	var instrucao = `
        SELECT u.idUsuario, u.username, u.nome, u.sobrenome, u.cidade, g.idGaragem FROM usuario as u join garagem as g on fkUsuario = idUsuario WHERE username = '${username}' AND senha = '${senha}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(username, nome, sobrenome, cidade, email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		username,
		nome,
		sobrenome,
		cidade,
		email,
		senha
	);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucao = `
        INSERT INTO usuario (username, nome, sobrenome, cidade, email, senha) VALUES ('${username}', '${nome}', '${sobrenome}', '${cidade}', '${email}', '${senha}');
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao).then((result) => {
		const idUsuario = result.insertId;

		return cadastrarGaragem(idUsuario);
	});
}

function cadastrarGaragem(idUsuario) {
	var instrucao = `
        INSERT INTO garagem (fkUsuario) VALUES ('${idUsuario}');
    `;
	return database.executar(instrucao);
}

module.exports = {
	autenticar,
	cadastrar,
};

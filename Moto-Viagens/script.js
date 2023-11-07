var motosNaGaragem = ["CRF-1100L", "PCX-150", "CB-300F", "CG-160"];
var imagemMotoAtual = document.getElementById("motocicletaAtual");
var imagemMotoOut = document.getElementById("motocicletaGetIn");
var imagemMotoIn = document.getElementById("motocicletaGetOut");
var motoAtual = imagemMotoAtual.classList;
var indexAtual = 0;

function anteriorMotocicleta() {
	if (motoAtual.value != -1) {
		indexAtual = motosNaGaragem.indexOf(motoAtual.value);
	}
	if (indexAtual == 0) {
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual = motosNaGaragem.length - 1;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoOut.style = `display: block`;

		imagemMotoIn.classList = `motoLeftOut`;
		imagemMotoOut.classList = `motoLeftIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
		}, 1450);
	} else {
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual -= 1;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoOut.style = `display: block`;

		imagemMotoIn.classList = `motoLeftOut`;
		imagemMotoOut.classList = `motoLeftIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
		}, 1450);
	}
}
function proximaMotocicleta() {
	console.log(indexAtual);
	if (motoAtual.value != -1) {
		indexAtual = motosNaGaragem.indexOf(motoAtual.value);
	}
	if (indexAtual == motosNaGaragem.length - 1) {
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual = 0;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;

		imagemMotoIn.classList = `motoRightOut`;
		imagemMotoOut.classList = `motoRightIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
		}, 1450);
	} else {
		imagemMotoIn.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoIn.style = `display: block`;
		imagemMotoAtual.style = `display: none`;

		indexAtual += 1;
		imagemMotoAtual.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoAtual.classList = `${motosNaGaragem[indexAtual]}`;

		imagemMotoOut.src = `../Banco-de-Motos/Honda/${motosNaGaragem[indexAtual]}.webp`;
		imagemMotoOut.style = `margin-right: 0; margin-left:1500px; display: block`;

		imagemMotoIn.classList = `motoRightOut`;
		imagemMotoOut.classList = `motoRightIn`;

		setTimeout(() => {
			imagemMotoAtual.style = `display: block`;
			imagemMotoIn.style = `display: none`;
			imagemMotoOut.style = `display: none`;

			imagemMotoIn.classList = ``;
			imagemMotoOut.classList = ``;
		}, 1450);
	}
}

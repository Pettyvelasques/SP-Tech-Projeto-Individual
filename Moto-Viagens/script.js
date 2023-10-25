// const URL_TO_FETCH = "./JSON/dbMotos.json";
// fetch(URL_TO_FETCH)
// 	.then(function (response) {
// 		response.json().then(function (data) {
// 			console.log(data);
// 		});
// 	})
// 	.catch(function (err) {
// 		console.error("Failed retrieving information", err);
// 	});

// fetch("./JSON/dbMotos.json").then((res) => console.log(res));

fetch("JSON/dbMotos.json")
	.then((response) => response.json())
	.then((json) => console.log(json));

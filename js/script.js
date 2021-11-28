class Curso {
	constructor(identificador, descricao, imagem, links, professor, titulo) {
		this.identificador = identificador;
        this.descricao = descricao;
        this.imagem = imagem;
        this.links = links;
        this.professor = professor;
        this.titulo = titulo;
    }
}

const formulario = document.querySelector("[data-list-form]");

let listaComCursos = [];
let curso = null;
let linhaSelecionada = null;
let conteudoLista = document.querySelector("[new-list]");

formulario.addEventListener("submit", function(e) {
	e.preventDefault();

	let formData = lerFormulario();
    
	if(linhaSelecionada == null) {
		criarCurso(formData);
	} else {
		atualizarCurso(formData);
	}

	limparFormulario();

});

function lerFormulario() {
    var formData = {};

    formData["identificador"] = new Date().getTime();
    formData["descricao"] = document.getElementById("descricao").value;
    formData["imagem"] = document.getElementById("imagem").value;
    formData["links"] = document.getElementById("links").value;
    formData["professor"] = document.getElementById("professor").value;
    formData["titulo"] = document.getElementById("titulo").value;

    return formData;
}

function criarCurso(data) {
    curso = new Curso(data.identificador, data.descricao, data.imagem, data.links, data.professor, data.titulo);
    
	listaComCursos.push(curso);
    console.log(listaComCursos);
	exibirCurso();
}

function editarCurso(td) {
	linhaSelecionada = td.parentElement.parentElement;
    console.log(linhaSelecionada);

	let tamanhoImg = linhaSelecionada.cells[0].innerHTML.length;
	let tamanhoLink = linhaSelecionada.cells[5].innerHTML.length;

    document.getElementById("imagem").value = linhaSelecionada.cells[0].innerHTML.substring(10, tamanhoImg - 42);
    //document.getElementById("identificador").value = linhaSelecionada.cells[1].innerHTML;
	document.getElementById("titulo").value = linhaSelecionada.cells[2].innerHTML;
    document.getElementById("descricao").value = linhaSelecionada.cells[3].innerHTML;
    document.getElementById("professor").value = linhaSelecionada.cells[4].innerHTML;
    document.getElementById("links").value = linhaSelecionada.cells[5].innerHTML.substring(13, tamanhoLink - 4);
}

function atualizarCurso(formData) {
	linhaSelecionada.cells[1].innerHTML = formData.titulo;
    linhaSelecionada.cells[2].innerHTML = formData.descricao;
    linhaSelecionada.cells[3].innerHTML = formData.imagem;
    linhaSelecionada.cells[4].innerHTML = formData.professor;
    linhaSelecionada.cells[5].innerHTML = formData.links;
}

function deletarCurso(td) {
	if(confirm("Você tem certeza que quer apagar esse curso?")) {
        linha = td.parentElement.parentElement;
        document.getElementById("listaDeCursos").deleteRow(linha.rowIndex);
		limparFormulario();
    }
}

function exibirCurso() {
	let novaLinha = document.createElement("tr");
	
    listaComCursos.forEach(el => {
		novaLinha.innerHTML = `<td><img src="${el.imagem}" width="50" alt="Imagem não encontrada." /></td>
			<td>${el.identificador}</td>
			<td>${el.titulo}</td><td>${el.descricao}</td><td>${el.professor}</td>
			<td><a href='${el.links}'>${el.links}</a></td>
			<td><button onClick='editarCurso(this)' class='operacao'>Editar</button><button onClick='deletarCurso(this)' class='operacao'>Apagar</button></td>`;
	});
	
	conteudoLista.appendChild(novaLinha);
}

function limparFormulario() {
    document.getElementById("identificador").value = "";
	document.getElementById("descricao").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("links").value = "";
    document.getElementById("professor").value = "";
    document.getElementById("titulo").value = "";
}
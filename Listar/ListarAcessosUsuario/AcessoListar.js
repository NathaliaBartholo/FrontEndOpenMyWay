var json;
var table = document.getElementById("tableData");
var btnVoltar = document.getElementById("btnVoltar");

btnVoltar.addEventListener('click', voltarPgnListar);
json = localStorage.getItem("jsonAcesso");
localStorage.removeItem("jsonAcesso");

json = JSON.parse(json);
document.getElementById("cpf").innerHTML = json.cpf;
document.getElementById("nomeCompleto").innerHTML = json.nome + " " + json.sobrenome;
if (json.acessos.length == 0)
    alert("Lista vazia!");
else {
    construirTabela();
}

function voltarPgnListar() {
    let url = "file:///C:/Users/tatin/Dropbox/Projeto/Front%20end/Listar/Listar.html";

    window.location.href = url;

}


function construirTabela() {
    let i;
    for (i = 0; i < json.acessos.length; i++) {
        let linha = document.createElement('tr');

        let colData = document.createElement('td');
        let colHora = document.createElement('td');
        let colTipoAcesso = document.createElement('td');

        let textData = document.createTextNode(json.acessos[i].data)
        let textHora = document.createTextNode(json.acessos[i].hora);
        let textTipoAcesso = document.createTextNode(json.acessos[i].tipoAcesso);



        colData.appendChild(textData);
        colHora.appendChild(textHora);
        colTipoAcesso.appendChild(textTipoAcesso);

        linha.appendChild(colData);
        linha.appendChild(colHora);
        linha.appendChild(colTipoAcesso);

        table.appendChild(linha);
    }
    document.body.appendChild(table);

}
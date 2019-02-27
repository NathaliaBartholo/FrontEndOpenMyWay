var json;
var table = document.getElementById("tableData");

var btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener("click",voltar)

json = localStorage.getItem("jsonAcesso");
localStorage.removeItem("jsonAcesso");
json = JSON.parse(json);
document.getElementById("cpf").innerHTML = json.cpf;
document.getElementById("nomeCompleto").innerHTML = json.nome + " " + json.sobrenome;

function voltar(){
window.location.href="file:///C:/Users/tatin/Dropbox/Projeto/Front%20end/ConsultarAcessoUsuario/BuscarAcessoUsuario/BuscarAcesso.html"
}

construirTabela();

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
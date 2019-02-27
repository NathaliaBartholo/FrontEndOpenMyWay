var cpfUsuario;
var digVerfCPf;

var rfidUsuario;

var json;

var btnBuscar;
var btnVoltar;

var dropdown = document.getElementById("dropdown");
dropdown.addEventListener("change", mudarEstado);

btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener("click",voltar)

btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", inicializarBusca);

var url = "file:///C:/Users/tatin/Dropbox/Projeto/Front%20end/ConsultarAcessoUsuario/AcessoBuscar.html";

function voltar(){
    alert("voltou");
}

function mudarEstado() {
    valorSelecionado = dropdown.options[dropdown.selectedIndex].value;
    if (valorSelecionado == "cpf") {
        document.getElementById("title").value = "Buscar por CPF";
        document.getElementById("idLabel").hidden = true;
        document.getElementById("IdUsuario").hidden = true;
        document.getElementById("cpfLabel").hidden = false;
        document.getElementById("cpfUsuario").hidden = false;
        document.getElementById("cpfDigitVerif").hidden = false;
    } else {
        document.getElementById("title").value = "Buscar por Código identificador";
        document.getElementById("idLabel").hidden = false;
        document.getElementById("IdUsuario").hidden = false;
        document.getElementById("cpfLabel").hidden = true;
        document.getElementById("cpfUsuario").hidden = true;
        document.getElementById("cpfDigitVerif").hidden = true;

    }
}

function inicializarBusca() {
    valorSelecionado = dropdown.options[dropdown.selectedIndex].value;
    if (valorSelecionado == "cpf") {
        cpfUsuario = document.getElementById("cpfUsuario").value;
        digVerfCPf = document.getElementById("cpfDigitVerif").value;
        if (cpfUsuario.length == 0 || digVerfCPf.length == 0) {
            alert("Campos em branco ou incompleto!");
        }else
            porCPF();
        } else {
            rfidUsuario = document.getElementById("IdUsuario").value;
            if(rfidUsuario.length==0){
                alert("Campo em branco!");
            }else
            porID();
        }
    }

function porCPF() {
    let cpfCompleto = cpfUsuario + digVerfCPf;

    var urlFetch = 'https://openmyway.herokuapp.com/usuario/gerarRelatorioAcessosPorCpf/';
    urlFetch = urlFetch + cpfCompleto;


    fetch(urlFetch, {
        method: 'GET',
    }).then(respostaServer => {
        if (!respostaServer.ok) {
            verificacaoErrosCPF(respostaServer.status);
        } else {
            return respostaServer.json();
        }
    })
        .then(res => {
            if (res) {
                json = JSON.stringify(res);
                mudarPagina();
            }
        }).catch((err) => { verificacaoErrosCPF(err) })
}

function verificacaoErrosCPF(erro) {
    if (erro == "404")
        alert("CPF não encontrado");
    else if (erro == "406")
        alert("CPF com erro de digitação!")

}

function porID() {

    var urlFetch = 'https://openmyway.herokuapp.com/usuario/gerarRelatorioAcessosPorCodigoIdentificacao/';
    urlFetch += rfidUsuario;

    fetch(urlFetch, {
        method: 'GET',
    }).then(respostaServer => {
        if (!respostaServer.ok) {
            verificacaoErrosID(respostaServer.status);
        } else {
            return respostaServer.json();
        }
    })
        .then(res => {
            if (res) {
                json = JSON.stringify(res);
                mudarPagina();
            }
        }).catch((err) => { console.log(err); verificacaoErrosID(err) })


}

function verificacaoErrosID(obj) {
    if (obj == "404")
        alert("Código identificador não encontrado");
    else if (obj == "406")
        alert("Codigo de Identificação digitado errado")


}

function mudarPagina() {
    localStorage.setItem("jsonAcesso", json);
    window.location.href = url;
}


var cpfUsuario;
var digVerfCPf;
var matricula;
var id;

var nomeUsuario;
var sobrenomeUsuario;

var tipoPessoa;

var rfidUsuario;

var jsonRecebido;


jsonRecebido = localStorage.getItem("json");
localStorage.removeItem("json");

jsonRecebido = JSON.parse(jsonRecebido);
document.getElementById("nomeUsuario").value = jsonRecebido.nome;
document.getElementById("sobrenomeUsuario").value = jsonRecebido.sobrenome;


matricula = jsonRecebido.matricula;
id = jsonRecebido.id;

cpfUsuario = jsonRecebido.cpf.substring(0, 9);
digVerfCPf = jsonRecebido.cpf.substring(9, 11);

document.getElementById("rfidUsuario").innerHTML = jsonRecebido.codigoIdentificacao;
document.getElementById("cpfUsuario").value = cpfUsuario;
document.getElementById("cpfDigitVef").value = digVerfCPf;
//inicializar CPF
document.getElementById("tipoUsuario").innerHTML = jsonRecebido.tipoUsuario;

var btnConfirmar = document.getElementById("btnConfirmar");
btnConfirmar.addEventListener("click", mandarDados);

var btnCancelar = document.getElementById("btnCancelar");
btnCancelar.addEventListener("click",voltar)

function voltar(){
    window.location.href = "file:///C:/Users/tatin/Dropbox/Projeto/Front%20end/Editar/BuscarEdi%C3%A7ao/BuscarEditar.html"
}

function mandarDados() {

    let jsonMand;

    var ulrFetch
    if (tipoPessoa == "Usuario") {
        ulrFetch = 'https://openmyway.herokuapp.com/usuario/alterarUsuario';
        jsonMand = montarJsonUsuario();
    } else {
        ulrFetch = 'https://openmyway.herokuapp.com/usuario/alterarIntegranteUniversidade';
        jsonMand = montarJsonIntegrante();
    }



    fetch(ulrFetch, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(jsonMand)

    }).then(data => {
        verificacaoErros(data.status)
    })
        .catch(err => {
            verificacaoErros(err)
        })



}

function montarJsonUsuario() {
    rfidUsuario = document.getElementById("rfidUsuario").textContent;
    nomeUsuario = document.getElementById("nomeUsuario").value;
    sobrenomeUsuario = document.getElementById("sobrenomeUsuario").value;
    cpfUsuario = document.getElementById("cpfUsuario").value;
    digVerfCPf = document.getElementById("cpfDigitVef").value;
    tipoPessoa = document.getElementById("tipoUsuario").textContent;

    cpfCompleto = cpfUsuario + digVerfCPf;

    var jsonObj = {
        "id": id,
        "cpf": cpfCompleto,
        "codigoIdentificacao": rfidUsuario,
        "nome": nomeUsuario,
        "sobrenome": sobrenomeUsuario,

    }

    return jsonObj;
}

function montarJsonIntegrante() {
    rfidUsuario = document.getElementById("rfidUsuario").textContent;
    nomeUsuario = document.getElementById("nomeUsuario").value;
    sobrenomeUsuario = document.getElementById("sobrenomeUsuario").value;
    cpfUsuario = document.getElementById("cpfUsuario").value;
    digVerfCPf = document.getElementById("cpfDigitVef").value;
    tipoPessoa = document.getElementById("tipoUsuario").textContent;

    cpfCompleto = cpfUsuario + digVerfCPf;

    var jsonObj = {
        "codigoIdentificacao": rfidUsuario,
        "cpf": cpfCompleto,
        "nome": nomeUsuario,
        "sobrenome": sobrenomeUsuario,
        "tipoUsuario": tipoPessoa,
        "id": id,
        "matricula": matricula

    }

    return jsonObj;
}

function verificacaoErros(text) {
    if (text == "406") {
        alert("Erro na digitação de algum campo");
    } else {
        alert("Alteração feita com sucesso!");
    }
}
var cpfUsuario;
var digVerfCPf;
var cpfCompleto;

var rfidUsuario;

var select = document.getElementById("dropdown");

select.addEventListener("change", mudarEstado);
var btn;
btn = document.getElementById("btn");
btn.addEventListener("click", inicializar);

var btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener("click",voltar);

function voltar(){
    alert("voltou");
}

function mudarEstado() {
    valorSelecionado = select.options[select.selectedIndex].value;
    if (valorSelecionado == "cpf") {
        document.getElementById("title").value = "Deletar por CPF";
        document.getElementById("idLabel").hidden = true;
        document.getElementById("IdUsuario").hidden = true;
        document.getElementById("cpfLabel").hidden = false;
        document.getElementById("cpfUsuario").hidden = false;
        document.getElementById("cpfDigitVerif").hidden = false;
    } else {
        document.getElementById("title").value = "Deletar por Código identificador";
        document.getElementById("idLabel").hidden = false;
        document.getElementById("IdUsuario").hidden = false;
        document.getElementById("cpfLabel").hidden = true;
        document.getElementById("cpfUsuario").hidden = true;
        document.getElementById("cpfDigitVerif").hidden = true;
    }
}

function inicializar() {
    valorSelecionado = select.options[select.selectedIndex].value;
    if (valorSelecionado == "cpf") {
        cpfUsuario = document.getElementById("cpfUsuario").value;
        digVerfCPf = document.getElementById("cpfDigitVerif").value;
        cpfCompleto = cpfUsuario + digVerfCPf;
        if (cpfCompleto.length != 12) {
            alert("Campos em branco ou incompleto");
        } else {
            porCPF();
        }
    } else {
        rfidUsuario = document.getElementById("IdUsuario").value;
        if (rfidUsuario.length == 0) {
            alert("Campo em branco!");
        } else {
            porID();
        }
    }
}

function porCPF() {
    var ulrFetch = 'https://openmyway.herokuapp.com/usuario/deletarPorCpf/';
    ulrFetch += cpfCompleto;

    fetch(ulrFetch, {
        method: 'DELETE',

    }).then(data => verificacaoErrosCPF(data.status))
        .catch(err => {
            verificacaoErrosCPF(err.status)
        })
}

function verificacaoErrosCPF(obj) {
    if (obj == "200") {
        alert("Usuário deletado com sucesso");
    } else if (obj == "404")
        alert("CPF não encontrado");
    else if (obj == "405")
        document.getElementById("erroCPF").hidden = false;

}

function porID() {
    var ulrFetch = 'https://openmyway.herokuapp.com/usuario/deletarPorCodigoIdentificacao/';
    ulrFetch += rfidUsuario;

    fetch(ulrFetch, {
        method: 'DELETE',

    }).then(data => verificacaoErrosID(data.status))
        .catch(err => {
            verificacaoErrosID(err.status);
        })
}

function verificacaoErrosID(obj) {
    if (obj == "200") {
        alert("Usuário deletado com sucesso");
    } else if (obj == "404")
        alert("Código Identificador não encontrado");
    else if (obj == "405")
        document.getElementById("erroCodId").hidden = false;
}





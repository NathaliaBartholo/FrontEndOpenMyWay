var valorSelecionado;
var select = document.getElementById("dropdown");
select.addEventListener("change", mudarEstado);

var btn = document.getElementById("MandarData");
btn.addEventListener("click", validacaoData);

var btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener("click", voltar);

var i;
var json;
var auxJson;

var table = document.getElementById("tableCPF");;
var url = "https://openmyway.herokuapp.com/usuario/listarUsuarios"
pegarJsonPorCPF();


function voltar() {
    alert("voltou");
}

function mudarEstado() {
    valorSelecionado = select.options[select.selectedIndex].value;
    if (valorSelecionado == "cpf") {
        url = "https://openmyway.herokuapp.com/usuario/listarUsuarios"
        document.getElementById("labelData").hidden = true;
        document.getElementById("dataInput").hidden = true;
        document.getElementById("tableData").hidden = true;
        document.getElementById("MandarData").hidden = true;
        document.getElementById("tableCPF").hidden = false;

        table = document.getElementById("tableCPF");

    } else if (valorSelecionado == "data") {
        url = "https://openmyway.herokuapp.com/acesso/gerarRelatorioAcessosPorData/"
        document.getElementById("labelData").hidden = false;
        document.getElementById("dataInput").hidden = false;
        table = document.getElementById("tableData");
        document.getElementById("tableData").hidden = false;
        document.getElementById("tableCPF").hidden = true;
        document.getElementById("MandarData").hidden = false;
        document.getElementById("labelData").hidden = false;
        document.getElementById("dataInput").hidden = false;
    }
}

function pegarJsonPorCPF() {
    fetch(url, {
        method: 'GET',
    }).then(respostaServer => {
        if (!respostaServer.ok) {
            verificacaoErros(respostaServer.status);
        } else {
            return respostaServer.json();
        }
    })
        .then(res => {
            if (res) {
                let aux = JSON.stringify(res);
                json = JSON.parse(aux);
                initCPF();
            }
        }).catch((err) => { verificacaoErros(err.status) })

}

function validacaoData() {
    let input = document.getElementById("dataInput").value;
    if (input == "") {
        alert("Escolha uma data");
    } else {
        let dataHoje = new Date();
        let data = new Date(input);
        let diff = dataHoje.getTime() - data.getTime();
        let diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        if (data == undefined) {
            alert("Data invalida");
        } else if (diffDays > 30) {
            alert("Data muito antiga");
        } else if (diff < 0) {
            alert("Data ainda esta para acontecer")
        } else {
            pegarJsonPorData(input);
        }
    }
}
function pegarJsonPorData(data) {


    data = ajeitarData(data);


    url = url + data;
    fetch(url, {
        method: 'GET',
    }).then(respostaServer => {
        if (!respostaServer.ok) {
            verificacaoErros(respostaServer.status);
        } else {
            return respostaServer.json();
        }
    })
        .then(res => {
            if (res) {
                let aux = JSON.stringify(res);
                json = JSON.parse(aux);
                initData();
            }
        }).catch((err) => { verificacaoErros(err.status) })

}

function ajeitarData(data) {
    let aux = data.split("-")
    let dataArrumada = aux[2] + "-" + aux[1] + "-" + aux[0].substring(2, 4);
    return dataArrumada;
}

function verificacaoErros(err) {
    if (err == "404") {
        alert("Lista vazia");
    }
}

function initCPF() {

    for (i = 0; i < json.length; i++) {
        let linha = document.createElement('tr');

        let colCPF = document.createElement('td');
        let colNomeComp = document.createElement('td');
        let colAcessos = document.createElement('td');
        let btnAcessos = document.createElement('input');

        btnAcessos.setAttribute('type', 'button');
        btnAcessos.setAttribute('value', 'Acessos')
        btnAcessos.setAttribute('onclick', '');
        btnAcessos.indexValue = i

        btnAcessos.addEventListener("click", redirecionar);

        let textCPF = document.createTextNode(json[i].cpf)
        let textNomeComp = document.createTextNode(json[i].nome + " " + json[i].sobrenome)

        colCPF.appendChild(textCPF);
        colNomeComp.appendChild(textNomeComp);
        colAcessos.appendChild(btnAcessos);

        linha.appendChild(colCPF);
        linha.appendChild(colNomeComp);
        linha.appendChild(colAcessos);

        table.appendChild(linha);
    }
    document.body.appendChild(table);

}

function redirecionar() {
    auxJson = json[this.indexValue];
    auxJson = JSON.stringify(auxJson);
    localStorage.setItem("jsonAcesso", auxJson);
    window.location.href = "file:///C:/Users/tatin/Dropbox/Projeto/Front%20end/Listar/ListarAcessosUsuario/AcessoListar.html";
}

function initData() {
    let i;
    for (i = 0; i < json.length; i++) {
        let linha = document.createElement('tr');

        let colCPF = document.createElement('td');
        let colNomeComp = document.createElement('td');
        let colTipoAcesso = document.createElement('td');
        let colHora = document.createElement('td');

        let textCPF = document.createTextNode(json[i].usuario.cpf)
        let textNomeComp = document.createTextNode(json[i].usuario.nome + " " + json[i].usuario.sobrenome)
        let textTipoAcesso = document.createTextNode(json[i].tipoAcesso);
        let textHora = document.createTextNode(json[i].hora);


        console.log(json[i].usuario.cpf)
        colCPF.appendChild(textCPF);
        colNomeComp.appendChild(textNomeComp);
        colTipoAcesso.appendChild(textTipoAcesso);
        colHora.appendChild(textHora);

        linha.appendChild(colCPF);
        linha.appendChild(colNomeComp);
        linha.appendChild(colTipoAcesso);
        linha.appendChild(colHora);

        table.appendChild(linha);
    }
    document.body.appendChild(table);

}

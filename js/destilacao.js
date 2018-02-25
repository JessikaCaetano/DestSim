// Bibliotecas
$(".button-collapse").sideNav();
$(document).ready(function() {
  $('select').material_select();
});


//Inserindo dados na caixa de rolagem do componentes 1 e 2
select_componentes = document.getElementById("select_componentes")
var opt = document.createElement("option")
opt.value = 0;
opt.text = 'Escolha uma opção';
opt.selected = 'selected'
opt.disabled = 'disabled'
select_componentes.add(opt, select_componentes.options[0])
for (i = 0; i < data.componentes.length; i++) {
  var opt = document.createElement("option")
  opt.value = i
  opt.text = data.componentes[i]
  select_componentes.add(opt, select_componentes.options[i + 1])
}

select_componentes2 = document.getElementById("select_componentes2")
var opt2 = document.createElement("option")
opt2.value = 0;
opt2.text = 'Escolha uma opção';
opt2.selected = 'selected'
opt2.disabled = 'disabled'
select_componentes2.add(opt2, select_componentes2.options[0])
for (i = 0; i < data.componentes.length; i++) {
  var opt = document.createElement("option")
  opt.value = i
  opt.text = data.componentes[i]
  select_componentes2.add(opt, select_componentes2.options[i + 1])
}

select_atividade = document.getElementById("select_atividade")
var opt3 = document.createElement("option")
opt3.value = 0;
opt3.text = 'Escolha uma opção';
opt3.selected = 'selected'
opt3.disabled = 'disabled'
select_atividade.add(opt3, select_atividade.options[0])
for (i = 0; i < data.metodos_atividade.length; i++) {
  var opt = document.createElement("option")
  opt.value = i
  opt.text = data.metodos_atividade[i]
  select_atividade.add(opt, select_atividade.options[i + 1])
}

// Iniciando a programação dos cálculos com a declaração das variáveis
var pressao = 101.325
var temperaturas = Array()
var P1sat = Array()
var P2sat = Array()
var xvolatil = Array()
var yvolatil = Array()
var alfa = Array()
var A1, A2, B1, B2, C1, C2
var tipo_mistura, metodo_atividade, componente1, componente2
var aux2 = Array()

//link dos comandos de cálculo com o botão
function botao_calcular() {

  //inserção dos valores das variáveis a partir dos elementos de input
  componente1 = data.componentes[document.getElementById("select_componentes").value]
  componente2 = data.componentes[document.getElementById("select_componentes2").value]
  metodo_atividade = data.metodos_atividade[document.getElementById("select_atividade").value]

  aux2 = document.getElementsByName("grupo1")
  for (var i = 0; i < aux2.length; i++) {
    if (aux2[i].checked == true) {
      tipo_mistura = aux2[i].value
    }
  }

  // mistura = componente1 + " e " + componente2

  //chamando a função de cálculo da curva de ELV
  if (tipo_mistura == "Mistura Ideal") {
    curvaeq_ideal()
  }

  if (tipo_mistura == "Mistura Não Ideal") {
    curvaeq_naoideal()
  }

  gerar_grafico()
}

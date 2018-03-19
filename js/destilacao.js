// Bibliotecas
$(".button-collapse").sideNav();
$(document).ready(function() {
  $('select').material_select();
});

//Desmarcação dos radio buttons quando atualizar a página
$("#tipo_mistura1").attr("checked", false)
$("#tipo_mistura2").attr("checked", false)
$("#metodo1").attr("checked", false)
$("#metodo2").attr("checked", false)

//Inserção dos dados na caixa de rolagem do componentes 1 e 2
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

//Inserção dos dados na caixa de rolagem dos métodos de atividade
select_atividade = document.getElementById("select_atividade");
var opt3 = document.createElement("option");
opt3.value = 0;
opt3.text = 'Escolha uma opção';
opt3.selected = 'selected';
opt3.disabled = 'disabled';
select_atividade.add(opt3, select_atividade.options[0]);
for (i = 0; i < data.metodos_atividade.length; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.text = data.metodos_atividade[i];
  select_atividade.add(opt, select_atividade.options[i + 1]);
}

// Início da programação dos cálculos com a declaração das variáveis
var pressao = 101.325
var temperaturas = Array()
var P1sat = Array()
var P2sat = Array()
var xvolatil = Array()
var yvolatil = Array()
var alfa_ideal = Array()
var A1, A2, B1, B2, C1, C2, T1, Psat_comp1, Psat_comp2, atividade1, atividade2, x1, x2
var tipo_mistura, metodo_atividade, metodo_grafico, metodo_entalpia, componente1, componente2
var comp_alimentacao, comp_topo, comp_fundo
var aux2 = Array()
var aux3 = Array()
var metodos_atividade = Array()

//link dos comandos de cálculo com o botão
function botao_calcular() {

  //Alerta caso o usuário insira dois componentes idêncticos
  if (componente1 == componente2) {

    alert("Por favor, escolha dois componentes distintos.")

  } else {

    //Inserção dos nomes dos componentes a partir das caixas de rolagem
    componente1 = data.componentes[document.getElementById("select_componentes").value]
    componente2 = data.componentes[document.getElementById("select_componentes2").value]

    //Inserção do tipo de mistura a partir da Check-Box
    aux2 = document.getElementsByName("grupo1")
    for (var i = 0; i < aux2.length; i++) {

      if (aux2[i].checked == true) {
        tipo_mistura = aux2[i].value
      }

    }

    //Inserção do método de atividade a partir da caixa de rolagem
    metodo_atividade = metodos_atividade[document.getElementById("novo_select").value]

    //Chamada da função de cálculo da curva de ELV de acordo com o tipo de mistura
    if (tipo_mistura == "Mistura Ideal") {

      curvaeq_ideal()
      gerar_grafico()

    } else if (tipo_mistura == "Mistura Não Ideal") {

      curvaeq_naoideal()
      gerar_grafico()

    } else {

      alert("Por favor, defina o tipo da mistura escolhida.")

    }
  }
}

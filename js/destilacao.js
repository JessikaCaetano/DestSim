// Bibliotecas
$(".button-collapse").sideNav();
$(document).ready(function() {
  $('select').material_select();
});

//Desmarcação dos radio buttons quando atualizar a página
$("#tipo_mistura1").attr("checked", false);
$("#tipo_mistura2").attr("checked", false);
$("#metodo1").attr("checked", false);
$("#metodo2").attr("checked", false);

//Inserção dos dados na caixa de rolagem do componentes 1 e 2
select_componentes = document.getElementById("select_componentes");
var opt = document.createElement("option");
opt.value = 0;
opt.text = 'Escolha uma opção';
opt.selected = 'selected';
opt.disabled = 'disabled';
select_componentes.add(opt, select_componentes.options[0]);
for (i = 0; i < data.componentes.length; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.text = data.componentes[i];
  select_componentes.add(opt, select_componentes.options[i + 1]);
}

select_componentes2 = document.getElementById("select_componentes2");
var opt2 = document.createElement("option");
opt2.value = 0;
opt2.text = 'Escolha uma opção';
opt2.selected = 'selected';
opt2.disabled = 'disabled';
select_componentes2.add(opt2, select_componentes2.options[0]);
for (i = 0; i < data.componentes.length; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.text = data.componentes[i];
  select_componentes2.add(opt, select_componentes2.options[i + 1]);
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

//Inserção dos dados na caixa de rolagem dos métodos de atividade
select_entalpia = document.getElementById("select_entalpia");
var opt4 = document.createElement("option");
opt4.value = 0;
opt4.text = 'Escolha uma opção';
opt4.selected = 'selected';
opt4.disabled = 'disabled';
select_entalpia.add(opt4, select_entalpia.options[0]);
for (i = 0; i < data.metodos_entalpia.length; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.text = data.metodos_entalpia[i];
  select_entalpia.add(opt, select_entalpia.options[i + 1]);
}

// Início da programação dos cálculos com a declaração das variáveis
var pressao = 101.325;
var temperaturas = Array(),
  xvolatil = Array(),
  yvolatil = Array(),
  yvolatil_2 = Array(),
  alfa_ideal = Array();
var aux2 = Array(),
  aux3 = Array();
var metodos_atividade = Array();
var ek1 = Array(),
  ek2 = Array(),
  id1 = Array(),
  p_interacao = Array();
var x_degrau = Array(),
  y_degrau = Array();
var A1, A2, B1, B2, C1, C2, T1sat, T2sat, T1, P1sat, P2sat, atividade1, atividade2, x1, x2, qk1_total, qk2_total, rk1_total, rk2_total;
var tipo_mistura, metodo_atividade, metodo_grafico, metodo_entalpia, componente1, componente2;
var xF, xD, xB, Rd_min, Rd, yF, x_aux, y_aux;
var c1_added = false,
  c2_added = false,
  metodo_added = false,
  metodo_entalpia_added = false;


//link dos comandos de cálculo com o botão
function botao_calcular() {

  if (c1_added == true && c2_added == true) {

    //Alerta caso o usuário insira dois componentes idêncticos
    if (componente1 == componente2) {

      alert("Por favor, escolha dois componentes distintos.");

    } else {

      tipo_composicao = document.getElementById("switch").checked;
      xF = document.getElementById("input_alimentacao").value;
      xD = document.getElementById("input_topo").value;
      xB = document.getElementById("input_fundo").value;

      if (xF && xB && xD && xF > xB && xD > xF) {

        // Conversão dos valores de composição caso necessário caso necessário
        if (tipo_composicao == true) {

          mass_to_mol(parseFloat(xF));
          xF = x_molar;
          mass_to_mol(parseFloat(xD));
          xD = x_molar;
          mass_to_mol(parseFloat(xB));
          xB = x_molar;

        }

        //Inserção do tipo de mistura a partir da Check-Box
        aux2 = document.getElementsByName("grupo2")
        for (var i = 0; i < aux2.length; i++) {

          if (aux2[i].checked == true) {
            metodo_grafico = aux2[i].value;
          }

        }
        aux2 = []

        if (metodo_grafico == "McCabe-Thiele") {

          //Inserção do tipo de mistura a partir da Check-Box
          aux2 = document.getElementsByName("grupo1")
          for (var i = 0; i < aux2.length; i++) {

            if (aux2[i].checked == true) {
              tipo_mistura = aux2[i].value;
            }

          }
          aux2 = []

          //Inserção do método de atividade a partir da caixa de rolagem

          document.getElementById('range_element').value = 10;

          //Chamada da função de cálculo da curva de ELV e McCabe-Thiele de acordo com o tipo de mistura
          if (tipo_mistura == "Mistura Ideal") {

            curvaeq_ideal();
            McCabe_Ideal();
            gerar_grafico(700);

          } else if (tipo_mistura == "Mistura Não Ideal") {

            if (metodo_added == true) {
              curvaeq_naoideal();

              if (xD < xmax && xF < xmax) {
                McCabe_NIdeal();
              } else {
                alert("Esta mistura não pode ser destilada até concentrações maiores que " + xmax.toFixed(2) + " devido à formação de azeótropo.")
              }

              gerar_grafico(700);
            } else {

              alert("Por favor, defina o método de cálculo dos coeficientes de atividade.")

            }

          } else {

            alert("Por favor, defina o tipo da mistura escolhida.");

          }
        } else if (metodo_grafico == "Ponchon-Savarit") {

          alert("Em construção")

          //Inserção do tipo de mistura a partir da Check-Box
          aux2 = document.getElementsByName("grupo1")
          for (var i = 0; i < aux2.length; i++) {

            if (aux2[i].checked == true) {
              tipo_mistura = aux2[i].value;
            }

          }
          aux2 = []

          //Inserção do método de atividade a partir da caixa de rolagem

          document.getElementById('range_element').value = 10;

          //Chamada da função de cálculo da curva de ELV de acordo com o tipo de mistura
          if (tipo_mistura == "Mistura Ideal") {


          } else if (tipo_mistura == "Mistura Não Ideal") {

            if (metodo_added == true && metodo_entalpia_added == true) {



            } else {

              alert("Por favor, defina o método de cálculo dos coeficientes de atividade e da entalpia residual.")

            }

          } else {

            alert("Por favor, defina o tipo da mistura escolhida.");

          }

        } else {

          alert("Por favor, defina o método gráfico desejado.")

        }
      } else {

        alert("Por favor, defina valores coerentes para as composições de alimentação, topo e fundo.")

      }
    }
  } else {

    alert("Por favor, defina todos os componentes da mistura.");

  }

}

function exemplo_ideal() {

  // Não consigo colocar no select
  componente1 = "Benzeno";
  componente2 = "Tolueno";

  for (var i = 0; i < data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {
      M1 = data.massa_molar[i];
    } else if (data.componentes[i] == componente2) {
      M2 = data.massa_molar[i];
    }

  }

  tipo_composicao = true;
  xF = 0.44;
  xD = 0.974;
  xB = 0.0235;
  document.getElementById("input_alimentacao").value = xF.toFixed(2);
  document.getElementById("input_topo").value = xD.toFixed(2);
  document.getElementById("input_fundo").value = xB.toFixed(2);

  // Conversão dos valores de composição
  mass_to_mol(parseFloat(xF));
  xF = x_molar;
  mass_to_mol(parseFloat(xD));
  xD = x_molar;
  mass_to_mol(parseFloat(xB));
  xB = x_molar;

  // não fica on
  metodo_grafico = "McCabe-Thiele";
  tipo_mistura = "Mistura Ideal";
  $("#tipo_mistura1").attr("checked", true);
  $("#metodo1").attr("checked", true);
  $("#switch").attr("checked", true);
  document.getElementById("div_select").classList.add("disabledDiv");
  document.getElementById("div_select2").classList.add("disabledDiv");
  document.getElementById('range_element').value = 10;

  curvaeq_ideal();
  McCabe_Ideal();
  gerar_grafico(700);

}

function exemplo_nideal() {

  componente1 = "Etanol";
  componente2 = "Água";

  for (var i = 0; i < data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {
      M1 = data.massa_molar[i];
    } else if (data.componentes[i] == componente2) {
      M2 = data.massa_molar[i];
    }

  }

  xF = 0.3;
  document.getElementById("input_alimentacao").value = xF.toFixed(2);
  xD = 0.8;
  document.getElementById("input_topo").value = xD.toFixed(2);
  xB = 0.02;
  document.getElementById("input_fundo").value = xB.toFixed(2);

  metodo_grafico = "McCabe-Thiele";
  tipo_mistura = "Mistura Não Ideal";
  metodo_atividade = "UNIFAC";
  $("#tipo_mistura2").attr("checked", true);
  $("#metodo1").attr("checked", true);
  $("#metodo1").attr("switch", false);
  document.getElementById("div_select2").classList.add("disabledDiv");
  document.getElementById('range_element').value = 10;

  curvaeq_naoideal();
  McCabe_NIdeal();
  gerar_grafico(700);

}

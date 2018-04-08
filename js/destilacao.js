// Bibliotecas
$(".button-collapse").sideNav();
$(document).ready(function() {
  $('select').material_select();
});

//Desmarcação dos radio buttons e switches quando atualizar a página
limpar_checkboxes();
var label_info_on = false;
var label_info_on2 = false;

//Inserção dos dados na caixa de rolagem do componentes 1 e 2 e dos metodos de entalpia e atividade
criar_select("select_componentes", data.componentes, "Escolha uma opção");
criar_select("select_componentes2", data.componentes, "Escolha uma opção");
criar_select("select_atividade", data.metodos_atividade, "Escolha uma opção");

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
  y_degrau = Array(),
  x_estagio = Array(),
  y_estagio = Array();
var A1, A2, B1, B2, C1, C2, T1sat, T2sat, T1, P1sat, P2sat, atividade1, atividade2, x1, x2, qk1_total, qk2_total, rk1_total, rk2_total;
var tipo_mistura, metodo_atividade, metodo_entalpia, componente1, componente2, estagio_alimentacao, atividade1, atividade2;
var xF, xD, xB, Rd_min, Rd, yF, x_aux, y_aux, indice_comp, compvolatil;
var c_added_1 = false,
  c_added_2 = false,
  metodo_added = false,
  metodo_entalpia_added = false;


//Comandos de cálculo do botão Calcular
function botao_calcular() {

  // Limpeza de variáveis
  componente1 = null;
  componente2 = null;
  metodo_atividade = null;
  metodo_entalpia = null;

  //Conferindo se os componentes foram adicionados
  componente1 = data.componentes[document.getElementById("select_componentes").value - 1];
  componente2 = data.componentes[document.getElementById("select_componentes2").value - 1];

  if (componente1 && componente2) {
    c_added_1 = true;
    c_added_2 = true;
  }

  if (c_added_1 == true && c_added_2 == true) {

    //Alerta caso o usuário insira dois componentes idêncticos
    if (componente1 == componente2) {

      alert("Por favor, escolha dois componentes distintos.");

    } else {

      // Adição dos valores de composições
      valor_composicoes();

      if (xF && xB && xD && xF > xB && xD > xF && xD <= 1 && xB >= 0) {

        // Conversão dos valores de composição caso necessário caso necessário
        if (tipo_composicao == true) {

          // Adição das massas molares dos componentes
          massa_molar(componente1, componente2);

          mass_to_mol(parseFloat(xF));
          xF = x_molar;
          mass_to_mol(parseFloat(xD));
          xD = x_molar;
          mass_to_mol(parseFloat(xB));
          xB = x_molar;

        }

          //Inserção do tipo de mistura a partir da Check-Box
          tipo_mistura = valor_radio("grupo1");

          document.getElementById("range_element").value = 10;

          //Chamada da função de cálculo da curva de ELV e McCabe-Thiele de acordo com o tipo de mistura
          if (tipo_mistura == "Mistura Ideal") {

            document.getElementById("div_select").classList.add("disabledDiv");
            curvaeq_ideal();
            McCabe_Ideal();
            gerar_grafico(900);

          } else if (tipo_mistura == "Mistura Não Ideal") {

            // Verificação da inserção do método de atividade
            add_metodo();

            if (metodo_added == true) {

              curvaeq_naoideal();

              if (xD < xmax && xF < xmax) {

                McCabe_NIdeal();
                gerar_grafico(900);

              } else {

                alert("Esta mistura não pode ser destilada até concentrações maiores que " + xmax.toFixed(2) + " devido à formação de azeótropo.")

              }


            } else {

              alert("Por favor, defina o método de cálculo dos coeficientes de atividade.")

            }

          } else {

            alert("Por favor, defina o tipo da mistura escolhida.");

          }

      } else {

        alert("Por favor, defina valores coerentes para as composições de alimentação, topo e fundo.")

      }
    }
  } else {

    alert("Por favor, defina todos os componentes da mistura.");

  }

}

//Comandos de cálculo do botão Exemplo Ideal
function exemplo_ideal() {

  // Limpeza das checkboxes
  limpar_checkboxes()

  // Definição dos componentes do exemplo
  componente1 = "Benzeno";
  componente2 = "Tolueno";
  mudar_select("div_componentes", componente1, "select_componentes", data.componentes, "add_comp_1()");
  mudar_select("div_componentes2", componente2, "select_componentes2", data.componentes, "add_comp_2()");
  $("#div_componentes").append('<label>Componente 1:</label> ');
  $("#div_componentes2").append('<label>Componente 2:</label>');
  document.getElementById("label_composicao").innerHTML = "Composição (Benzeno):";
    document.getElementById("label_info4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Benzeno):";

  // Liberação dos campos de adição de composições
  document.getElementById("div_composicoes").className = "row";

  // Adição das massas molar dos componentes
  massa_molar(componente1, componente2);

  // Definição dos valores de composição do exemplo
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

  // Definição do método gráfico e tipo de mistura do exemplo
  tipo_mistura = "Mistura Ideal";

  // Marcação dos radio buttons e selects de acordo com especificações do exemplo
  $("#tipo_mistura1").prop("checked", true);
  $("#switch").prop("checked", true);
  document.getElementById("div_select").classList.add("disabledDiv");
  document.getElementById('range_element').value = 10;

  // Funções de cálculo do McCabe-Thiele
  curvaeq_ideal();
  McCabe_Ideal();
  gerar_grafico(700);

}

//Comandos de cálculo do botão Exemplo Não Ideal
function exemplo_nideal() {

  // Limpeza das checkboxes
  limpar_checkboxes()

  // Definição dos componentes do exemplo
  componente1 = "Etanol";
  componente2 = "Água";
  mudar_select("div_componentes", componente1, "select_componentes", data.componentes, "add_comp_1()");
  mudar_select("div_componentes2", componente2, "select_componentes2", data.componentes, "add_comp_2()");
  $("#div_componentes").append('<label>Componente 1:</label> ');
  $("#div_componentes2").append('<label>Componente 2:</label>');
  document.getElementById("label_composicao").innerHTML = "Composição (Etanol):";
  document.getElementById("label_info4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Etanol):";

  // Liberação dos campos de adição de composições
  document.getElementById("div_composicoes").className = "row";

  // Adição das massas molar dos componentes
  massa_molar(componente1, componente2);

  // Definição dos valores de composição do exemplo
  xF = 0.3;
  document.getElementById("input_alimentacao").value = xF.toFixed(2);
  xD = 0.8;
  document.getElementById("input_topo").value = xD.toFixed(2);
  xB = 0.02;
  document.getElementById("input_fundo").value = xB.toFixed(2);

  // Definição do método gráfico, tipo de mistura e método de atividade do exemplo
  tipo_mistura = "Mistura Não Ideal";
  metodo_atividade = "UNIFAC";

  // Marcação dos radio buttons e selects de acordo com especificações do exemplo
  $("#tipo_mistura2").prop("checked", true);
  document.getElementById("div_select").className = "input-field col m12 s12";
  document.getElementById('range_element').value = 10;

  // Funções de cálculo do McCabe-Thiele
  add_atividade("UNIFAC");
  curvaeq_naoideal();
  McCabe_NIdeal();
  gerar_grafico(700);

}

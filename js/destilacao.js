// Bibliotecas
$(document).ready(function() {
  $(".button-collapse").sideNav();
  $('select').material_select();
});

//Desmarcação dos radio buttons e switches quando atualizar a página
limpar_checkboxes();
var info_on_1 = false;
var info_on_2 = false;

//Inserção dos dados na caixa de rolagem do componentes 1 e 2 e dos metodos de entalpia e atividade
criar_select("select_componentes_1", data.componentes, "Escolha uma opção");
criar_select("select_componentes_2", data.componentes, "Escolha uma opção");
criar_select("select_atividade", data.metodos_atividade, "Escolha uma opção");
criar_select("select_entalpia", data.metodos_entalpia, "Escolha uma opção");

// Início da programação dos cálculos com a declaração das variáveis
var pressao = 101.325;
var temperaturas = [],
  xvolatil = [],
  yvolatil = [],
  x_equilibrio = [],
  y_equilibrio = [],
  alfa_ideal = [],
  H_excesso = [],
  H_residual = [];
var metodos_atividade = [];
var ek1 = [],
  ek2 = [],
  id1 = [],
  p_interacao = [];
var x_degrau = [],
  y_degrau = [],
  x_degrau_r = [],
  y_degrau_r = [],
  x_degrau_e = [],
  y_degrau_e = [],
  x_estagio = [],
  y_estagio = [],
  reta_amarracao;
var entalpia_liquido = [],
  entalpia_vapor = [];
var A1, A2, B1, B2, C1, C2, T1sat, T2sat, T1, T3, P1sat, P2sat, atividade_1, atividade_2, x1, x2, qk1_total, qk2_total, rk1_total, rk2_total, entalpia_excesso;
var tipo_mistura, metodo_atividade, metodo_grafico, metodo_entalpia, componente1, componente2, estagio_alimentacao, y_qc_min, y_qr_min, Rd_min, num_minimo_pratos;
var xF, xD, xB, Rd_min, Rd, yF, yB, hB, hF, hD, qcD, qcB, x_aux, y_aux, indice_comp, compvolatil, delta_vaporizacao_1, delta_vaporizacao_2;
var sigma, epsilon, psi, omega, alfa_Tr, der_Tr;
var T1_aux = [];
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
  componente1 = data.componentes[document.getElementById("select_componentes_1").value - 1];
  componente2 = data.componentes[document.getElementById("select_componentes_2").value - 1];

  if (componente1 && componente2) {
    c_added_1 = true;
    c_added_2 = true;
  }

  if (c_added_1 == true && c_added_2 == true) {

    //Alerta caso o usuário insira dois componentes idêncticos
    if (componente1 == componente2) {

      Materialize.toast("Por favor, escolha dois componentes distintos.", 2500, "red darken-4 justify-center");

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

        //Inserção do método gráfico a partir da Check-Box
        metodo_grafico = valor_radio("grupo_2");

        Rd = null;
        Rd = parseFloat(document.getElementById("range_element").value);

        if (metodo_grafico == "McCabe-Thiele") {

          //Inserção do tipo de mistura a partir da Check-Box
          tipo_mistura = valor_radio("grupo_1");

          document.getElementById("div_select_2").classList.add("disabledDiv");

          //Chamada da função de cálculo da curva de ELV e McCabe-Thiele de acordo com o tipo de mistura
          if (tipo_mistura == "Mistura Ideal") {

            document.getElementById("div_select").classList.add("disabledDiv");
            curva_eq_ideal();
            McCabe_Ideal();
            // Resultados do número de pratos, prato de alimentação e composição de cada estágio
            separar_resultados();
            composicao_estagios();
            gerar_grafico_McCabe(900);
            alterar_label();

          } else if (tipo_mistura == "Mistura Não Ideal") {

            // Verificação da inserção do método de atividade
            add_metodo();

            if (metodo_added == true) {

              curva_eq_nao_ideal();

              if (xD < xmax && xF < xmax) {

                McCabe_nao_ideal();
                // Resultados do número de pratos, prato de alimentação e composição de cada estágio
                separar_resultados();
                composicao_estagios();
                gerar_grafico_McCabe(900);
                alterar_label();

              } else {

                Materialize.toast("Esta mistura não pode ser destilada até concentrações maiores que " + xmax.toFixed(2) + " devido à formação de azeótropo.", 3000, "red darken-4 justify-center");

              }

            } else {

              Materialize.toast("Por favor, defina o método de cálculo dos coeficientes de atividade.", 2500, "red darken-4 justify-center");

            }

          } else {

            Materialize.toast("Por favor, defina o tipo da mistura escolhida.", 2500, "red darken-4 justify-center");

          }

        } else if (metodo_grafico == "Ponchon-Savarit") {

          //Inserção do tipo de mistura a partir da Check-Box
          tipo_mistura = valor_radio("grupo_1");

          //Chamada da função de cálculo da curva de ELV de acordo com o tipo de mistura
          if (tipo_mistura == "Mistura Ideal") {

            document.getElementById("div_select").classList.add("disabledDiv");
            document.getElementById("div_select_2").classList.add("disabledDiv");
            curva_eq_ideal();
            curva_entalpia_ideal();
            Ponchon_Savarit();
            // Resultados do número de pratos, prato de alimentação e composição de cada estágio
            separar_resultados();
            composicao_estagios();
            gerar_grafico_Ponchon(900);
            alterar_label();

          } else if (tipo_mistura == "Mistura Não Ideal") {

            // Verificaçãoda inserção do método de cálculo de atividade
            add_metodo();

            // Verificaçãoda inserção do método de cálculo de entalpia
            add_metodo_entalpia();

            if (metodo_added == true && metodo_added_entalpia == true) {

              curva_eq_nao_ideal();
              curva_entalpia_nao_ideal();

              if (xD < xmax && xF < xmax) {

                Ponchon_Savarit();
                // Resultados do número de pratos, prato de alimentação e composição de cada estágio
                separar_resultados();
                composicao_estagios();
                gerar_grafico_Ponchon(900);
                alterar_label();

              } else {

                Materialize.toast("Esta mistura não pode ser destilada até concentrações maiores que " + xmax.toFixed(2) + " devido à formação de azeótropo.", 3000, "red darken-4 justify-center");

              }

            } else {

              Materialize.toast("Por favor, defina o método de cálculo dos coeficientes de atividade e da entalpia residual.", 2500, "red darken-4 justify-center");

            }

          } else {

            Materialize.toast("Por favor, defina o tipo da mistura escolhida.", 2500, "red darken-4 justify-center");

          }

        } else {

          Materialize.toast("Por favor, defina o método gráfico escolhido.", 2500, "red darken-4 justify-center");

        }

      } else {

        Materialize.toast("Por favor, defina valores coerentes para as composições de alimentação, topo e fundo.", 3000, "red darken-4 justify-center");

      }

    }

  } else {

    Materialize.toast("Por favor, defina todos os componentes da mistura.", 2500, "red darken-4 justify-center");

  }

}

//Comandos de cálculo do botão Exemplo Ideal
function exemplo_mc_ideal() {

  // Limpeza das checkboxes
  limpar_checkboxes()

  // Definição dos componentes do exemplo
  componente1 = "Benzeno";
  componente2 = "Tolueno";

  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");

  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 2:</label>");
  document.getElementById("label_composicao").innerHTML = "Composição (Benzeno):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Benzeno):";

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
  metodo_grafico = "McCabe-Thiele";
  tipo_mistura = "Mistura Ideal";

  // Marcação dos radio buttons e selects de acordo com especificações do exemplo
  $("#tipo_mistura1").prop("checked", true);
  $("#metodo_1").prop("checked", true);
  $("#switch").prop("checked", true);
  document.getElementById("div_select").classList.add("disabledDiv");
  document.getElementById("div_select_2").classList.add("disabledDiv");
  document.getElementById("range_element").value = 3.5;

  Rd = null;
  Rd = 3.5;

  // Funções de cálculo do McCabe-Thiele e demonstração dos resultados
  add_atividade("Escolha uma opção");
  curva_eq_ideal();
  McCabe_Ideal();
  // Resultados do número de pratos, prato de alimentação e composição de cada estágio
  separar_resultados();
  composicao_estagios();
  gerar_grafico_McCabe(700);
  alterar_label();

}

//Comandos de cálculo do botão Exemplo Não Ideal
function exemplo_mc_nao_ideal() {

  // Limpeza das checkboxes
  limpar_checkboxes()

  // Definição dos componentes do exemplo
  componente1 = "Etanol";
  componente2 = "Água";
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 1:</label>");
  document.getElementById("label_composicao").innerHTML = "Composição (Etanol):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Etanol):";

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
  metodo_grafico = "McCabe-Thiele";
  tipo_mistura = "Mistura Não Ideal";
  metodo_atividade = "UNIFAC";

  // Marcação dos radio buttons e selects de acordo com especificações do exemplo
  $("#tipo_mistura2").prop("checked", true);
  $("#metodo_1").prop("checked", true);
  $("#metodo_1").prop("switch", false);
  document.getElementById("div_select").className = "input-field col m6 s12";
  document.getElementById("div_select_2").classList.add("disabledDiv");
  document.getElementById("range_element").value = 4;

  Rd = null;
  Rd = 4;

  // Funções de cálculo do McCabe-Thiele e demonstração dos resultados
  add_atividade("UNIFAC");
  curva_eq_nao_ideal();
  McCabe_nao_ideal();
  // Resultados do número de pratos, prato de alimentação e composição de cada estágio
  separar_resultados();
  composicao_estagios();
  gerar_grafico_McCabe(700);
  alterar_label();

}

function exemplo_ps_ideal() {

  // Limpeza das checkboxes
  limpar_checkboxes()

  // Definição dos componentes do exemplo
  componente1 = "Benzeno";
  componente2 = "Tolueno";
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 2:</label>");
  document.getElementById("label_composicao").innerHTML = "Composição (Benzeno):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Benzeno):";

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
  metodo_grafico = "Ponchon-Savarit";
  tipo_mistura = "Mistura Ideal";

  // Marcação dos radio buttons e selects de acordo com especificações do exemplo
  $("#tipo_mistura1").prop("checked", true);
  $("#metodo_2").prop("checked", true);
  $("#switch").prop("checked", true);
  document.getElementById("div_select").classList.add("disabledDiv");
  document.getElementById("div_select_2").classList.add("disabledDiv");
  document.getElementById("range_element").value = 3.5;

  Rd = null;
  Rd = 3.5;

  // Funções de cálculo do Ponchon-Savarit e demonstração dos resultados
  add_atividade("Escolha uma opção");
  curva_eq_ideal();
  curva_entalpia_ideal();
  Ponchon_Savarit();
  // Resultados do número de pratos, prato de alimentação e composição de cada estágio
  separar_resultados();
  composicao_estagios();
  gerar_grafico_Ponchon(900);
  alterar_label();

}

function exemplo_ps_nao_ideal() {

  limpar_checkboxes()

  // Definição dos componentes do exemplo
  componente1 = "Etanol";
  componente2 = "Água";
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 1:</label>");
  document.getElementById("label_composicao").innerHTML = "Composição (Etanol):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Etanol):";

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
  metodo_grafico = "Ponchon-Savarit";
  tipo_mistura = "Mistura Não Ideal";
  metodo_atividade = "UNIFAC";
  metodo_entalpia = "Van der Waals";

  // Marcação dos radio buttons e selects de acordo com especificações do exemplo
  $("#tipo_mistura2").prop("checked", true);
  $("#metodo_2").prop("checked", true);
  $("#metodo_2").prop("switch", false);
  document.getElementById("div_select").className = "input-field col m6 s12";
  document.getElementById("div_select_2").className = "input-field col m6 s12";
  document.getElementById("select_entalpia").value = 1;
  document.getElementById("range_element").value = 4;

  Rd = null;
  Rd = 4;

  // Funções de cálculo do Ponchon-Savarit e demonstração dos resultados
  add_atividade("UNIFAC");
  curva_eq_nao_ideal();
  curva_entalpia_nao_ideal();
  Ponchon_Savarit();
  // Resultados do número de pratos, prato de alimentação e composição de cada estágio
  separar_resultados();
  composicao_estagios();
  gerar_grafico_Ponchon(900);
  alterar_label();

}

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

// Desabilitação dos resultados enquanto não houverem dados inseridos
bloquear_respostas();

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
  reta_amarracao,
  fracao = "molar";
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
  metodo_entalpia_added = false,
  verificar_range = false;

// Desabilitar scroll nos inputs das composições
$(document).on("wheel", "input[type=number]", function(e) {
  $(this).blur();
});

//Comandos de cálculo do slider da razão de refluxo, após verificação dos inputs
function botao_calcular() {

  // Habilitação dos campos de entrada
  document.getElementById("div_componentes").className = "input-field col s12";
  document.getElementById("div_componentes_2").className = "input-field col s12";
  document.getElementById("div_label_switch").className = "row  m12 s12";
  document.getElementById("div_composicoes").className = "row";
  document.getElementById("div_atividade").className = "col m12 s12";
  document.getElementById("div_metodo_mistura").className = "col m12";
  document.getElementById("div_chart").className = "chart-container";
  document.getElementById("div_resultados").className = "";

  if (tipo_mistura == "Mistura Não Ideal" && metodo_grafico == "McCabe-Thiele") {

    document.getElementById("div_select").className = "input-field col m12 s12";

  } else if (tipo_mistura == "Mistura Não Ideal" && metodo_grafico == "Ponchon-Savarit") {

    document.getElementById("div_select").className = "input-field col m6 s12";
    document.getElementById("div_select_2").className = "input-field col m6 s12";

  }

  if (metodo_grafico == "McCabe-Thiele") {

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

      curva_eq_nao_ideal();
      McCabe_nao_ideal();
      // Resultados do número de pratos, prato de alimentação e composição de cada estágio
      separar_resultados();
      composicao_estagios();
      gerar_grafico_McCabe(900);
      alterar_label();

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

      Ponchon_Savarit();
      // Resultados do número de pratos, prato de alimentação e composição de cada estágio
      separar_resultados();
      composicao_estagios();
      gerar_grafico_Ponchon(900);
      alterar_label();

    }

  }

}

//Comandos de cálculo do botão Exemplo Ideal
function exemplo_mc_ideal() {

  // Limpeza das checkboxes
  limpar_checkboxes()
  verificar_range = true;

  // Habilitação do slider
  document.getElementById("range_element").className = "";
  document.getElementById("range_element").disabled = "";

  // Definição dos componentes do exemplo
  componente1 = "Benzeno";
  componente2 = "Tolueno";

  // Atualização dos selects de métodos de atividade e entalpias residuais
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");

  // Atualização da label de composição
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 2:</label>");
  document.getElementById("label_composicao").innerHTML = "Composição (fração <b>mássica</b> de <b>Benzeno</b>):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Benzeno):";

  // Liberação dos campos de adição de composições
  document.getElementById("div_componentes").className = "input-field col s12";
  document.getElementById("div_componentes_2").className = "input-field col s12";
  document.getElementById("div_label_switch").className = "row  m12 s12";
  document.getElementById("div_composicoes").className = "row";
  document.getElementById("div_atividade").className = "col m12 s12";
  document.getElementById("div_metodo_mistura").className = "col m12";
  document.getElementById("div_chart").className = "chart-container";
  document.getElementById("div_resultados").className = "";

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
  document.getElementById("div_select").setAttribute('hidden', 'hidden');
  document.getElementById("div_select_2").setAttribute('hidden', 'hidden');
  document.getElementById("range_element").value = 3.5;

  // Definição da razão de refluxo
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
  verificar_range = true;
  // Habilitação do slider
  document.getElementById("range_element").className = "";
  document.getElementById("range_element").disabled = "";

  // Definição dos componentes do exemplo
  componente1 = "Etanol";
  componente2 = "Água";
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 2:</label>");

  // Atualização da label de composição
  document.getElementById("label_composicao").innerHTML = "Composição (fração <b>molar</b> de <b>Etanol</b>):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Etanol):";

  // Liberação dos campos de adição de composições
  document.getElementById("div_componentes").className = "input-field col s12";
  document.getElementById("div_componentes_2").className = "input-field col s12";
  document.getElementById("div_label_switch").className = "row  m12 s12";
  document.getElementById("div_composicoes").className = "row";
  document.getElementById("div_atividade").className = "col m12 s12";
  document.getElementById("div_metodo_mistura").className = "col m12";
  document.getElementById("div_chart").className = "chart-container";
  document.getElementById("div_resultados").className = "";
  document.getElementById("div_select").className = "input-field col m12 s12";


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
  document.getElementById("div_select").className = "input-field col m12 s12";
  document.getElementById("div_select").removeAttribute('hidden');
  document.getElementById("div_select_2").setAttribute('hidden', 'hidden');
  document.getElementById("range_element").value = 4;

  // Definição da razão de refluxo
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
  verificar_range = true;

  // Habilitação do slider
  document.getElementById("range_element").className = "";
  document.getElementById("range_element").disabled = "";

  // Definição dos componentes do exemplo
  componente1 = "Benzeno";
  componente2 = "Tolueno";
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 2:</label>");

  // Atualização da label de composições
  document.getElementById("label_composicao").innerHTML = "Composição (fração <b>mássica</b> de <b>Benzeno</b>):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Benzeno):";

  // Liberação dos campos de adição de composições
  document.getElementById("div_componentes").className = "input-field col s12";
  document.getElementById("div_componentes_2").className = "input-field col s12";
  document.getElementById("div_label_switch").className = "row  m12 s12";
  document.getElementById("div_composicoes").className = "row";
  document.getElementById("div_atividade").className = "col m12 s12";
  document.getElementById("div_metodo_mistura").className = "col m12";
  document.getElementById("div_chart").className = "chart-container";
  document.getElementById("div_resultados").className = "";

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
  document.getElementById("div_select").setAttribute('hidden', 'hidden');
  document.getElementById("div_select_2").setAttribute('hidden', 'hidden');
  document.getElementById("range_element").value = 3.5;

  // Definição da razão de refluxo
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
  verificar_range = true;
  // Habilitação do slider
  document.getElementById("range_element").className = "";
  document.getElementById("range_element").disabled = "";

  // Definição dos componentes do exemplo
  componente1 = "Etanol";
  componente2 = "Água";
  mudar_select("div_componentes", componente1, "select_componentes_1", data.componentes, "add_comp_1()");
  mudar_select("div_componentes_2", componente2, "select_componentes_2", data.componentes, "add_comp_2()");
  $("#div_componentes").append("<label class='aux_label'>Componente 1:</label>");
  $("#div_componentes_2").append("<label class='aux_label'>Componente 1:</label>");

  // Atualização da label de composições
  document.getElementById("label_composicao").innerHTML = "Composição (fração <b>molar</b> de <b>Etanol</b>):";
  document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (Etanol):";

  // Liberação dos campos de adição de composições
  document.getElementById("div_componentes").className = "input-field col s12";
  document.getElementById("div_componentes_2").className = "input-field col s12";
  document.getElementById("div_label_switch").className = "row  m12 s12";
  document.getElementById("div_composicoes").className = "row";
  document.getElementById("div_atividade").className = "col m12 s12";
  document.getElementById("div_metodo_mistura").className = "col m12";
  document.getElementById("div_chart").className = "chart-container";
  document.getElementById("div_resultados").className = "";
  document.getElementById("div_select").className = "input-field col m6 s12";
  document.getElementById("div_select_2").className = "input-field col m6 s12";


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
  document.getElementById("div_select").removeAttribute('hidden');
  document.getElementById("div_select_2").removeAttribute('hidden');
  document.getElementById("select_entalpia").value = 1;
  document.getElementById("range_element").value = 4;

// Definição da razão de refluxo
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

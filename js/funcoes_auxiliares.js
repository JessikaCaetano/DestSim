// Função para limpar as checkboxes
function limpar_checkboxes() {

  $("#tipo_mistura1").prop("checked", false);
  $("#tipo_mistura2").prop("checked", false);
  $("#metodo_1").prop("checked", false);
  $("#metodo_2").prop("checked", false);
  $("#switch").prop("checked", false);

}

// Adicionar opções para os selects
function criar_select(select, dados, opt_selected) {

  select = document.getElementById(select);
  var opt = document.createElement("option");
  opt.value = 0;
  opt.text = "Escolha uma opção";
  opt.selected = "selected";
  opt.disabled = "disabled";

  if (opt.text == opt_selected) {
    opt.selected = "selected";
  }

  select.add(opt, select.options[0]);
  for (i = 0; i < dados.length; i++) {
    var opt = document.createElement("option");
    opt.value = i + 1;
    opt.text = dados[i];

    if (opt.text == opt_selected) {
      opt.selected = "selected";
    }

    select.add(opt, select.options[i + 1]);
  }

  $("select").material_select();

}

// Função para adicionar os valores de composições escolhidos
function valor_composicoes() {

  tipo_composicao = document.getElementById("switch").checked;
  xF = document.getElementById("input_alimentacao").value;
  xD = document.getElementById("input_topo").value;
  xB = document.getElementById("input_fundo").value;
}

// Função que pega valores das massas molares dos componentes
function massa_molar(componente1, componente2) {

  for (var i = 0; i < data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {
      M1 = data.massa_molar[i];
    } else if (data.componentes[i] == componente2) {
      M2 = data.massa_molar[i];
    }

  }

}

// Função de conversão de composição molar para mássica
function mol_to_mass(value) {

  x_massico = (value * M1) / (value * M1 + (1 - value) * M2);

}

// Função de conversão de composição mássica para molar
function mass_to_mol(value) {

  x_molar = (value / M1) / (value / M1 + (1 - value) / M2);

}

// Chama as funções de conversão
function converter() {

  // Definição dos valores inseridos e verificação da posição do switch
  valor_composicoes();

  // Chamada das funções de conversão caso necessário
  if (tipo_composicao == true) {

    if (xF) {
      mol_to_mass(parseFloat(xF));
      document.getElementById("input_alimentacao").value = x_massico.toFixed(2);
    }
    if (xD) {
      mol_to_mass(parseFloat(xD));
      document.getElementById("input_topo").value = x_massico.toFixed(2);
    }
    if (xB) {
      mol_to_mass(parseFloat(xB));
      document.getElementById("input_fundo").value = x_massico.toFixed(2);
    }

  } else {

    if (xF) {
      mass_to_mol(parseFloat(xF))
      document.getElementById("input_alimentacao").value = x_molar.toFixed(2);
    }
    if (xD) {
      mass_to_mol(parseFloat(xD))
      document.getElementById("input_topo").value = x_molar.toFixed(2);
    }
    if (xB) {
      mass_to_mol(parseFloat(xB))
      document.getElementById("input_fundo").value = x_molar.toFixed(2);
    }

  }

}

// Pega o valor marcado nos radio buttons
function valor_radio(grupo) {

  var aux2 = [];
  var variavel;

  aux2 = document.getElementsByName(grupo);

  for (var i = 0; i < aux2.length; i++) {

    if (aux2[i].checked == true) {
      variavel = aux2[i].value;
    }

  }
  aux2 = [];

  return variavel;

}

// Função que define o componente volátil calcula temperaturas saturadas
function calcular_comp_volatil() {

  // Definição dos valores das constantes de Antoine para os componentes escolhidos
  for (i = 0; i <= data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {

      j = i;

    }

  }

  A1 = data.cte_antoineA[j];
  B1 = data.cte_antoineB[j];
  C1 = data.cte_antoineC[j];

  for (i = 0; i <= data.componentes.length; i++) {

    if (data.componentes[i] == componente2) {

      j = i;

    }

  }

  A2 = data.cte_antoineA[j];
  B2 = data.cte_antoineB[j];
  C2 = data.cte_antoineC[j];

  //Cálculo das temperaturas de saturação
  T1sat = B1 / (A1 - Math.log(pressao)) - C1;
  T2sat = B2 / (A2 - Math.log(pressao)) - C2;

  //Definição do componente mais volátil e do intervalo de temperaturas, incluindo adequação aos métodos gráficos
  if (T1sat > T2sat) {

    compvolatil = componente2;
    aux = componente1;
    componente1 = componente2;
    componente2 = aux;

    aux = T1sat;
    T1sat = T2sat;
    T2sat = aux;

    aux = A1;
    A1 = A2;
    A2 = aux;

    aux = B1;
    B1 = B2;
    B2 = aux;

    aux = C1;
    C1 = C2;
    C2 = aux;

  } else {

    compvolatil = componente1;

  }

}

function calcular_num_min_pratos() {

  Rd = null;
  Rd = 100;
  var aux_estagios = 0;

  if (metodo_grafico == "McCabe-Thiele") {

    if (tipo_mistura == "Mistura Ideal") {

      McCabe_Ideal();

    } else if (tipo_mistura == "Mistura Não Ideal") {

      McCabe_nao_ideal();

    }

    for (var i = 1; i < y_degrau.length; i++) {

      if (y_degrau[i - 1] == y_degrau[i]) {

        aux_estagios = aux_estagios + 1;

      }

    }

  } else if (metodo_grafico == "Ponchon-Savarit") {

    Ponchon_Savarit();

    aux_estagios = reta_amarracao.length / 2;

  }

  return aux_estagios;

}
// Função que prepara os resultados para serem mostrados
function separar_resultados() {

  if (metodo_grafico == "McCabe-Thiele") {
    x_estagio = [];
    y_estagio = [];

    num_estagios = 0;
    estagio_alimentacao = 0;

    for (var i = 1; i < y_degrau.length; i++) {

      if (y_degrau[i - 1] == y_degrau[i]) {

        x_estagio.push(x_degrau[i]);
        y_estagio.push(y_degrau[i]);
        num_estagios = num_estagios + 1;

      }

      if ((xF <= x_degrau[i - 1]) && (xF > x_degrau[i])) {

        estagio_alimentacao = num_estagios;

      }

    }

  } else if (metodo_grafico == "Ponchon-Savarit") {

    x_estagio = [];
    y_estagio = [];

    num_estagios = reta_amarracao.length / 2;
    estagio_alimentacao = 0;
    var aux = 0;

    for (var i = 1; i < reta_amarracao.length; i++) {

      if (reta_amarracao[aux]) {
        y_estagio.push(reta_amarracao[aux][0]);
      }

      if (reta_amarracao[aux + 1]) {
        x_estagio.push(reta_amarracao[aux + 1][0]);
      }

      aux = aux + 2;

    }

    for (var i = 0; i < x_estagio.length; i++) {

      if (xF >= x_estagio[i] && xF <= y_estagio[i]) {

        estagio_alimentacao = i + 1;

      }

    }

  }

}

// Mostra resultados das labels
function alterar_label() {

  num_minimo_pratos = calcular_num_min_pratos();
  document.getElementById("num_estagios").innerHTML = num_estagios;
  document.getElementById("prato_alimentacao").innerHTML = estagio_alimentacao;
  document.getElementById("Rd_min").innerHTML = Rd_min.toFixed(2);
  document.getElementById("Num_min").innerHTML = num_minimo_pratos;

}

// Mostra resultados na tabela de composições
function composicao_estagios() {

  var tabela = document.getElementById("tabela_composicoes_1");

  // Create an empty <tr> element and add it to the 1st position of the table:
  $("#tabela_composicoes_1 tr").remove();
  $("#tabela_composicoes_2 tr").remove();

  tabela_1_head = document.getElementById("tabela_1_head");
  tabela_1_head.innerHTML = tabela_1_head.innerHTML + "<tr> <th>" + "Estágio" + "</th> <th>" + "x (fração molar)" + "</th> <th>" + "y (fração molar)" + "</th> </tr>";
  tabela_2_head = document.getElementById("tabela_2_head");
  tabela_2_head.innerHTML = tabela_2_head.innerHTML + "<tr> <th>" + "Estágio" + "</th> <th>" + "x (fração molar)" + "</th> <th>" + "y (fração molar)" + "</th> </tr>";

  tabela_1_body = document.getElementById("tabela_1_body");
  for (var i = 1; i <= Math.round(x_estagio.length / 2); i++) {

    tabela_1_body.innerHTML = tabela_1_body.innerHTML + "<tr> <th>" + i + "</th> <th>" + x_estagio[i - 1].toFixed(2) + "</th> <th>" + y_estagio[i - 1].toFixed(2) + "</th> </tr>";

  }

  tabela_2_body = document.getElementById("tabela_2_body")
  for (var i = Math.round(x_estagio.length / 2) + 1; i <= x_estagio.length; i++) {

    tabela_2_body.innerHTML = tabela_2_body.innerHTML + "<tr> <th>" + i + "</th> <th>" + x_estagio[i - 1].toFixed(2) + "</th> <th>" + y_estagio[i - 1].toFixed(2) + "</th> </tr>"

  }

}

// Funções de definição do método de cálculo de atividade e de entalpia
function add_metodo() {

  metodo_added = false;

  if (document.getElementById("novo_select").value != 0) {

    metodo_atividade = metodos_atividade[document.getElementById("novo_select").value - 1];

  }

  if (metodo_atividade) {

    metodo_added = true;

  }

}

function add_metodo_entalpia() {

  metodo_added_entalpia = false;

  if (document.getElementById("select_entalpia").value != 0) {

    metodo_entalpia = data.metodos_entalpia[document.getElementById("select_entalpia").value - 1];

  }

  if (metodo_entalpia) {

    metodo_added_entalpia = true;

  }

}

// Pega os parâmetros da mistura de cada método de cálculo de atividade
function localizar_mistura(componente1, componente2) {

  j1 = -1;
  j2 = -1;
  j3 = -1;

  // Organização dos componentes de acordo com o método de cálculo de atividade escolhido
  for (i = 0; i < data.misturas_vl.length; i++) {

    if (data.misturas_vl[i] == componente1 + " e " + componente2) {

      j1 = i;

    } else if (data.misturas_vl[i] == componente2 + " e " + componente1) {

      j1 = i;

    }

  }

  for (i = 0; i < data.misturas_NRTL.length; i++) {

    if (data.misturas_NRTL[i] == componente1 + " e " + componente2) {

      j2 = i;

    } else if (data.misturas_NRTL[i] == componente2 + " e " + componente1) {

      j2 = i;

    }

  }

  for (i = 0; i < data.misturas_Wilson.length; i++) {

    if (data.misturas_Wilson[i] == componente1 + " e " + componente2) {

      j3 = i;

    } else if (data.misturas_Wilson[i] == componente2 + " e " + componente1) {

      j3 = i;

    }

  }

  if (metodo_atividade == "UNIFAC") {

    UNIFAC_propriedades();

  }

}

// Pega as propriedades críticas dos componentes no banco de dados
function adicionar_prop_criticas() {

  for (var k = 0; k < data.componentes.length; k++) {

    if (data.componentes[k] == componente1) {

      w_componente_1 = data.prop_w[k];
      Pc_componente_1 = data.prop_Pc[k];
      Tc_componente_1 = data.prop_Tc[k];

    }

    if (data.componentes[k] == componente2) {

      w_componente_2 = data.prop_w[k];
      Pc_componente_2 = data.prop_Pc[k];
      Tc_componente_2 = data.prop_Tc[k];

    }

  }

}

// Pega as propriedades termodinâmicas dos componentes no banco de dados
function adicionar_prop_termodinamicas() {

  for (i = 0; i <= data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {
      j = i;
    }

  }

  Cpl1_C1 = data.Cpl_C1[j];
  Cpl1_C2 = data.Cpl_C2[j];
  Cpl1_C3 = data.Cpl_C3[j];
  Cpl1_C4 = data.Cpl_C4[j];
  Cpl1_C5 = data.Cpl_C5[j];

  Cpg1_C1 = data.Cpg_C1[j];
  Cpg1_C2 = data.Cpg_C2[j];
  Cpg1_C3 = data.Cpg_C3[j];
  Cpg1_C4 = data.Cpg_C4[j];
  Cpg1_C5 = data.Cpg_C5[j];

  Lat1_C1 = data.calor_latente_C1[j];
  Lat1_C2 = data.calor_latente_C2[j];
  Lat1_C3 = data.calor_latente_C3[j];
  Lat1_C4 = data.calor_latente_C3[j];

  delta_vaporizacao_1 = data.calor_vaporizacao[j];
  T_vap_1 = data.temperatura_vaporizacao[j];

  for (i = 0; i <= data.componentes.length; i++) {

    if (data.componentes[i] == componente2) {
      j = i;
    }

  }

  Cpl2_C1 = data.Cpl_C1[j];
  Cpl2_C2 = data.Cpl_C2[j];
  Cpl2_C3 = data.Cpl_C3[j];
  Cpl2_C4 = data.Cpl_C4[j];
  Cpl2_C5 = data.Cpl_C5[j];

  Cpg2_C1 = data.Cpg_C1[j];
  Cpg2_C2 = data.Cpg_C2[j];
  Cpg2_C3 = data.Cpg_C3[j];
  Cpg2_C4 = data.Cpg_C4[j];
  Cpg2_C5 = data.Cpg_C5[j];

  Lat2_C1 = data.calor_latente_C1[j];
  Lat2_C2 = data.calor_latente_C2[j];
  Lat2_C3 = data.calor_latente_C3[j];
  Lat2_C4 = data.calor_latente_C3[j];

  delta_vaporizacao_2 = data.calor_vaporizacao[j];
  T_vap_2 = data.temperatura_vaporizacao[j];

}

// Chama o método de atividade de acordo com o escolhido
function chamar_metodo_atividade() {

  if (metodo_atividade == "Van Laar") {

    Van_Laar();

  } else if (metodo_atividade == "NRTL") {

    NRTL();

  } else if (metodo_atividade == "Wilson") {

    Wilson();

  } else if (metodo_atividade == "UNIFAC") {

    UNIFAC();

  }

}

// Chama o método de entalpia residual de acordo com o escolhido
function chamar_metodo_entalpia_residual(T3, Tc_aux, w_aux) {

  if (metodo_entalpia == "Van der Waals") {

    Van_der_Waals(Tc_aux, T3);

  } else if (metodo_entalpia == "Redlich/Kwong") {

    Redlich_Kwong(Tc_aux, T3);

  } else if (metodo_entalpia == "Soave/Redlich/Kwong") {

    Soave_Redlich_Kwong(Tc_aux, T3, w_aux);

  } else if (metodo_entalpia == "Peng/Robinson") {

    Peng_Robinson(Tc_aux, T3, w_aux);

  }

}

// Função de adição dos métodos de cálculo de atividade à caixa de rolagem
function add_atividade(componente) {

  // Limpeza do vetor dos métodos de atividade
  metodos_atividade = [];

  // Habilitação das caixas de input das composições
  document.getElementById("div_composicoes").className = "row";

  // Definição das massas molares dos componentes
  massa_molar(componente1, componente2);

  // Organização dos componentes de acordo com o banco de dados de misturas de cada método não ideal
  localizar_mistura(componente1, componente2);

  // Determinação dos métodos disponíveis para cada mistura
  if (j1 >= 0) {

    metodos_atividade.push("Van Laar");

  }

  if (j2 >= 0) {

    metodos_atividade.push("NRTL");

  }

  if (j3 >= 0) {

    metodos_atividade.push("Wilson");

  }

  metodos_atividade.push("UNIFAC");

  mudar_select("div_select", componente, "novo_select", metodos_atividade, "add_metodo()");

  // Adição da label à div
  $("#div_select").append('<label>Método de cálculo da atividade:</label>');

  $('select').material_select();
}

// Função de adição dos componentes à caixa de rolagem do componete 1
function add_comp_1() {

  document.getElementById("range_element").value = "10";
  c_added_1 = true;

  // Adição dos componentes a partir das barras de rolagem
  componente1 = data.componentes[document.getElementById("select_componentes_1").value - 1];

  if (document.getElementById("select_componentes_2").value != 0) {

    componente2 = data.componentes[document.getElementById("select_componentes_2").value - 1];

  }

  if (componente2) {

    c_added_2 == true;
    add_atividade("Escolha uma opção");
    calcular_comp_volatil();
    document.getElementById("label_composicao").innerHTML = "Composição (" + compvolatil + "):";
    document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (" + compvolatil + "):";

  }

}

// Função de adição dos componentes à caixa de rolagem do componete 2
function add_comp_2() {

  document.getElementById("range_element").value = "10";
  c_added_2 = true;

  // Adição dos componentes a partir das barras de rolagem
  componente2 = data.componentes[document.getElementById("select_componentes_2").value - 1];

  if (document.getElementById("select_componentes_1").value != 0) {

    componente1 = data.componentes[document.getElementById("select_componentes_1").value - 1];

  }

  if (componente1) {

    c_added_1 == true;
    add_atividade("Escolha uma opção");
    calcular_comp_volatil();
    document.getElementById("label_composicao").innerHTML = "Composição (" + compvolatil + "):";
    document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (" + compvolatil + "):";

  }

}

// Função que muda o select
function mudar_select(div_mudar, componente, select, dados, funcao) {

  $("#" + div_mudar).empty();

  select_1 = document.createElement("select");
  document.getElementById(div_mudar).appendChild(select_1);
  select_1.setAttribute("id", select);
  select_1.setAttribute("onchange", funcao);

  criar_select(select, dados, componente)

}

// Funções para esconder/mostrar informações
function mostrar_label_1() {

  if (info_on_1 == false) {

    document.getElementById("label_info_1").removeAttribute('hidden');
    document.getElementById("label_info_2").removeAttribute('hidden');
    document.getElementById("label_info_3").removeAttribute('hidden');
    document.getElementById("label_info_6").removeAttribute('hidden');
    info_on_1 = true;

  } else if (info_on_1 == true) {

    document.getElementById("label_info_1").setAttribute('hidden', 'hidden');
    document.getElementById("label_info_2").setAttribute('hidden', 'hidden');
    document.getElementById("label_info_3").setAttribute('hidden', 'hidden');
    document.getElementById("label_info_6").setAttribute('hidden', 'hidden');
    info_on_1 = false;

  }

}

function mostrar_label_2() {

  if (info_on_2 == false) {

    document.getElementById("label_info_4").removeAttribute('hidden');
    document.getElementById("label_info_5").removeAttribute('hidden');
    info_on_2 = true;

  } else if (info_on_2 == true) {

    document.getElementById("label_info_4").setAttribute('hidden', 'hidden');
    document.getElementById("label_info_5").setAttribute('hidden', 'hidden');
    info_on_2 = false;

  }
  if (compvolatil) {

    document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (" + compvolatil + "):";

  }

}

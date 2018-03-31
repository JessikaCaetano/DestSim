function limpar_checkboxes() {

  $("#tipo_mistura1").prop("checked", false);
  $("#tipo_mistura2").prop("checked", false);
  $("#metodo1").prop("checked", false);
  $("#metodo2").prop("checked", false);
  $("#switch").prop("checked", false);

}

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

function mudar_select(div_mudar, componente, select, dados, funcao) {

  $("#" + div_mudar).empty();

  select_1 = document.createElement("select");
  document.getElementById(div_mudar).appendChild(select_1);
  select_1.setAttribute("id", select);
  select_1.setAttribute("onchange", funcao);

  criar_select(select, dados, componente)

}

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

function valor_composicoes() {

  tipo_composicao = document.getElementById("switch").checked;
  xF = document.getElementById("input_alimentacao").value;
  xD = document.getElementById("input_topo").value;
  xB = document.getElementById("input_fundo").value;
}

function valor_radio(grupo) {

  var aux2 = Array();
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

function massa_molar(componente1, componente2) {

  for (var i = 0; i < data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {
      M1 = data.massa_molar[i];
    } else if (data.componentes[i] == componente2) {
      M2 = data.massa_molar[i];
    }

  }

}

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

function separar_resultados() {

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

}

function alterar_label() {

  document.getElementById("num_estagios").innerHTML = num_estagios;
  document.getElementById("prato_alimentacao").innerHTML = estagio_alimentacao;

}

function composicao_estagios() {

  var tabela = document.getElementById("tabela_composicoes");

  // Create an empty <tr> element and add it to the 1st position of the table:
  $("#tabela_composicoes tr").remove();
  var linha_1 = tabela.insertRow(0);
  var linha_2 = tabela.insertRow(1);
  var linha_3 = tabela.insertRow(2);
  var cell0 = linha_1.insertCell(0);
  cell0.innerHTML = "Estágio:";
  var cell0 = linha_2.insertCell(0);
  cell0.innerHTML = "x (fração molar):";
  var cell0 = linha_3.insertCell(0);
  cell0.innerHTML = "y (fração molar):";
  for (var i = 1; i <= x_estagio.length; i++) {
    var cell1 = linha_1.insertCell(i);
    cell1.innerHTML = i;
    var cell2 = linha_2.insertCell(i);
    cell2.innerHTML = x_estagio[i - 1].toFixed(2);
    var cell3 = linha_3.insertCell(i);
    cell3.innerHTML = y_estagio[i - 1].toFixed(2);
  }

}

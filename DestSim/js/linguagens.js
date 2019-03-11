// Destsim - Software de auxílio ao ensino da modelagem de colunas de destilação pelos métodos de McCabe-Thiele e Ponchon_Savarit
// Desenvolvedora: Jessika Nunes Caetano
// Data da última modificação: 10/03/2019

// Função que atualiza os selects e outros componentes quando a linguagem é mudada no meio de uma simulação
function atualizar_selects(linguagem) {

  for (var i = 0; i < data.componentes.length; i++) {

    if (componente1 == data.componentes[i]) {

      var componente1_aux = linguagem[91][1][i];

    }

    if (componente2 == data.componentes[i]) {

      var componente2_aux = linguagem[91][1][i];

    }

  }

  mudar_select("div_componentes", componente1_aux, "select_componentes_1", linguagem[91][1], "add_comp_1()");
  mudar_select("div_componentes_2", componente2_aux, "select_componentes_2", linguagem[91][1], "add_comp_2()");
  mudar_select("div_select", metodo_atividade, "select_atividade", data.metodos_atividade, "add_metodo()");
  mudar_select("div_select_2", metodo_entalpia, "select_entalpia", data.metodos_entalpia, "bloquear_respostas()");

  // Adição da label à div
  if (linguagem == ptBR) {
    $("#div_componentes").append('<label>Componente 1</label>');
    $("#div_componentes_2").append('<label>Componente 2</label>');
    $("#div_select").append('<label>Método de cálculo da atividade:</label>');
    $("#div_select_2").append('<label>Método de cálculo da entalpia residual:</label>');
  } else {
    $("#div_componentes").append('<label>Component 1</label>');
    $("#div_componentes_2").append('<label>Component 2</label>');
    $("#div_select").append('<label>Activity calculation method:</label>');
    $("#div_select_2").append('<label>Residual enthalpy calculation method:</label>');
  }

  if (num_minimo_pratos) {

    alterar_label();
    composicao_estagios();

  }

  if (compvolatil) {

    for (var i = 0; i < data.componentes.length; i++) {

      if (data.componentes[i] == compvolatil) {

        var compvolatil_aux = linguagem[91][1][i];

      }

    }

    tipo_composicao = document.getElementById("switch").checked;

    if (tipo_composicao == true) {

      if (linguagem == ptBR) {
        fracao = "mássica";
      } else {
        fracao = "mass";
      }

    } else {
      fracao = "molar";
    }

    if (linguagem == ptBR) {
      document.getElementById("label_composicao").innerHTML = "Composição (fração <b>" + fracao + "</b> de <b>" + compvolatil_aux + "</b>):";
      document.getElementById("label_info_4").innerHTML = "As composições são dadas em relação ao componente mais volátil (" + compvolatil_aux + "):";
    } else {
      document.getElementById("label_composicao").innerHTML = "Composition (<b>" + fracao + "</b> fraction of <b>" + compvolatil_aux + "</b>):";
      document.getElementById("label_info_4").innerHTML = "The compositions refer to the most volatile component (" + compvolatil_aux + "):";
    }

  }

}

// Função que altera a linguagem dos textos da página
function mudar_linguagem(ind, linguagem) {

  if (linguagem[ind]) {

    if (linguagem[ind][0].includes("manual") || linguagem[ind][0].includes("sobre_metodos") || linguagem[ind][0].includes("resposta")) {
      $("#" + linguagem[ind][0] + "").html(linguagem[ind][1]);
    } else {
      $("#" + linguagem[ind][0] + "").text(linguagem[ind][1]);
    }

  }

}

// Função que chama a mudança de linguagem de acordo com o idioma escolhido
function escolher_linguagem(valor_select) {

  if (valor_select == "1") {

    linguagem = ptBR;
    opcao_texto = "Portuguese (BR)";

  } else {

    linguagem = enUS;
    opcao_texto = "English (US)";

  }

  for (var i = 0; i < ptBR.length; i++) {

    mudar_linguagem(i, linguagem);

  }

}

// Inicialização dos selects de linguagem de acordo com a página atual e o idioma definido em outras páginas
if (linguagem && opcao_texto) {

  if (index_pagina <= 4) {

    mudar_select("div_linguagem_" + index_pagina, opcao_texto, "select_linguagem_" + index_pagina, ['Portuguese (BR)', 'English (US)'], "escolher_linguagem(document.getElementById('select_linguagem_" + index_pagina + "').value)");

  } else {

    if (document.getElementById("select_linguagem_" + index_pagina)) {

      mudar_select("div_linguagem_" + index_pagina, opcao_texto, "select_linguagem_" + index_pagina, ['Portuguese (BR)', 'English (US)'], "escolher_linguagem(document.getElementById('select_linguagem_" + index_pagina + "').value); atualizar_selects(linguagem);");

    }

  }

  for (var i = 0; i < ptBR.length; i++) {

    mudar_linguagem(i, linguagem);

  }

} else {

  linguagem = ptBR; //RESOLVER ISSO AQUI
  opcao_texto = "Portuguese (BR)"; //RESOLVER ISSO AQUI, ver o negócio do escolha uma opção

  if (index_pagina <= 4) {

    mudar_select("div_linguagem_" + index_pagina, opcao_texto, "select_linguagem_" + index_pagina, ['Portuguese (BR)', 'English (US)'], "escolher_linguagem(document.getElementById('select_linguagem_" + index_pagina + "').value)");

  } else {

    if (document.getElementById("select_linguagem_" + index_pagina)) {

      mudar_select("div_linguagem_" + index_pagina, opcao_texto, "select_linguagem_" + index_pagina, ['Portuguese (BR)', 'English (US)'], "escolher_linguagem(document.getElementById('select_linguagem_" + index_pagina + "').value); atualizar_selects(linguagem);");

    }

  }

  for (var i = 0; i < ptBR.length; i++) {

    mudar_linguagem(i, linguagem);

  }

}

if (linguagem == ptBR) {

  $("#div_linguagem_" + index_pagina).append("<label id='linguagem_" + index_pagina + "'class='aux_label'>Idioma:</label>");

} else {

  $("#div_linguagem_" + index_pagina).append("<label id='linguagem_" + index_pagina + "'class='aux_label'>Language:</label>");

}

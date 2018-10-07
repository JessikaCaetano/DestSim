// Função de cálculo das temperaturas saturadas e vetor de temperaturas
function Antoine() {

  // Definição do componente mais volátil e formação de um vetor de temperaturas
  calcular_comp_volatil();

  temperaturas = []

  for (i = 0; i <= 100; i++) {

    temperaturas.push(T1sat + i * (T2sat - T1sat) / 100);

  }

  if (T2sat - T1sat > 50) {

    Materialize.toast("O método de McCabe-Thiele não se adequa a essa mistura. Sugere-se o uso do método de Ponchon-Savarit.", 3000, "red darken-4 justify-center");

  }

}

//Função de cálculo da curva de equilibrio líquido-vapor para misturas ideais
function curva_eq_ideal() {

  //Definição das constantes de Antoine para cada componente de acordo com o banco de dados
  Antoine()

  var P1sat = [],
    P2sat = [];

  //Cálculo da pressão saturada para o intervalo de temperaturas
  for (i = 0; i <= 100; i++) {
    P1sat.push(Math.exp(A1 - B1 / (temperaturas[i] + C1)));
    P2sat.push(Math.exp(A2 - B2 / (temperaturas[i] + C2)));
  }

  // Cálculo dos pares x,y da curva ELV e da volatilidade relativa
  xvolatil = [];
  yvolatil = [];
  alfa_ideal = [];

  for (var i = 0; i <= 100; i++) {

    xvolatil.push((pressao - P2sat[i]) / (P1sat[i] - P2sat[i]));
    yvolatil.push(xvolatil[i] * P1sat[i] / pressao);

  }

  for (var i = 0; i <= 100; i++) {

    if ((xvolatil[i] * (1 - yvolatil[i])) != 0) {

      alfa_ideal.push((yvolatil[i] * (1 - xvolatil[i])) / (xvolatil[i] * (1 - yvolatil[i])));

    }

  }

}

// Função de cálculo do McCabe-Thiele para misturas ideais
function McCabe_Ideal() {

  // Limpeza de vetores
  x_degrau = [];
  y_degrau = [];

  xD = parseFloat(xD);
  xF = parseFloat(xF);
  xB = parseFloat(xB);

  // Cálculo da volatilidade média
  marc = 0;
  alfa_aux = 0;

  for (var i = 0; i < alfa_ideal.length; i++) {

    marc = marc + 1;
    alfa_aux += alfa_ideal[i];

  }

  alfa_medio = alfa_aux / marc;
  yF = (xF * alfa_medio) / (1 + (alfa_medio - 1) * xF);

  // Cálculo da taxa de refluxo mínimo
  if ((xD - yF) / (xF - yF) > 0) {

    Rd_min = (xD - yF) / (xF - yF);

  } else {

    Rd_min = -1 * (xD - yF) / (xF - yF);

  }

  // Definição dovalor mínimo do slider
  var slider_Rd = document.getElementById("range_element");
  slider_Rd.min = (Rd_min + 0.3).toFixed(1);
  step_slider = (slider_Rd.max - slider_Rd.min) / 100;
  slider_Rd.step = step_slider.toFixed(1);

  Rd = document.getElementById("range_element").value;
  Rd = parseFloat(Rd);

  yK = (Rd / (Rd + 1)) * xF + xD / (Rd + 1);

  // Cálculo dos pratos para a seção de retificação
  x_degrau.push(xD);
  y_degrau.push(xD);
  x_aux = xD;
  y_aux = xD;

  do {

    y_degrau.push(y_aux);
    x_aux = y_aux / ((-y_aux * (alfa_medio - 1)) + alfa_medio);
    x_degrau.push(x_aux);
    y_aux = ((Rd / (Rd + 1)) * x_aux) + (xD / (Rd + 1));
    x_degrau.push(x_aux);
    y_degrau.push(y_aux);

  } while (x_aux > xF)

  y_degrau.pop();
  y_degrau.push(((xB * (1 - (yK - xB) / (xF - xB))) + (((yK - xB) * x_aux) / (xF - xB))));
  y_aux = ((xB * (1 - (yK - xB) / (xF - xB))) + (((yK - xB) * x_aux) / (xF - xB)));

  // Cálculo dos pratos para a seção de esgotamento
  do {

    y_degrau.push(y_aux);
    x_aux = y_aux / ((-y_aux * (alfa_medio - 1)) + alfa_medio);
    x_degrau.push(x_aux);
    y_aux = ((xB * (1 - (yK - xB) / (xF - xB))) + (((yK - xB) * x_aux) / (xF - xB)));
    x_degrau.push(x_aux);
    y_degrau.push(y_aux);

  } while (x_aux > xB)

  y_degrau.pop();
  y_degrau.push(x_aux);

  // Resultados do número de pratos, prato de alimentação e composição de cada estágio
  separar_resultados();
  alterar_label();
  composicao_estagios();

}

// Funções de cálculo de coeficientes de atividade para cada método não ideal
function Van_Laar() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = [];
  A21 = [];
  A12 = data.vl_A12[j1];
  A21 = data.vl_A21[j1];
  entalpia_excesso = null;
  // Cálculo das atividades
  atividade_1 = Math.exp(A12 * Math.pow(((A21 * x2) / (A12 * x1 + A21 * x2)), 2));
  atividade_2 = Math.exp(A21 * Math.pow(((A12 * x1) / (A12 * x1 + A21 * x2)), 2));

  // Cálculo da Entalpia em excesso
  entalpia_excesso = 0;

}

function NRTL() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = [];
  A21 = [];
  entalpia_excesso = null;
  A12 = data.NRTL_A12[j2];
  A21 = data.NRTL_A21[j2];
  alfa = data.NRTL_alfa[j2];
  tau12 = A12 / (1.9872 * T1);
  tau21 = A21 / (1.9872 * T1);
  g12 = Math.exp(-alfa * tau12);
  g21 = Math.exp(-alfa * tau21);

  // Cálculo das atividades
  atividade_1 = Math.exp(Math.pow(x2, 2) * (tau21 * Math.pow(g21 / (x1 + x2 * g21), 2) + tau12 * g12 / Math.pow(x2 + x1 * g12, 2)), 2);
  atividade_2 = Math.exp(Math.pow(x1, 2) * (tau12 * Math.pow(g12 / (x2 + x1 * g12), 2) + tau21 * g21 / Math.pow(x1 + x2 * g21, 2)), 2);

  // Cálculo da Entalpia em excesso
  var numerador_1, numerador_2, denominador_1, denominador_2;
  numerador_1 = (x1 * Math.exp((-alfa * A21) / (1.9872 * T1)) * alfa * Math.pow(A21, 2)) / (1.9872 * T1);
  numerador_2 = (x2 * Math.exp((-alfa * A12) / (1.9872 * T1)) * alfa * Math.pow(A12, 2)) / (1.9872 * T1);
  denominador_1 = Math.pow(x1, 2) + 2 * x1 * x2 * Math.exp((-alfa * A21) / (1.9872 * T1)) + Math.pow(x2, 2) * Math.pow(Math.exp((-alfa * A21) / (1.9872 * T1)), 2);
  denominador_2 = Math.pow(x2, 2) + 2 * x2 * x1 * Math.exp((-alfa * A12) / (1.9872 * T1)) + Math.pow(x1, 2) * Math.pow(Math.exp((-alfa * A12) / (1.9872 * T1)), 2);
  entalpia_excesso = -0.0041868 * x1 * x2 * ((numerador_1 / denominador_1) + (numerador_2 / denominador_2));

}

function Wilson() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = [];
  A21 = [];
  entalpia_excesso = null;

  A12 = data.Wilson_A12[j3];
  A21 = data.Wilson_A21[j3];

  zra1 = 0.29056 - 0.08775 * w_componente_1;
  Tr1 = T1 / (Tc_componente_1 + 273.15);
  V1 = (8.314 * (Tc_componente_1 + 273.15) / Pc_componente_1) * Math.pow(zra1, (1 + Math.pow(1 - Tr1, 2 / 7)));
  zra2 = 0.29056 - 0.08775 * w_componente_2;
  Tr2 = T1 / (Tc_componente_2 + 273.15);
  V2 = (8.314 * (Tc_componente_2 + 273.15) / Pc_componente_2) * Math.pow(zra2, (1 + Math.pow(1 - Tr2, 2 / 7)));
  tau12 = (V2 / V1) * Math.exp(-A12 / (1.9872 * T1));
  tau21 = (V1 / V2) * Math.exp(-A21 / (1.9872 * T1));

  // Cálculo das atividades
  ln_atividade_1 = -Math.log(x1 + tau12 * x2) + x2 * (tau12 / (x1 + tau12 * x2) - tau21 / (x2 + x1 * tau21));
  atividade_1 = Math.exp(ln_atividade_1);
  ln_atividade_2 = -Math.log(x2 + tau21 * x1) - x1 * (tau12 / (x1 + tau12 * x2) - tau21 / (x2 + x1 * tau21));
  atividade_2 = Math.exp(ln_atividade_2);

  // Cálculo da Entalpia em excesso
  var numerador_1, numerador_2, denominador_1, denominador_2;
  numerador_1 = x1 * x2 * (V2 / V1) * Math.exp(-A12 / (1.9872 * T1)) * A12;
  numerador_2 = x2 * x1 * (V1 / V2) * Math.exp(-A21 / (1.9872 * T1)) * A21;
  denominador_1 = x1 + x2 * (V2 / V1) * Math.exp(-A12 / (1.9872 * T1));
  denominador_2 = x2 + x1 * (V1 / V2) * Math.exp(-A21 / (1.9872 * T1));

  entalpia_excesso = 0.0041868 * ((numerador_1 / denominador_1) + (numerador_2 / denominador_2));

}

function UNIFAC_propriedades() {

  // Limpeza e criação dos vetores utilizados
  var grupos_comp_1 = [],
    grupos_comp_2 = [],
    id_1 = [],
    id_2 = [],
    indice = [],
    qtd_comp_1 = [],
    qtd_comp_2 = [],
    indice_comp_1 = [],
    indice_comp_2 = [],
    Rk_comp_1 = [],
    Rk_comp_2 = [],
    Qk_comp_1 = [],
    Qk_comp_2 = [];
  ek1 = [];
  ek2 = [];
  id1 = [];
  p_interacao = [];
  entalpia_excesso = null;

  // Definição dos grupos funcionais e a quantidade dos mesmos presente em cada componente
  for (var l = 0; l < data.componentes.length; l++) {

    if (data.componentes[l] == componente1) {

      g11 = data.grupo_funcional1[l];
      qtd11 = data.qtd_gfuncional1[l];
      g12 = data.grupo_funcional2[l];
      qtd12 = data.qtd_gfuncional1[l];
      g13 = data.grupo_funcional3[l];
      qtd13 = data.qtd_gfuncional1[l];

    }

    if (data.componentes[l] == componente2) {

      g21 = data.grupo_funcional1[l];
      qtd21 = data.qtd_gfuncional1[l];
      g22 = data.grupo_funcional2[l];
      qtd22 = data.qtd_gfuncional1[l];
      g23 = data.grupo_funcional3[l];
      qtd23 = data.qtd_gfuncional1[l];

    }

  }

  if (g11 != "") {

    grupos_comp_1.push(g11);
    qtd_comp_1.push(qtd11);

  }

  if (g12 != "") {

    grupos_comp_1.push(g12);
    qtd_comp_1.push(qtd12);

  }

  if (g13 != "") {

    grupos_comp_1.push(g13);
    qtd_comp_1.push(qtd13);

  }

  if (g21 != "") {

    grupos_comp_2.push(g21);
    qtd_comp_2.push(qtd21);

  }

  if (g22 != "") {

    grupos_comp_2.push(g22);
    qtd_comp_2.push(qtd22);

  }
  if (g23 != "") {

    grupos_comp_2.push(g23);
    qtd_comp_2.push(qtd23);

  }

  // Início da coleta de propriedades de cada componente/grupo segundo o método UNIFAC
  for (var m = 0; m < data.grupos_UNIFAC.length; m++) {

    for (var n = 0; n < grupos_comp_1.length; n++) {

      if (data.grupos_UNIFAC[m] == grupos_comp_1[n]) {

        indice_comp_1[n] = data.indice_grupos_UNIFAC[m];
        Rk_comp_1[n] = data.UNIFAC_Rk[m];
        Qk_comp_1[n] = data.UNIFAC_Qk[m];

      }

    }

    for (var n = 0; n < grupos_comp_2.length; n++) {

      if (data.grupos_UNIFAC[m] == grupos_comp_2[n]) {

        indice_comp_2[n] = data.indice_grupos_UNIFAC[m];
        Rk_comp_2[n] = data.UNIFAC_Rk[m];
        Qk_comp_2[n] = data.UNIFAC_Qk[m];

      }

    }

  }

  rk1_total = 0;
  qk1_total = 0;

  for (var i = 0; i < Rk_comp_1.length; i++) {

    rk1_total = rk1_total + qtd_comp_1[i] * Rk_comp_1[i];
    qk1_total = qk1_total + qtd_comp_1[i] * Qk_comp_1[i];

  }

  rk2_total = 0;
  qk2_total = 0;

  for (var i = 0; i < Rk_comp_2.length; i++) {

    rk2_total = rk2_total + qtd_comp_2[i] * Rk_comp_2[i];
    qk2_total = qk2_total + qtd_comp_2[i] * Qk_comp_2[i];

  }

  for (var i = 0; i < indice_comp_1.length; i++) {

    id1.push(indice_comp_1[i]);

  }

  for (var i = 0; i < indice_comp_2.length; i++) {

    id1.push(indice_comp_2[i]);

  }

  for (var i = 0; i < Qk_comp_1.length; i++) {

    ek1[i] = Qk_comp_1[i] * qtd_comp_1[i] / qk1_total;

  }

  for (var i = 0; i < id1.length; i++) {

    for (var j = 0; j < indice_comp_1.length; j++) {

      if (id1[i] == indice_comp_1[j]) {

        indice[i] = i;
        break

      } else {

        indice[i] = 20;

      }

    }

  }

  for (var i = 0; i < indice.length; i++) {

    if (i >= ek1.length) {

      ek1[i] = 0;

    }

    if (indice[i] != i) {

      ek1[i + 1] = ek1[i];
      ek1[i] = 0;

    }

  }

  if (ek1.length > indice.length) {

    ek1.pop();

  }

  indice = [];

  for (var i = 0; i < Qk_comp_2.length; i++) {

    ek2[i] = Qk_comp_2[i] * qtd_comp_2[i] / qk2_total;

  }

  for (var i = 0; i < id1.length; i++) {

    for (var j = 0; j < indice_comp_2.length; j++) {

      if (id1[i] == indice_comp_2[j]) {

        indice[i] = i;
        break;

      } else {

        indice[i] = 20;

      }

    }

  }

  for (var i = 0; i < indice.length; i++) {

    if (i >= ek2.length) {

      ek2[i] = 0;

    }

    if (indice[i] != i) {

      ek2[i + 1] = ek2[i];
      ek2[i] = 0;

    }

  }

  if (ek2.length > indice.length) {

    ek2.pop();

  }

  marc = 0
  for (var i = 0; i < id1.length; i++) {

    for (var j = 0; j < id1.length; j++) {

      id_1[marc] = id1[i];
      id_2[marc] = id1[j];
      marc = marc + 1;

    }

  }

  for (var i = 0; i < marc; i++) {

    for (var j = 0; j < data.indice_grupo1.length; j++) {

      if (data.indice_grupo1[j] == id_2[i] && data.indice_grupo2[j] == id_1[i]) {

        p_interacao[i] = data.interacao_UNIFAC[j];

      }

    }

  }

}

function UNIFAC() {

  // Limpeza dos vetores utilizados
  var bk1 = [],
    bk2 = [],
    Sk = [],
    Tetak = [],
    Tm = [];

  // Início da parte iterativa do método UNIFAC
  J1 = (rk1_total / ((rk1_total * x1) + (rk2_total * x2)));
  J2 = (rk2_total / ((rk1_total * x1) + (rk2_total * x2)));
  L1 = (qk1_total / ((qk1_total * x1) + (qk2_total * x2)));
  L2 = (qk2_total / ((qk1_total * x1) + (qk2_total * x2)));
  ln_AtivC_1 = 1 - J1 + Math.log(J1) - 5 * qk1_total * (1 - (J1 / L1) + Math.log(J1 / L1));
  ln_AtivC_2 = 1 - J2 + Math.log(J2) - 5 * qk2_total * (1 - (J2 / L2) + Math.log(J2 / L2));

  for (var i = 0; i < p_interacao.length; i++) {

    Tm[i] = Math.exp(-p_interacao[i] / T1);

  }

  for (var i = 0; i < id1.length; i++) {
    bk1[i] = 0;
    bk2[i] = 0;
    Sk[i] = 0;
  }

  marc = 0;
  for (var i = 0; i < id1.length; i++) {

    for (var j = 0; j < ek1.length; j++) {

      Tetak[j] = ((x1 * qk1_total * ek1[j] + x2 * qk2_total * ek2[j]) / (x1 * qk1_total + x2 * qk2_total));
      bk1[i] += ek1[j] * Tm[marc];
      bk2[i] += ek2[j] * Tm[marc];
      Sk[i] += Tetak[j] * Tm[marc];
      marc = marc + 1;

    }

  }

  ln_AtivR_1 = qk1_total;
  ln_AtivR_2 = qk2_total;

  for (var i = 0; i < bk1.length; i++) {

    ln_AtivR_1 += -qk1_total * (Tetak[i] * (bk1[i] / Sk[i]) - ek1[i] * Math.log(bk1[i] / Sk[i]));
    ln_AtivR_2 += -qk2_total * (Tetak[i] * (bk2[i] / Sk[i]) - ek2[i] * Math.log(bk2[i] / Sk[i]));

  }

  atividade_1 = Math.exp(ln_AtivC_1 + ln_AtivR_1);
  atividade_2 = Math.exp(ln_AtivC_2 + ln_AtivR_2);

  var Tm_derivada = [],
    bk1_derivada = [],
    bk2_derivada = [],
    Sk_derivada = [];

  for (var i = 0; i < p_interacao.length; i++) {

    Tm_derivada[i] = Math.exp(-p_interacao[i] / T1) * (p_interacao[i] / Math.pow(T1, 2));

  }

  for (var i = 0; i < id1.length; i++) {

    bk1_derivada[i] = 0;
    bk2_derivada[i] = 0;
    Sk_derivada[i] = 0;

  }

  marc = 0;
  for (var i = 0; i < id1.length; i++) {

    for (var j = 0; j < ek1.length; j++) {

      bk1_derivada[i] += ek1[j] * Tm_derivada[marc];
      bk2_derivada[i] += ek2[j] * Tm_derivada[marc];
      Sk_derivada[i] += Tetak[j] * Tm_derivada[marc];
      marc = marc + 1;

    }

  }

  ln_AtivR_1_derivada = 0;
  ln_AtivR_2_derivada = 0;

  for (var i = 0; i < bk1.length; i++) {

    ln_AtivR_1_derivada += -qk1_total * Tetak[i] * ((bk1_derivada[i] * Sk[i] - Sk_derivada[i] * bk1[i]) / Math.pow(Sk[i], 2)) - ek1[i] * (Sk[i] / bk1[i]) * ((bk1_derivada[i] * Sk[i] - Sk_derivada[i] * bk1[i]) / Math.pow(Sk[i], 2));
    ln_AtivR_2_derivada += -qk2_total * Tetak[i] * ((bk2_derivada[i] * Sk[i] - Sk_derivada[i] * bk2[i]) / Math.pow(Sk[i], 2)) - ek2[i] * (Sk[i] / bk2[i]) * ((bk2_derivada[i] * Sk[i] - Sk_derivada[i] * bk2[i]) / Math.pow(Sk[i], 2));

  }

  entalpia_excesso = (-0.0041868) * 1.9872 * Math.pow(T1, 2) * (x1 * ln_AtivR_1_derivada + x2 * ln_AtivR_2_derivada);

}

// Calcula a temperatura e o y para determinada condição de equilíbrio para misturas não ideais
function calculo_temp_nao_ideal_bolha(x) {

  // Definição e limpeza de variáveis
  x1 = x;
  x2 = 1 - x1;

  var diferenca_aux = 100,
    Taux;
  T1 = null;
  entalpia_excesso = null;
  atividade_1 = null, atividade_2 = null;
  T1 = x1 * T1sat + x2 * T2sat + 273.15;
  P1sat = Math.exp(A1 - B1 / ((T1 - 273.15) + C1));
  P2sat = Math.exp(A2 - B2 / ((T1 - 273.15) + C2));

  adicionar_prop_criticas();
  // Cálculo iterativo da temperatura de bolha no ponto x
  do {

    chamar_metodo_atividade();

    var P1aux = pressao / (x1 * atividade_1 + x2 * atividade_2 * P2sat / P1sat);

    Taux = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15;

    if (T1 > Taux) {

      diferenca_aux = T1 - Taux;

    } else {

      diferenca_aux = Taux - T1;

    }

    T1 = Taux;

  } while (diferenca_aux >= 0.001)

  P1sat = Math.exp(A1 - B1 / ((T1 - 273.15) + C1));
  P2sat = Math.exp(A2 - B2 / ((T1 - 273.15) + C2));
  chamar_metodo_atividade();

  // Cálculo do y
  var y_aux_1 = x1 * atividade_1 * P1sat / pressao;
  var y_aux_2 = x2 * atividade_2 * P2sat / pressao;
  var y_auxtotal = y_aux_1 + y_aux_2;
  var y = y_aux_1 / y_auxtotal;
  var excesso = entalpia_excesso;

  return [T1, y, excesso];

}

// Calcula a temperatura e o x para determinada condição de equilíbrio para misturas não ideais
function calculo_temp_nao_ideal_orvalho(y) {

  y1 = y;
  y2 = 1 - y;
  T1 = null;
  T1 = (y1 * T1sat) + (y2 * T2sat) + 273.15;

  P1sat = Math.exp(A1 - B1 / (T1 - 273.15 + C1));
  P2sat = Math.exp(A2 - B2 / (T1 - 273.15 + C2));
  x1 = y1 * pressao / P1sat;
  x2 = (1 - y1) * pressao / P2sat;
  xtotal = x1 + x2;
  x1 = x1 / xtotal;
  x2 = x2 / xtotal;

  adicionar_prop_criticas();

  do {

    // Chamada do método de atividade e normalização do valor de x
    chamar_metodo_atividade();

    x1 = y1 * pressao / (atividade_1 * P1sat);
    x2 = (1 - y1) * pressao / (atividade_2 * P2sat);

    xtotal = x1 + x2;
    x1 = x1 / xtotal;
    x2 = x2 / xtotal;

    P1aux = pressao / (x1 * atividade_1 + x2 * atividade_2 * P2sat / P1sat);
    T2 = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15;

    if (T1 > T2) {

      diferenca = T1 - T2;

    } else {

      diferenca = T2 - T1;

    }

    T1 = T2;

  } while (diferenca >= 0.001)

  P1sat = Math.exp(A1 - B1 / (T1 - 273.15 + C1));
  P2sat = Math.exp(A2 - B2 / (T1 - 273.15 + C2));
  x1 = y1 * pressao / (atividade_1 * P1sat);
  x2 = (1 - y1) * pressao / (atividade_2 * P2sat);
  xtotal = x1 + x2;
  x1 = x1 / xtotal;
  x2 = x2 / xtotal;

  var excesso = entalpia_excesso;

  return [T1, x1, excesso];

}

//Função de cálculo da curva de equilibrio líquido-vapor para misturas não ideais
function curva_eq_nao_ideal() {

  // Limpeza dos vetores
  yvolatil = [];
  var yvolatil_2 = [];
  xvolatil = [];
  H_excesso = [];
  T1_aux = [];
  aux_array = [];

  // Criação de um vetor de xvolatil de 0 a 1, com intervalos de 0.01
  xvolatil[0] = 0;

  for (i = 1; i < 101; i++) {

    xvolatil[i] = xvolatil[i - 1] + 0.01;

  }

  // Cálculo das temperaturas de saturação e localização da mistura no banco de dados dos métodos
  Antoine();
  localizar_mistura(componente1, componente2);

  // Cálculo do vetor yvolatil, seguindo o método iterativo Bolha T
  for (i = 0; i < xvolatil.length; i++) {

    aux_array = calculo_temp_nao_ideal_bolha(xvolatil[i]);

    T1_aux.push(aux_array[0]);
    yvolatil.push(aux_array[1]);
    H_excesso.push(aux_array[2]);

  }

  // Cálculo do máximo valor de x para o qual a mistura pode ser destilada devido à formação de azeótropos
  for (var i = 0; i < yvolatil.length; i++) {

    xmax = 1;

    if (yvolatil[i] <= xvolatil[i] && i != 0) {

      xmax = yvolatil[i - 1];
      break;

    }

  }

}

// Função de cálculo do McCabe-Thiele para misturas não ideais
function McCabe_nao_ideal() {

  // Limpeza de vetores
  x_degrau = [];
  y_degrau = [];

  xD = parseFloat(xD);
  xF = parseFloat(xF);
  xB = parseFloat(xB);

  // Cálculo de yF
  yF = calculo_temp_nao_ideal_bolha(xF)[1];

  // Cálculo da taxa de refluxo mínimo
  if ((xD - yF) / (xF - yF) > 0) {

    Rd_min = (xD - yF) / (xF - yF);

  } else {

    Rd_min = -1 * (xD - yF) / (xF - yF);

  }

  // Definição do valor mínimo do slider
  var slider_Rd = document.getElementById("range_element");
  slider_Rd.min = (Rd_min + 0.3).toFixed(1);
  step_slider = (slider_Rd.max - slider_Rd.min) / 100;
  slider_Rd.step = step_slider.toFixed(1);

  // Definição do Rd de acordo com valor do slider
  Rd = document.getElementById("range_element").value;
  Rd = parseFloat(Rd);

  // Cálculo de yK
  yK = (((Rd / (Rd + 1)) * xF) + (xD / (Rd + 1)));

  // Cálculo dos pratos para a seção de retificação
  x_degrau.push(xD);
  y_degrau.push(xD);
  x_aux = xD;
  y_aux = xD;

  do {

    y_degrau.push(y_aux);

    x1 = calculo_temp_nao_ideal_orvalho(y_aux)[1];

    x_aux = x1;
    x_degrau.push(x_aux);
    y_aux = ((Rd / (Rd + 1)) * x_aux) + (xD / (Rd + 1));
    x_degrau.push(x_aux);
    y_degrau.push(y_aux);

  } while (x_aux > xF)

  y_degrau.pop();
  y_degrau.push(((xB * (1 - (yK - xB) / (xF - xB))) + (((yK - xB) * x_aux) / (xF - xB))));
  y_aux = ((xB * (1 - (yK - xB) / (xF - xB))) + (((yK - xB) * x_aux) / (xF - xB)));

  // Cálculo dos pratos da seção de esgotamento
  do {

    y_degrau.push(y_aux);
    x1 = calculo_temp_nao_ideal_orvalho(y_aux)[1];

    x_aux = x1;
    x_degrau.push(x_aux);
    y_aux = ((xB * (1 - (yK - xB) / (xF - xB))) + (((yK - xB) * x_aux) / (xF - xB)));
    x_degrau.push(x_aux);
    y_degrau.push(y_aux);

  } while (x_aux > xB)

  y_degrau.pop();
  y_degrau.push(x_aux);

  // Resultados do número de pratos, prato de alimentação e composição de cada estágio
  separar_resultados();
  alterar_label();
  composicao_estagios();

}

// Funções de definição dos parâmetros de cálculo de entalpia residual
function Van_der_Waals(Tc_aux, T3) {

  // Definição dos parâmetros
  sigma = 0;
  epsilon = 0;
  omega = 1 / 8;
  psi = 27 / 64;
  alfa_Tr = 1;
  der_Tr = -27 / (8 * (T3 / Tc_aux));

}

function Redlich_Kwong(Tc_aux, T3) {

  // Definição dos parâmetros
  sigma = 1;
  epsilon = 0;
  omega = 0.08664;
  psi = 0.42748;
  alfa_Tr = 1 / Math.sqrt(T3 / Tc_aux);
  der_Tr = (psi / omega) * (-3 / 2) * Math.pow(T3 / Tc_aux, -3 / 2);

}

function Soave_Redlich_Kwong(Tc_aux, T3, w_aux) {

  // Definição dos parâmetros
  sigma = 1;
  epsilon = 0;
  omega = 0.08664;
  psi = 0.42748;
  var aux = 0.48 + 1.574 * w_aux - 0.176 * Math.pow(w_aux, 2);
  alfa_Tr = Math.pow(1 + aux * (1 - Math.sqrt(T3 / Tc_aux)), 2);
  der_Tr = -(psi / omega) * ((1 + aux * (1 - Math.sqrt(T3 / Tc_aux))) * aux * Math.pow(T3 / Tc_aux, -1 / 2) - Math.pow((1 + aux * (1 - Math.sqrt(T3 / Tc_aux))), 2) / (T3 / Tc_aux));

}

function Peng_Robinson(Tc_aux, T3, w_aux) {

  // Definição dos parâmetros
  sigma = 1 + Math.sqrt(2);
  epsilon = 1 - Math.sqrt(2);
  omega = 0.07780;
  psi = 0.45724;
  var aux = 0.37464 + 1.54226 * w_aux - 0.26992 * Math.pow(w_aux, 2);
  alfa_Tr = Math.pow(1 + aux * (1 - Math.sqrt(T3 / Tc_aux)), 2);
  der_Tr = -(psi / omega) * ((1 + aux * (1 - Math.sqrt(T3 / Tc_aux))) * aux * Math.pow(T3 / Tc_aux, -1 / 2) - Math.pow((1 + aux * (1 - Math.sqrt(T3 / Tc_aux))), 2) / (T3 / Tc_aux));

}

// Calcula a temperatura para determinada condição de equilíbrio para misturas ideais
function calculo_temp_ideal(x1) {

  // Cálculo da temperatura e y para misturas ideais
  P1sat = (pressao * alfa_medio) / (alfa_medio * x1 + 1 - x1);
  var T = x1 * (B1 / (A1 - Math.log(P1sat)) - C1) + (1 - x1) * (B2 / (A2 - Math.log(P1sat / alfa_medio)) - C2) + 273.15;
  var y1 = x1 * P1sat / pressao;

  return [T, y1];

}

// Cálcula as entalpias líquido e vapor para determinada condição ideal
function calculo_ent_ideais(T, x, y) {

  // Definição das variáveis
  x1 = x;
  y1 = y;
  var T_ref = 298.15;

  // Cálculo das entalpias (T é a temperatura de bolha no ponto x)
  var entalpia_l1 = (Cpl1_C1 * (T - T_ref) + Cpl1_C2 * Math.pow(T - T_ref, 2) / 2 + Cpl1_C3 * Math.pow(T - T_ref, 3) / 3 + Cpl1_C4 * Math.pow(T - T_ref, 4) / 4 + Cpl1_C5 * Math.pow(T - T_ref, 5) / 5) / 1000000;
  var entalpia_l2 = (Cpl2_C1 * (T - T_ref) + Cpl2_C2 * Math.pow(T - T_ref, 2) / 2 + Cpl2_C3 * Math.pow(T - T_ref, 3) / 3 + Cpl2_C4 * Math.pow(T - T_ref, 4) / 4 + Cpl2_C5 * Math.pow(T - T_ref, 5) / 5) / 1000000;
  entalpia_l = x1 * (entalpia_l1) + (1 - x1) * (entalpia_l2);

  var Tr_1 = T / (Tc_componente_1 + 273.15);
  var Tr_2 = T / (Tc_componente_2 + 273.15);

  if (Lat1_C1 != 0) {

    // Cálculo do calor de vaporização na temperatura T com base na equação e constantes espicificadas no Perry
    calor_vaporizacao_1 = Lat1_C1 * Math.pow((1 - (Tr_1)), Lat1_C2 + Lat1_C3 * Tr_1 + Lat1_C4 * Math.pow(Tr_1, 2)) / 1000000;

  } else {

    // Cálculo do calor de vaporização na temperatura T com base na equação de Daubert, também citada no Perry
    var Tr_aux = T_vap_1 / (Tc_componente_1 + 273.15);
    calor_vaporizacao_1 = delta_vaporizacao_1 * Math.pow(((1 - Tr_1) / (1 - Tr_aux)), 0.38);

  }

  if (Lat1_C2 != 0) {

    // Cálculo do calor de vaporização na temperatura T com base na equação e constantes espicificadas no Perry
    calor_vaporizacao_2 = Lat2_C1 * Math.pow((1 - (Tr_2)), Lat2_C2 + Lat2_C3 * Tr_2 + Lat2_C4 * Math.pow(Tr_2, 2)) / 1000000;

  } else {

    // Cálculo do calor de vaporização na temperatura T com base na equação de Daubert, também citada no Perry
    var Tr_aux = T_vap_2 / (Tc_componente_2 + 273.15);
    calor_vaporizacao_2 = delta_vaporizacao_2 * Math.pow(((1 - Tr_2) / (1 - Tr_aux)), 0.38);

  }

  var entalpia_g1 = entalpia_l1 + calor_vaporizacao_1;
  var entalpia_g2 = entalpia_l2 + calor_vaporizacao_2;
  entalpia_g = y1 * entalpia_g1 + (1 - y1) * entalpia_g2;

  return [entalpia_l, entalpia_g];

}

// Função que calcula os dados para plotar a curva de entalpia ideal da mistura
function curva_entalpia_ideal() {

  // Definição dos vetores de x e y variando de 0 a 1
  x_equilibrio = [];
  y_equilibrio = [];

  var aux = 0;
  for (var i = 0; i < 101; i = i + 1) {

    x_equilibrio.push(aux);
    y_equilibrio.push(aux);
    aux = aux + 0.01;

  }

  // Limpeza de variáveis
  entalpia_liquido = [];
  entalpia_vapor = [];
  var Cpl1_C1, Cpl1_C2, Cpl1_C3, Cpl1_C4, Cpl1_C5, Cpl2_C1, Cpl2_C2, Cpl2_C3, Cpl2_C4, Cpl2_C5;
  var Cpg1_C1, Cpg1_C2, Cpg1_C3, Cpg1_C4, Cpg1_C5, Cpg2_C1, Cpg2_C2, Cpg2_C3, Cpg2_C4, Cpg2_C5;
  var Lat1_C1, Lat1_C2, Lat1_C3, Lat1_C4, Lat2_C1, Lat2_C2, Lat2_C3, Lat2_C4, delta_vaporizacao_1, delta_vaporizacao_2, T_vap_1, T_vap_2;
  var w_componente_1, w_componente_2, Tc_componente_1, Tc_componente_2, Pc_componente_1, Pc_componente_2;

  // Adição de valores às variáveis a partir do banco de dados
  adicionar_prop_termodinamicas()

  adicionar_prop_criticas();

  // Cálculo da volatilidade média
  var marc = 0;
  var alfa_aux = 0;

  for (var i = 0; i < alfa_ideal.length; i++) {

    marc = marc + 1;
    alfa_aux += alfa_ideal[i];

  }

  alfa_medio = alfa_aux / marc;

  for (var i = 0; i < x_equilibrio.length; i++) {

    var aux_array = calculo_temp_ideal(x_equilibrio[i]);
    var T_aux = aux_array[0];
    var y_aux = aux_array[1];
    entalpia_liquido.push(calculo_ent_ideais(T_aux, x_equilibrio[i], y_aux)[0]);

  }

  for (var i = 0; i < y_equilibrio.length; i++) {

    var x_aux = y_equilibrio[i] / ((-y_equilibrio[i] * (alfa_medio - 1)) + alfa_medio);
    var T_aux = calculo_temp_ideal(x_aux)[0];
    entalpia_vapor.push(calculo_ent_ideais(T_aux, x_aux, y_equilibrio[i])[1]);

  }

}

// Cálcula as entalpias líquido e vapor para determinada condição não ideal
function calculo_ent_nao_ideais(y, T) {

  // Definição das variáveis
  y1 = y;
  y2 = 1 - y1;
  var Tc_aux = y1 * (Tc_componente_1 + 273.15) + (y2) * (Tc_componente_2 + 273.15);
  var Pc_aux = y1 * Pc_componente_1 + y2 * Pc_componente_2;
  var w_aux = y1 * w_componente_1 + y2 * w_componente_2;

  // Limpeza de variáveis
  sigma = null;
  epsilon = null;
  omega = null;
  psi = null;
  alfa_Tr = null;
  T3 = T;

  // Execução dos métodods de definição de parâmetros para cálculo da entalpia residua
  chamar_metodo_entalpia_residual(T3, Tc_aux, w_aux);

  var beta = (omega * (101.325 / Pc_aux)) / (T3 / Tc_aux);
  var q = (psi * alfa_Tr) / (omega * (T3 / Tc_aux));
  var aux = 0.01;
  var z = null;
  var z_aux;

  for (var j = 0; j < 10; j = j + 0.0001) {

    z_aux = 1 + beta - q * beta * (j - beta) / ((j + epsilon * beta) * (j + sigma * beta))
    diferenca_2 = z_aux - j;

    if (Math.abs(diferenca_2) < 0.001) {

      if (Math.abs(diferenca_2) < aux) {

        aux = Math.abs(diferenca_2);
        z = z_aux;

      }

    }

  }

  var I = beta / (z + epsilon * beta);

  // Cálculo da entalpia residual
  residual = 0.0041868 * (z - 1 + der_Tr * I) * 1.9872 * T3;

  return residual;

}

// Função que calcula os dados para plotar a curva de entalpia não ideal da mistura
function curva_entalpia_nao_ideal() {

  // Definição dos vetores de x e y variando de 0 a 1
  x_equilibrio = [];
  y_equilibrio = [];

  var aux = 0;
  for (var i = 0; i < 101; i = i + 1) {

    x_equilibrio.push(aux);
    y_equilibrio.push(aux);
    aux = aux + 0.01;

  }

  // Limpeza de variáveis
  entalpia_liquido = [];
  entalpia_vapor = [];
  H_residual = [];
  var Cpl1_C1, Cpl1_C2, Cpl1_C3, Cpl1_C4, Cpl1_C5, Cpl2_C1, Cpl2_C2, Cpl2_C3, Cpl2_C4, Cpl2_C5;
  var Cpg1_C1, Cpg1_C2, Cpg1_C3, Cpg1_C4, Cpg1_C5, Cpg2_C1, Cpg2_C2, Cpg2_C3, Cpg2_C4, Cpg2_C5;
  var Lat1_C1, Lat1_C2, Lat1_C3, Lat1_C4, Lat2_C1, Lat2_C2, Lat2_C3, Lat2_C4, delta_vaporizacao_1, delta_vaporizacao_2, T_vap_1, T_vap_2;
  var w_componente_1, w_componente_2, Tc_componente_1, Tc_componente_2, Pc_componente_1, Pc_componente_2;

  // Pega valores de propriedades termodinâmicas do banco de dados
  adicionar_prop_termodinamicas();
  // Pega valores de propriedades críticas do banco de dados
  adicionar_prop_criticas();

  // Definição das entalpias para líquido e vapor não ideais
  for (var i = 0; i < x_equilibrio.length; i++) {

    var aux_array = [];
    aux_array = calculo_temp_nao_ideal_bolha(x_equilibrio[i]);
    var T_aux = aux_array[0];
    var y_aux = aux_array[1];
    var excesso = aux_array[2];

    entalpia_liquido.push(calculo_ent_ideais(T_aux, x_equilibrio[i], y_aux)[0] + excesso);

  }

  for (var i = 0; i < y_equilibrio.length; i++) {

    var aux_array = [];
    aux_array = calculo_temp_nao_ideal_orvalho(y_equilibrio[i]);
    var T_aux = aux_array[0];
    var x_aux = aux_array[1];
    var residual = calculo_ent_nao_ideais(y_equilibrio[i], T_aux);

    entalpia_vapor.push(calculo_ent_ideais(T_aux, x_aux, y_equilibrio[i])[1] + residual);

  }

}

// Função que cálcula as retas e degraus pelo método de Ponchon-Savarit
function Ponchon_Savarit() {

  var Cpl1_C1, Cpl1_C2, Cpl1_C3, Cpl1_C4, Cpl1_C5, Cpl2_C1, Cpl2_C2, Cpl2_C3, Cpl2_C4, Cpl2_C5;
  var Cpg1_C1, Cpg1_C2, Cpg1_C3, Cpg1_C4, Cpg1_C5, Cpg2_C1, Cpg2_C2, Cpg2_C3, Cpg2_C4, Cpg2_C5;
  var Lat1_C1, Lat1_C2, Lat1_C3, Lat1_C4, Lat2_C1, Lat2_C2, Lat2_C3, Lat2_C4, delta_vaporizacao_1, delta_vaporizacao_2, T_vap_1, T_vap_2;
  var w_componente_1, w_componente_2, Tc_componente_1, Tc_componente_2, Pc_componente_1, Pc_componente_2;

  // Pega valores de propriedades termodinâmicas do banco de dados
  adicionar_prop_termodinamicas();
  // Pega valores de propriedades críticas do banco de dados
  adicionar_prop_criticas();


  // Definição das composições e limpeza de variáveis
  xD = parseFloat(xD);
  xF = parseFloat(xF);
  xB = parseFloat(xB);
  hB = null;
  hD = null;
  hF = null;
  qcD = null;
  qcB = null;
  Tf = null;
  Td = null;
  Tb = null;
  yF = null;
  yB = null;

  // Cálculo da volatilidade média
  var marc = 0;
  var alfa_aux = 0;

  for (var i = 0; i < alfa_ideal.length; i++) {

    marc = marc + 1;
    alfa_aux += alfa_ideal[i];

  }

  alfa_medio = alfa_aux / marc;

  if (tipo_mistura == "Mistura Ideal") {

    // Cálculo dos valores de y e entalpias de correntes de topo, fundo e alimentação
    var entalpia_alimentacao_l, entalpia_alimentacao_g, Tf, Tb, Td, yF, yD, yB;

    var aux_array_1 = [];
    aux_array_1 = calculo_temp_ideal(xF);
    Tf = aux_array_1[0];
    yF = aux_array_1[1];

    var aux_array_1 = [];
    aux_array_1 = calculo_temp_ideal(xD);
    Td = aux_array_1[0];
    yD = aux_array_1[1];

    var aux_array_1 = [];
    aux_array_1 = calculo_temp_ideal(xB);
    Tb = aux_array_1[0];
    yB = aux_array_1[1];

    var aux_array_1 = [];
    aux_array_1 = calculo_ent_ideais(Tf, xF, yF);
    var entalpia_alim_l = aux_array_1[0];
    var entalpia_alim_g = aux_array_1[1];

    var aux_array_1 = [];
    // calculando o x para o ponto yD = xD
    x_aux = xD / ((-xD * (alfa_medio - 1)) + alfa_medio);
    var entalpia_topo_l = calculo_ent_ideais(Td, xD, xD)[0];
    var entalpia_topo_g = calculo_ent_ideais(Td, x_aux, xD)[1];

    var aux_array_1 = [];
    aux_array_1 = calculo_ent_ideais(Tb, xB, yB);
    var entalpia_fundo_l = aux_array_1[0];
    var entalpia_fundo_g = aux_array_1[1];

  } else if (tipo_mistura == "Mistura Não Ideal") {

    // Cálculo dos valores de y e entalpias de correntes de topo, fundo e alimentação
    var entalpia_alimentacao_l, entalpia_alimentacao_g, Tf, Tb, Td, yF, yD, yB;

    // Cálculo das temperaturas para misturas não ideais
    var aux_array_1 = [];
    aux_array_1 = calculo_temp_nao_ideal_bolha(xF);
    Tf = aux_array_1[0];
    yF = aux_array_1[1];

    var aux_array_2 = [];
    aux_array_2 = calculo_temp_nao_ideal_bolha(xD);
    Td = aux_array_2[0];
    yD = xD;

    var aux_array_3 = [];
    aux_array_3 = calculo_temp_nao_ideal_bolha(xB);
    Tb = aux_array_3[0];
    yB = aux_array_3[1];

    // Adição das entalpias em excesso e residuais nas entalpias calculadas para misturas ideais
    var aux_array_4 = calculo_ent_ideais(Tf, xF, yF);
    var entalpia_alim_l = aux_array_4[0] + aux_array_1[2];
    var entalpia_alim_g = aux_array_4[1] + calculo_ent_nao_ideais(yF, Tf);

    var aux_array_4 = calculo_ent_ideais(Td, xD, xD);
    var entalpia_topo_l = aux_array_4[0] + aux_array_2[2];
    var entalpia_topo_g = aux_array_4[1] + calculo_ent_nao_ideais(xD, Td);

    var aux_array_4 = calculo_ent_ideais(Tb, xB, yB);
    var entalpia_fundo_l = aux_array_4[0] + aux_array_3[2];
    var entalpia_fundo_g = aux_array_4[1] + calculo_ent_nao_ideais(yB, Tb);

  }

  // Com a definição da linha de amarração que passa por xF, pode-se obter a taxa de refluxo mínima abaixo
  var inclinacao_min = (entalpia_alim_g - entalpia_alim_l) / (yF - xF);
  var coef_linear_min = entalpia_alim_l - inclinacao_min * xF;
  y_qc_min = inclinacao_min * xD + coef_linear_min;
  y_qr_min = inclinacao_min * xB + coef_linear_min;
  var Rd_min = (y_qc_min - entalpia_topo_g) / (entalpia_topo_g - entalpia_topo_l);

  // Definição do valor mínimo do slider
  var slider_Rd = document.getElementById("range_element");
  slider_Rd.min = (Rd_min + 0.3).toFixed(1);
  step_slider = (slider_Rd.max - slider_Rd.min) / 100;
  slider_Rd.step = step_slider.toFixed(1);

  // Definição do valor de Rd
  Rd = document.getElementById("range_element").value;
  Rd = parseFloat(Rd);

  // Cálculo do calor do condensador
  qcD = Math.abs((Rd + 1) * (entalpia_topo_g - entalpia_topo_l));

  // Definição da reta de alimentação e do calor do refervedor
  var inclinacao = (entalpia_topo_l + qcD - entalpia_alim_l) / (xD - xF);
  var coef_linear = entalpia_topo_l + qcD - inclinacao * xD;
  var hB_qcB = inclinacao * xB + coef_linear;
  qcB = entalpia_fundo_l - hB_qcB;

  // Estabeleimento dos valores globais de entalpia
  hB = entalpia_fundo_l;
  hD = entalpia_topo_l;
  hF = entalpia_alim_l;

  // Variáveis referentes aos degraus e cálculos dos pratos
  x_degrau_r = [];
  y_degrau_r = [];
  x_degrau_e = [];
  y_degrau_e = [];
  reta_amarracao = [];
  var x_aux, y_aux, T_aux, P1sat_aux, P2sat_aux, hn, Hn, xn, H_vap;

  // Definindo que o yD equivale ao xD no primeiro ponto dos degraus. x representará os pontos x,y e y representará a entalpia

  if (tipo_mistura == "Mistura Ideal") {

    // Cálculo dos pratos para a seção de retificação
    y_aux = xD;
    x_aux = y_aux / ((-y_aux * (alfa_medio - 1)) + alfa_medio);

    do {

      T_aux = calculo_temp_ideal(x_aux)[0];
      Hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[1];
      hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[0];
      reta_amarracao.push([y_aux, Hn], [x_aux, hn]);
      x_degrau_r.push(xD);
      y_degrau_r.push(hD + qcD);
      x_degrau_r.push(x_aux);
      y_degrau_r.push(hn);
      xn = x_aux;

      do {

        H_vap = calculo_ent_ideais(T_aux, x_aux, y_aux)[1];
        Hn = H_vap;
        var y = (Hn - (hn - xn * (hD + qcD - hn) / (xD - xn))) / ((hD + qcD - hn) / (xD - xn));
        diferenca = Math.abs(y - y_aux)
        y_aux = y;

      } while (diferenca > 0.01)

      x_aux = y_aux / ((-y_aux * (alfa_medio - 1)) + alfa_medio);

    } while (x_aux > xF)

    T_aux = calculo_temp_ideal(x_aux)[0];
    hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[0];
    reta_amarracao.push([y_aux, Hn], [x_aux, hn])

    do {

      T_aux = calculo_temp_ideal(x_aux)[0];
      hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[0];
      xn = x_aux;

      do {

        H_vap = calculo_ent_ideais(T_aux, x_aux, y_aux)[1];
        Hn = H_vap;
        var y = (Hn - (hn - xn * (hn - hB + qcB) / (xn - xB))) / ((hn - hB + qcB) / (xn - xB));
        diferenca = Math.abs(y - y_aux);
        y_aux = y;

      } while (diferenca > 0.01)

      x_aux = y_aux / ((-y_aux * (alfa_medio - 1)) + alfa_medio);
      Hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[1];
      x_degrau_e.push(y_aux);
      y_degrau_e.push(Hn);
      x_degrau_e.push(xB);
      y_degrau_e.push(hB - qcB);
      reta_amarracao.push([y_aux, Hn], [x_aux, hn]);

    } while (x_aux >= xB);

  } else if (tipo_mistura == "Mistura Não Ideal") {

    // Cálculo dos pratos para a seção de retificação
    y_aux = xD;
    var aux_array_1 = calculo_temp_nao_ideal_orvalho(y_aux);
    x_aux = aux_array_1[1];
    T_aux = aux_array_1[0];

    do {

      var aux_array_0 = calculo_ent_ideais(T_aux, x_aux, y_aux);

      Hn = aux_array_0[1] + calculo_ent_nao_ideais(y_aux, T_aux);
      hn = aux_array_0[0] + aux_array_1[2];
      reta_amarracao.push([y_aux, Hn], [x_aux, hn]);
      x_degrau_r.push(xD);
      y_degrau_r.push(hD + qcD);
      x_degrau_r.push(x_aux);
      y_degrau_r.push(hn);
      xn = x_aux;

      do {

        H_vap = calculo_ent_ideais(T_aux, x_aux, y_aux)[1] + calculo_ent_nao_ideais(y_aux, T_aux);
        Hn = H_vap;
        var y = (Hn - (hn - xn * (hD + qcD - hn) / (xD - xn))) / ((hD + qcD - hn) / (xD - xn));
        diferenca = Math.abs(y - y_aux)
        y_aux = y;

      } while (diferenca > 0.01)

      var aux_array_1 = calculo_temp_nao_ideal_orvalho(y_aux);
      T_aux = aux_array_1[0];
      x_aux = aux_array_1[1];

    } while (x_aux > xF)

    var aux_array_0 = calculo_temp_nao_ideal_orvalho(y_aux);
    T_aux = aux_array_0[0];
    hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[0] + aux_array_0[2];
    reta_amarracao.push([y_aux, Hn], [x_aux, hn])

    do {

      var aux_array_0 = calculo_temp_nao_ideal_orvalho(y_aux);
      T_aux = aux_array_0[0];
      hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[0] + aux_array_0[2];
      xn = x_aux;

      do {

        H_vap = calculo_ent_ideais(T_aux, x_aux, y_aux)[1] + calculo_ent_nao_ideais(y_aux, T_aux);
        Hn = H_vap;
        var y = (Hn - (hn - xn * (hn - hB + qcB) / (xn - xB))) / ((hn - hB + qcB) / (xn - xB));
        diferenca = Math.abs(y - y_aux);
        // console.log(y_aux, y)
        y_aux = y;

      } while (diferenca > 0.01)

      var aux_array_0 = calculo_temp_nao_ideal_orvalho(y_aux);
      T_aux = aux_array_0[0];
      x_aux = aux_array_0[1];
      hn = calculo_ent_ideais(T_aux, x_aux, y_aux)[0] + aux_array_0[2];
      Hn = H_vap;
      x_degrau_e.push(y_aux);
      y_degrau_e.push(Hn);
      x_degrau_e.push(xB);
      y_degrau_e.push(hB - qcB);
      reta_amarracao.push([y_aux, Hn], [x_aux, hn]);

    } while (x_aux >= xB);

  }

}

// Muda o chart de acordo com mudança no slider
function change_chart() {

  // Mudar chart de acordo com Rd selecionado no slider
  Rd = document.getElementById("range_element").value;

  if (metodo_grafico == "McCabe-Thiele") {

    if (tipo_mistura == "Mistura Ideal") {

      McCabe_Ideal();

    } else if (tipo_mistura == "Mistura Não Ideal") {

      McCabe_nao_ideal();

    }

    // Desabilitar animação do chart
    gerar_grafico_McCabe(0);

  } else if (metodo_grafico == "Ponchon-Savarit") {

    Ponchon_Savarit();
    // Desabilitar animação do chart
    gerar_grafico_Ponchon(0);

  }

}

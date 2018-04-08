// Função de cálculo das temperaturas saturadas e vetor de temperaturas
function Antoine() {

  calcular_compvolatil();

  temperaturas = []

  for (i = 0; i <= 100; i++) {
    temperaturas.push(T1sat + i * (T2sat - T1sat) / 100);
  }

  if (T2sat - T1sat > 50) {
    alert("O método de McCabe-Thiele não se adequa a essa mistura. Sugere-se o uso do método de Ponchon-Savarit");
  }

}

// Funções de cálculo de coeficientes de atividade para cada método não ideal
function Van_Laar() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = [];
  A21 = [];
  A12 = data.vl_A12[j1];
  A21 = data.vl_A21[j1];

  // Cálculo das atividades
  atividade1 = Math.exp(A12 * Math.pow(((A21 * x2) / (A12 * x1 + A21 * x2)), 2));
  atividade2 = Math.exp(A21 * Math.pow(((A12 * x1) / (A12 * x1 + A21 * x2)), 2));

}

function NRTL() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = [];
  A21 = [];
  A12 = data.NRTL_A12[j2];
  A21 = data.NRTL_A21[j2];
  alfa = data.NRTL_alfa[j2];
  tau12 = A12 / (1.9872 * T1);
  tau21 = A21 / (1.9872 * T1);
  g12 = Math.exp(-alfa * tau12);
  g21 = Math.exp(-alfa * tau21);

  // Cálculo das atividades
  atividade1 = Math.exp(Math.pow(x2, 2) * (tau21 * Math.pow(g21 / (x1 + x2 * g21), 2) + tau12 * g12 / Math.pow(x2 + x1 * g12, 2)), 2);
  atividade2 = Math.exp(Math.pow(x1, 2) * (tau12 * Math.pow(g12 / (x2 + x1 * g12), 2) + tau21 * g21 / Math.pow(x1 + x2 * g21, 2)), 2);

}

function Wilson() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = [];
  A21 = [];
  A12 = data.Wilson_A12[j3];
  A21 = data.Wilson_A21[j3];

  for (var k = 0; k < data.componentes.length; k++) {

    if (data.componentes[k] == componente1) {
      w_componente1 = data.prop_w[k];
      Pc_componente1 = data.prop_Pc[k];
      Tc_componente1 = data.prop_Tc[k];
    }

    if (data.componentes[k] == componente2) {
      w_componente2 = data.prop_w[k];
      Pc_componente2 = data.prop_Pc[k];
      Tc_componente2 = data.prop_Tc[k];
    }

  }

  zra1 = 0.29056 - 0.08775 * w_componente1;
  Tr1 = T1 / (Tc_componente1 + 273.15);
  V1 = (8.314 * (Tc_componente1 + 273.15) / Pc_componente1) * Math.pow(zra1, (1 + Math.pow(1 - Tr1, 2 / 7)));
  zra2 = 0.29056 - 0.08775 * w_componente2;
  Tr2 = T1 / (Tc_componente2 + 273.15);
  V2 = (8.314 * (Tc_componente2 + 273.15) / Pc_componente2) * Math.pow(zra2, (1 + Math.pow(1 - Tr2, 2 / 7)));
  tau12 = (V2 / V1) * Math.exp(-A12 / (1.9872 * T1));
  tau21 = (V1 / V2) * Math.exp(-A21 / (1.9872 * T1));

  // Cálculo das atividades
  ln_atividade1 = -Math.log(x1 + tau12 * x2) + x2 * (tau12 / (x1 + tau12 * x2) - tau21 / (x2 + x1 * tau21));
  atividade1 = Math.exp(ln_atividade1);
  ln_atividade2 = -Math.log(x2 + tau21 * x1) - x1 * (tau12 / (x1 + tau12 * x2) - tau21 / (x2 + x1 * tau21));
  atividade2 = Math.exp(ln_atividade2);

}

function UNIFAC_propriedades() {

  // Limpeza e criação dos vetores utilizados

  var grupos_comp1 = Array(),
    grupos_comp2 = Array(),
    id_1 = Array(),
    id_2 = Array(),
    indice = Array(),
    qtd_comp1 = Array(),
    qtd_comp2 = Array(),
    indice_comp1 = Array(),
    indice_comp2 = Array(),
    Rk_comp1 = Array(),
    Rk_comp2 = Array(),
    Qk_comp1 = Array(),
    Qk_comp2 = Array();
  ek1 = [];
  ek2 = [];
  id1 = [];
  p_interacao = [];


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
    grupos_comp1.push(g11);
    qtd_comp1.push(qtd11);
  }
  if (g12 != "") {
    grupos_comp1.push(g12);
    qtd_comp1.push(qtd12);
  }
  if (g13 != "") {
    grupos_comp1.push(g13);
    qtd_comp1.push(qtd13);
  }

  if (g21 != "") {
    grupos_comp2.push(g21);
    qtd_comp2.push(qtd21);
  }
  if (g22 != "") {
    grupos_comp2.push(g22);
    qtd_comp2.push(qtd22);
  }
  if (g23 != "") {
    grupos_comp2.push(g23);
    qtd_comp2.push(qtd23);
  }

  // Início da coleta de propriedades de cada componente/grupo segundo o método UNIFAC
  for (var m = 0; m < data.grupos_UNIFAC.length; m++) {

    for (var n = 0; n < grupos_comp1.length; n++) {
      if (data.grupos_UNIFAC[m] == grupos_comp1[n]) {
        indice_comp1[n] = data.indice_grupos_UNIFAC[m];
        Rk_comp1[n] = data.UNIFAC_Rk[m];
        Qk_comp1[n] = data.UNIFAC_Qk[m];
      }
    }

    for (var n = 0; n < grupos_comp2.length; n++) {
      if (data.grupos_UNIFAC[m] == grupos_comp2[n]) {
        indice_comp2[n] = data.indice_grupos_UNIFAC[m];
        Rk_comp2[n] = data.UNIFAC_Rk[m];
        Qk_comp2[n] = data.UNIFAC_Qk[m];
      }
    }

  }

  rk1_total = 0;
  qk1_total = 0;
  for (var i = 0; i < Rk_comp1.length; i++) {
    rk1_total = rk1_total + qtd_comp1[i] * Rk_comp1[i];
    qk1_total = qk1_total + qtd_comp1[i] * Qk_comp1[i];
  }

  rk2_total = 0;
  qk2_total = 0;
  for (var i = 0; i < Rk_comp2.length; i++) {
    rk2_total = rk2_total + qtd_comp2[i] * Rk_comp2[i];
    qk2_total = qk2_total + qtd_comp2[i] * Qk_comp2[i];
  }

  for (var i = 0; i < indice_comp1.length; i++) {

    id1.push(indice_comp1[i]);

  }

  for (var i = 0; i < indice_comp2.length; i++) {

    id1.push(indice_comp2[i]);

  }

  for (var i = 0; i < Qk_comp1.length; i++) {
    ek1[i] = Qk_comp1[i] * qtd_comp1[i] / qk1_total;
  }

  for (var i = 0; i < id1.length; i++) {
    for (var j = 0; j < indice_comp1.length; j++) {
      if (id1[i] == indice_comp1[j]) {
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
  for (var i = 0; i < Qk_comp2.length; i++) {
    ek2[i] = Qk_comp2[i] * qtd_comp2[i] / qk2_total;
  }

  for (var i = 0; i < id1.length; i++) {
    for (var j = 0; j < indice_comp2.length; j++) {
      if (id1[i] == indice_comp2[j]) {
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
  var bk1 = Array(),
    bk2 = Array(),
    Sk = Array(),
    Tetak = Array(),
    Tm = Array();

  // Início da parte iterativa do método UNIFAC
  J1 = (rk1_total / ((rk1_total * x1) + (rk2_total * x2)));
  J2 = (rk2_total / ((rk1_total * x1) + (rk2_total * x2)));
  L1 = (qk1_total / ((qk1_total * x1) + (qk2_total * x2)));
  L2 = (qk2_total / ((qk1_total * x1) + (qk2_total * x2)));
  ln_AtivC1 = 1 - J1 + Math.log(J1) - 5 * qk1_total * (1 - (J1 / L1) + Math.log(J1 / L1));
  ln_AtivC2 = 1 - J2 + Math.log(J2) - 5 * qk2_total * (1 - (J2 / L2) + Math.log(J2 / L2));

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

  ln_AtivR1 = qk1_total;
  ln_AtivR2 = qk2_total;

  for (var i = 0; i < bk1.length; i++) {

    ln_AtivR1 += -qk1_total * ((Tetak[i] * (bk1[i] / Sk[i])) - ek1[i] * Math.log(bk1[i] / Sk[i]));
    ln_AtivR2 += -qk2_total * (Tetak[i] * (bk2[i] / Sk[i]) - ek2[i] * Math.log(bk2[i] / Sk[i]));

  }

  atividade1 = Math.exp(ln_AtivC1 + ln_AtivR1);
  atividade2 = Math.exp(ln_AtivC2 + ln_AtivR2);

}

//Função de cálculo da curva de equilibrio líquido-vapor para misturas ideais
function curvaeq_ideal() {

  //Definição das constantes de Antoine para cada componente de acordo com o banco de dados
  Antoine()

  var P1sat = Array(),
    P2sat = Array();

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

//Função de cálculo da curva de equilibrio líquido-vapor para misturas não ideais
function curvaeq_naoideal() {

  // Limpeza dos vetores
  yvolatil = [];
  yvolatil_2 = [];
  xvolatil = [];

  // Criação de um vetor de xvolatil de 0 a 1, com intervalos de 0.01
  xvolatil[0] = 0
  for (i = 1; i < 101; i++) {
    xvolatil[i] = xvolatil[i - 1] + 0.01;
  }

  // Cálculo das temperaturas de saturação e localização da mistura no banco de dados dos métodos
  Antoine();

  // Cálculo do vetor yvolatil, seguindo o método iterativo Bolha T
  for (i = 0; i < xvolatil.length; i++) {

    T1 = xvolatil[i] * T1sat + (1 - xvolatil[i]) * T2sat + 273.15;
    P1sat = Math.exp(A1 - B1 / ((T1 - 273.15) + C1));
    P2sat = Math.exp(A2 - B2 / ((T1 - 273.15) + C2));
    x1 = xvolatil[i];
    x2 = 1 - x1;

    localizar_mistura(componente1, componente2);

    do {

      chamar_metodo_atividade()

      P1aux = pressao / (x1 * atividade1 + x2 * atividade2 * P2sat / P1sat);
      T2 = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15;

      if (T1 > T2) {
        diferenca = T1 - T2;
      } else {
        diferenca = T2 - T1;
      }

      T1 = T2;

    } while (diferenca >= 0.001)

    yvolatil.push(xvolatil[i] * atividade1 * P1sat / pressao);
    yvolatil_2.push((1 - xvolatil[i]) * atividade2 * P2sat / pressao);
    ytotal = yvolatil[i] + yvolatil_2[i];
    yvolatil[i] = yvolatil[i] / ytotal;
    yvolatil_2[i] = yvolatil_2[i] / ytotal;

  }

  for (var i = 0; i < yvolatil.length; i++) {

    xmax = 1;
    if (yvolatil[i] <= xvolatil[i] && i != 0) {
      xmax = yvolatil[i - 1];
      break;
    }

  }

}

// Função de cálculo do McCabe-Thiele para misturas ideais
function McCabe_Ideal() {

  // Limpeza de vetores
  x_degrau = [];
  y_degrau = [];

  xD = parseFloat(xD)
  xF = parseFloat(xF)
  xB = parseFloat(xB)

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
  slider_Rd.min = (Rd_min + 0.2).toFixed(1);
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

// Função de cálculo do McCabe-Thiele para misturas não ideais
function McCabe_NIdeal() {

  // Limpeza de vetores
  x_degrau = [];
  y_degrau = [];

  xD = parseFloat(xD)
  xF = parseFloat(xF)
  xB = parseFloat(xB)
  x1 = xF;
  x2 = 1 - xF;

  T1 = x1 * T1sat + x2 * T2sat + 273.15;
  P1sat = Math.exp(A1 - B1 / ((T1 - 273.15) + C1));
  P2sat = Math.exp(A2 - B2 / ((T1 - 273.15) + C2));

  // Cálculo de yF e yK
  do {

    chamar_metodo_atividade();

    P1aux = pressao / (x1 * atividade1 + x2 * atividade2 * P2sat / P1sat);

    T2 = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15;

    if (T1 > T2) {
      diferenca = T1 - T2;
    } else {
      diferenca = T2 - T1;
    }

    T1 = T2;



  } while (diferenca >= 0.001)

  yF_aux1 = x1 * atividade1 * P1sat / pressao;
  yF_aux2 = x2 * atividade2 * P2sat / pressao;
  yF_auxtotal = yF_aux1 + yF_aux2;
  yF = yF_aux1 / yF_auxtotal;

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

  Rd = document.getElementById("range_element").value;
  Rd = parseFloat(Rd);

  yK = (((Rd / (Rd + 1)) * xF) + (xD / (Rd + 1)));

  // Cálculo dos pratos para a seção de retificação
  x_degrau.push(xD);
  y_degrau.push(xD);
  x_aux = xD;
  y_aux = xD;
  T1 = (y_aux * T1sat) + ((1 - y_aux) * T2sat) + 273.15;
  atividade1 = 1;
  atividade2 = 1;

  do {
    y_degrau.push(y_aux);
    P1sat = Math.exp(A1 - B1 / (T1 - 273.15 + C1));
    P2sat = Math.exp(A2 - B2 / (T1 - 273.15 + C2));
    x1 = y_aux * pressao / (atividade1 * P1sat);
    x2 = (1 - y_aux) * pressao / (atividade2 * P2sat);
    xtotal = x1 + x2;
    x1 = x1 / xtotal;
    x2 = x2 / xtotal;

    do {

      // Chamada do método de atividade e normalização do valor de x
      chamar_metodo_atividade();
      x1 = y_aux * pressao / (atividade1 * P1sat);
      x2 = (1 - y_aux) * pressao / (atividade2 * P2sat);
      xtotal = x1 + x2;
      x1 = x1 / xtotal;
      x2 = x2 / xtotal;

      P1aux = pressao / (x1 * atividade1 + x2 * atividade2 * P2sat / P1sat);
      T2 = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15;

      if (T1 > T2) {
        diferenca = T1 - T2;
      } else {
        diferenca = T2 - T1;
      }

      T1 = T2;

    } while (diferenca >= 0.001)

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
    P1sat = Math.exp(A1 - B1 / (T1 - 273.15 + C1));
    P2sat = Math.exp(A2 - B2 / (T1 - 273.15 + C2));
    x1 = y_aux * pressao / (atividade1 * P1sat);
    x2 = (1 - y_aux) * pressao / (atividade2 * P2sat);
    xtotal = x1 + x2;
    x1 = x1 / xtotal;
    x2 = x2 / xtotal;

    do {

      // Chamada do método de atividade e normalização do valor de x
      chamar_metodo_atividade();
      x1 = y_aux * pressao / (atividade1 * P1sat);
      x2 = (1 - y_aux) * pressao / (atividade2 * P2sat);
      xtotal = x1 + x2;
      x1 = x1 / xtotal;
      x2 = x2 / xtotal;

      P1aux = pressao / (x1 * atividade1 + x2 * atividade2 * P2sat / P1sat);
      T2 = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15;

      if (T1 > T2) {
        diferenca = T1 - T2;
      } else {
        diferenca = T2 - T1;
      }

      T1 = T2;

    } while (diferenca >= 0.001)

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

function change_chart() {

  // Mudar chart de acordo com Rd selecionado no slider
  Rd = document.getElementById("range_element").value;

  if (tipo_mistura == "Mistura Ideal") {

    McCabe_Ideal();

  } else if (tipo_mistura == "Mistura Não Ideal") {

    McCabe_NIdeal();

  }

  // Desabilitar animação do chart
  gerar_grafico(0);

}

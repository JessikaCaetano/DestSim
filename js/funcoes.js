// Função de adição dos componentes à caixa de rolagem do componete 1
function add_comp1() {

  // Limpeza do vetor dos métodos de atividade e adição dos componentes às barras de rolagem
  metodos_atividade = []
  componente1 = data.componentes[document.getElementById("select_componentes").value]
  componente2 = data.componentes[document.getElementById("select_componentes2").value]

  j6 = -1
  j7 = -1
  j8 = -1

  // Organização dos componentes de acordo com o banco de dados de misturas de cada método não ideal
  for (i = 0; i < data.misturas_vl.length; i++) {

    if (data.misturas_vl[i] == componente1 + " e " + componente2) {
      j6 = i
    } else if (data.misturas_vl[i] == componente2 + " e " + componente1) {
      j6 = i
    }

  }

  for (i = 0; i < data.misturas_NRTL.length; i++) {

    if (data.misturas_NRTL[i] == componente1 + " e " + componente2) {
      j7 = i
    } else if (data.misturas_NRTL[i] == componente2 + " e " + componente1) {
      j7 = i
    }

  }

  for (i = 0; i < data.misturas_Wilson.length; i++) {

    if (data.misturas_Wilson[i] == componente1 + " e " + componente2) {
      j8 = i
    } else if (data.misturas_Wilson[i] == componente2 + " e " + componente1) {
      j8 = i
    }

  }

  // Determinação dos métodos disponíveis para cada mistura
  if (j6 >= 0) {
    metodos_atividade.push("Van Laar")
  }
  if (j7 >= 0) {
    metodos_atividade.push("NRTL")
  }
  if (j8 >= 0) {
    metodos_atividade.push("Wilson")
  }
  metodos_atividade.push("UNIFAC")

  add_atividade()

}

// Função de adição dos componentes à caixa de rolagem do componete 2
function add_comp2() {

  // limpeza do vetor dos métodos de atividade e adição dos componentes às barras de rolagem
  metodos_atividade = []
  j6 = -1
  j7 = -1
  j8 = -1

  componente1 = data.componentes[document.getElementById("select_componentes").value]
  componente2 = data.componentes[document.getElementById("select_componentes2").value]

  // Organização dos componentes de acordo com o banco de dados de misturas de cada método não ideal
  for (i = 0; i < data.misturas_vl.length; i++) {

    if (data.misturas_vl[i] == componente1 + " e " + componente2) {
      j6 = i
    } else if (data.misturas_vl[i] == componente2 + " e " + componente1) {
      j6 = i
    }

  }

  for (i = 0; i < data.misturas_NRTL.length; i++) {

    if (data.misturas_NRTL[i] == componente1 + " e " + componente2) {
      j7 = i
    } else if (data.misturas_NRTL[i] == componente2 + " e " + componente1) {
      j7 = i
    }

  }

  for (i = 0; i < data.misturas_Wilson.length; i++) {

    if (data.misturas_Wilson[i] == componente1 + " e " + componente2) {
      j8 = i
    } else if (data.misturas_Wilson[i] == componente2 + " e " + componente1) {
      j8 = i
    }

  }

  // Determinação dos métodos disponíveis para cada mistura
  if (j6 >= 0) {
    metodos_atividade.push("Van Laar")
  }
  if (j7 >= 0) {
    metodos_atividade.push("NRTL")
  }
  if (j8 >= 0) {
    metodos_atividade.push("Wilson")
  }
  metodos_atividade.push("UNIFAC")

  add_atividade()

}

// Função de adição dos métodos de cálculo de atividade à caixa de rolagem
function add_atividade() {

  // Limpeza da div que contém os métodos de atividade criação de um novo elemento select
  $("#div_select").empty();
  novo_select = document.createElement("select")
  novo_select.setAttribute("id", "novo_select");
  div_select.appendChild(novo_select);

  // Adição dos métodos disponíveis ao novo elemento select criado
  var opt = document.createElement("option")
  opt.value = 0;
  opt.text = 'Escolha uma opção';
  opt.selected = 'selected'
  opt.disabled = 'disabled'
  novo_select.add(opt, novo_select.options[0])
  for (i = 0; i < metodos_atividade.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.text = metodos_atividade[i];
    novo_select.add(opt, novo_select.options[i + 1]);
  }

  // Adição da label à div
  $("#div_select").append('<label>Método de cálculo da atividade:</label>')

  $('select').material_select();
}

// Função de cálculo das temperaturas saturadas e vetor de temperaturas
function Antoine() {

  // Definição dos valores das constantes de Antoine para os componentes escolhidos
  for (i = 0; i <= data.componentes.length; i++) {

    if (data.componentes[i] == componente1) {
      j1 = i
    }

  }

  A1 = data.cte_antoineA[j1]
  B1 = data.cte_antoineB[j1]
  C1 = data.cte_antoineC[j1]

  for (i = 0; i <= data.componentes.length; i++) {

    if (data.componentes[i] == componente2) {
      j2 = i
    }

  }

  A2 = data.cte_antoineA[j2]
  B2 = data.cte_antoineB[j2]
  C2 = data.cte_antoineC[j2]

  //Cálculo das temperaturas de saturação
  T1sat = B1 / (A1 - Math.log(pressao)) - C1
  T2sat = B2 / (A2 - Math.log(pressao)) - C2

  //Definição do componente mais volátil e do intervalo de temperaturas, incluindo adequação aos métodos gráficos
  if (T1sat > T2sat) {

    compvolatil = componente2
    temperaturas = []

    for (i = 0; i <= 100; i++) {
      temperaturas.push(T2sat + i * (T1sat - T2sat) / 100)
    }

    if (T1sat - T2sat > 50) {
      alert("O método de McCabe-Thiele não se adequa a essa mistura. Sugere-se o uso do método de Ponchon-Savarit")
    }

  } else if (T2sat > T1sat) {

    compvolatil = componente1
    temperaturas = []

    for (i = 0; i <= 100; i++) {
      temperaturas.push(T1sat + i * (T2sat - T1sat) / 100)
    }

    if (T2sat - T1sat > 50) {
      alert("O método de McCabe-Thiele não se adequa a essa mistura. Sugere-se o uso do método de Ponchon-Savarit")
    }

  }

}

// Funções de cálculo de coeficientes de atividade para cada método não ideal
function Van_Laar() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = []
  A21 = []
  A12 = data.vl_A12[j3]
  A21 = data.vl_A21[j3]

  // Cálculo das atividades
  atividade1 = Math.exp(A12 * Math.pow(((A21 * x2) / (A12 * x1 + A21 * x2)), 2))
  atividade2 = Math.exp(A21 * Math.pow(((A12 * x1) / (A12 * x1 + A21 * x2)), 2))

}

function NRTL() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = []
  A21 = []
  A12 = data.NRTL_A12[j4]
  A21 = data.NRTL_A21[j4]
  alfa = data.NRTL_alfa[j4]
  tau12 = A12 / (1.9872 * T1)
  tau21 = A21 / (1.9872 * T1)
  g12 = Math.exp(-alfa * tau12)
  g21 = Math.exp(-alfa * tau21)

  // Cálculo das atividades
  atividade1 = Math.exp(Math.pow(x2, 2) * (tau21 * Math.pow(g21 / (x1 + x2 * g21), 2) + tau12 * g12 / Math.pow(x2 + x1 * g12, 2)), 2)
  atividade2 = Math.exp(Math.pow(x1, 2) * (tau12 * Math.pow(g12 / (x2 + x1 * g12), 2) + tau21 * g21 / Math.pow(x1 + x2 * g21, 2)), 2)

}

function Wilson() {

  // Definição dos parâmetros do método de acordo com o banco de dados
  A12 = []
  A21 = []
  A12 = data.Wilson_A12[j5]
  A21 = data.Wilson_A21[j5]

  for (var k = 0; k < data.componentes.length; k++) {

    if (data.componentes[k] == componente1) {
      w_componente1 = data.prop_w[k]
      Pc_componente1 = data.prop_Pc[k]
      Tc_componente1 = data.prop_Tc[k]
    }

    if (data.componentes[k] == componente2) {
      w_componente2 = data.prop_w[k]
      Pc_componente2 = data.prop_Pc[k]
      Tc_componente2 = data.prop_Tc[k]
    }

  }

  zra1 = 0.29056 - 0.08775 * w_componente1
  Tr1 = T1 / (Tc_componente1 + 273.15)
  V1 = (8.314 * (Tc_componente1 + 273.15) / Pc_componente1) * Math.pow(zra1, (1 + Math.pow(1 - Tr1, 2 / 7)))
  zra2 = 0.29056 - 0.08775 * w_componente2
  Tr2 = T1 / (Tc_componente2 + 273.15)
  V2 = (8.314 * (Tc_componente2 + 273.15) / Pc_componente2) * Math.pow(zra2, (1 + Math.pow(1 - Tr2, 2 / 7)))
  tau12 = (V2 / V1) * Math.exp(-A12 / (1.9872 * T1))
  tau21 = (V1 / V2) * Math.exp(-A21 / (1.9872 * T1))

  // Cálculo das atividades
  ln_atividade1 = -Math.log(x1 + tau12 * x2) + x2 * (tau12 / (x1 + tau12 * x2) - tau21 / (x2 + x1 * tau21))
  atividade1 = Math.exp(ln_atividade1)
  ln_atividade2 = -Math.log(x2 + tau21 * x1) - x1 * (tau12 / (x1 + tau12 * x2) - tau21 / (x2 + x1 * tau21))
  atividade2 = Math.exp(ln_atividade2) //Verificar se é - ou + aqui

}

function UNIFAC() {
  alert("Ainda não ta pronta")
}

//Função de cálculo da curva de equilibrio líquido-vapor para misturas ideais
function curvaeq_ideal() {

  //Definição das constantes de Antoine para cada componente de acordo com o banco de dados
  Antoine()

  //Cálculo da pressão saturada para o intervalo de temperaturas
  P1sat = []
  P2sat = []
  for (i = 0; i <= 100; i++) {
    P1sat.push(Math.exp(A1 - B1 / (temperaturas[i] + C1)))
    P2sat.push(Math.exp(A2 - B2 / (temperaturas[i] + C2)))
  }

  // Cálculo dos pares x,y da curva ELV e da volatilidade relativa
  xvolatil = []
  yvolatil = []

  for (var i = 0; i <= 100; i++) {

    if (P1sat[i] > P2sat[i]) {

      xvolatil.push((pressao - P2sat[i]) / (P1sat[i] - P2sat[i]))
      yvolatil.push(xvolatil[i] * P1sat[i] / pressao)

    } else if (P1sat[i] < P2sat[i]) {

      xvolatil.push((pressao - P1sat[i]) / (P2sat[i] - P1sat[i]))
      yvolatil.push(xvolatil[i] * P2sat[i] / pressao)

    }

  }

  for (var i = 0; i <= 100; i++) {

    if ((xvolatil[i] * (1 - yvolatil[i])) != 0) {
      alfa_ideal.push((yvolatil[i] * (1 - xvolatil[i])) / (xvolatil[i] * (1 - yvolatil[i])))
    }

  }

}

//Função de cálculo da curva de equilibrio líquido-vapor para misturas não ideais
function curvaeq_naoideal() {

  // Limpeza dos vetores
  yvolatil = []
  xvolatil = []

  // Criação de um vetor de yvolatil de 0 a 1, com intervalos de 0.01
  yvolatil[0] = 0
  for (i = 1; i < 101; i++) {
    yvolatil[i] = yvolatil[i - 1] + 0.01
  }

  // Organização dos componentes de acordo com o método de cálculo de atividade escolhido
  if (metodo_atividade == "Van Laar") {

    for (i = 0; i < data.misturas_vl.length; i++) {

      if (data.misturas_vl[i] == componente1 + " e " + componente2) {
        j3 = i
      } else if (data.misturas_vl[i] == componente2 + " e " + componente1) {
        aux = componente1
        componente1 = componente2
        componente2 = aux
        j3 = i
      }

    }

  } else if (metodo_atividade == "NRTL") {

    for (i = 0; i < data.misturas_NRTL.length; i++) {

      if (data.misturas_NRTL[i] == componente1 + " e " + componente2) {
        j4 = i
      } else if (data.misturas_NRTL[i] == componente2 + " e " + componente1) {
        aux = componente1
        componente1 = componente2
        componente2 = aux
        j4 = i
      }

    }

  } else if (metodo_atividade == "Wilson") {

    for (i = 0; i < data.misturas_Wilson.length; i++) {

      if (data.misturas_Wilson[i] == componente1 + " e " + componente2) {
        j5 = i
      } else if (data.misturas_Wilson[i] == componente2 + " e " + componente1) {
        aux = componente1
        componente1 = componente2
        componente2 = aux
        j5 = i
      }

    }

  }

  // Cálculo das temperaturas de saturação
  Antoine()

  // Cálculo do vetor xvolatil, seguindo o método iterativo Orvalho T
  for (i = 0; i < yvolatil.length; i++) {

    if (T1sat <= T2sat) {

      T1 = yvolatil[i] * T1sat + (1 - yvolatil[i]) * T2sat + 273.15
      Psat_comp1 = Math.exp(A1 - B1 / ((T1 - 273.15) + C1))
      Psat_comp2 = Math.exp(A2 - B2 / ((T1 - 273.15) + C2))
      atividade1 = 1
      atividade2 = 1
      xvolatil.push(yvolatil[i] * pressao / (atividade1 * Psat_comp1))
      x1 = xvolatil[i]
      x2 = 1 - x1

      do {

        if (metodo_atividade == "Van Laar") {
          Van_Laar()
        } else if (metodo_atividade == "NRTL") {
          NRTL()
        } else if (metodo_atividade == "Wilson") {
          Wilson()
        } else if (metodo_atividade == "UNIFAC") {
          UNIFAC()

        }

        P1aux = 1 / (yvolatil[i] / (Psat_comp1 * atividade1) + (1 - yvolatil[i]) / (Psat_comp2 * atividade2))
        T2 = (B1 / (A1 - Math.log(P1aux)) - C1) + 273.15

        if (T1 > T2) {
          diferenca = T1 - T2
        } else {
          diferenca = T2 - T1
        }

        T1 = T2

      } while (diferenca >= 0.001)

      xvolatil.pop()
      xvolatil.push(yvolatil[i] * pressao / (atividade1 * Psat_comp1))

    } else if (T2sat < T1sat) {

      T1 = (yvolatil[i] * T2sat + (1 - yvolatil[i]) * T1sat) + 273.15
      Psat_comp1 = Math.exp(A1 - B1 / ((T1 - 273.15) + C1))
      Psat_comp2 = Math.exp(A2 - B2 / ((T1 - 273.15) + C2))
      atividade1 = 1
      atividade2 = 1
      xvolatil.push((1 - yvolatil[i]) * pressao / (atividade2 * Psat_comp2))
      x1 = xvolatil[i]
      x2 = 1 - x1

      do {

        if (metodo_atividade == "Van Laar") {
          Van_Laar()
        } else if (metodo_atividade == "NRTL") {
          NRTL()
        } else if (metodo_atividade == "Wilson") {
          Wilson()
        }

        P1aux = 1 / (yvolatil[i] / (Psat_comp1 * atividade1) + (1 - yvolatil[i]) / (Psat_comp2 * atividade2))
        T2 = (B2 / (A2 - Math.log(P1aux)) - C2) + 273.15

        if (T1 > T2) {
          diferenca = T1 - T2
        } else {
          diferenca = T2 - T1
        }

        T1 = T2

      } while (diferenca >= 0.001)

      xvolatil.pop()
      xvolatil.push((1 - yvolatil[i]) * pressao / (atividade2 * Psat_comp2))

    }
  }
}

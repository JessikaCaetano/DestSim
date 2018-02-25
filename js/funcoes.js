function Antoine() {

  // Valores das ctes de Antoine para os componentes escolhidos
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
  } else {
    console.error("Componentes idênticos")
  }

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
    if (P1sat <= P2sat) {
      xvolatil.push((pressao - P2sat[i]) / (P1sat[i] - P2sat[i]))
      yvolatil.push(xvolatil[i] * P1sat[i] / pressao)
    } else {
      xvolatil.push((pressao - P1sat[i]) / (P2sat[i] - P1sat[i]))
      yvolatil.push(xvolatil[i] * P2sat[i] / pressao)
    }
  }

  for (var i = 0; i <= 100; i++) {
    if ((xvolatil[i] * (1 - yvolatil[i])) != 0) {
      alfa.push((yvolatil[i] * (1 - xvolatil[i])) / (xvolatil[i] * (1 - yvolatil[i])))
    }
  }

}

function Van_Laar() {

  A12 = data.vl_A12[j3]
  A21 = data.vl_A21[j3]

  atividade1 = Math.exp(A12 * Math.pow(((A21 * (1 - xvolatil[i])) / (A12 * xvolatil[i] + A21 * (1 - xvolatil[i]))), 2))
  atividade2 = Math.exp(A21 * Math.pow(((A12 * xvolatil[i]) / (A12 * xvolatil[i] + A21 * (1 - xvolatil[i]))), 2))

}

function NRTL() {

  A12 = data.NRTL_A12[j4]
  A21 = data.NRTL_A21[j4]
  alfa = data.NRTL_alfa[j4]

  tau12 = A12 / (1.9872 * T1)
  tau21 = A21 / (1.9872 * T1)
  g12 = Math.exp(-alfa * tau12)
  g21 = Math.exp(-alfa * tau21)
  atividade1 = Math.exp(Math.pow(1 - xvolatil[i], 2) * (tau21 * Math.pow(g21 / (xvolatil[i] + (1 - xvolatil[i]) * g21), 2) + tau12 * g12 / Math.pow((1 - xvolatil[i]) + xvolatil[i] * g12, 2)), 2)
  atividade2 = Math.exp(Math.pow(xvolatil[i], 2) * (tau12 * Math.pow(g12 / ((1 - xvolatil[i]) + xvolatil[i] * g12), 2) + tau21 * g21 / Math.pow(xvolatil[i] + (1 - xvolatil[i]) * g21, 2)), 2)

}

function Wilson() {

  A12 = data.Wilson_A12[j5]
  A21 = data.Wilson_A21[j5]
  for (var i = 0; i < data.componentes.length; i++) {
    if (data.componentes[i] == componente1) {
      w_componente1 = data.prop_w[i]
      Pc_componente1 = data.prop_Pc[i]
      Tc_componente1 = data.prop_Tc[i]+273.15
    }
    if (data.componentes[i] == componente2) {
      w_componente2 = data.prop_w[i]
      Pc_componente2 = data.prop_Pc[i]
      Tc_componente2 = data.prop_Tc[i]+273.15
    }
  }

  zra1 = 0.29056 - 0.08775 * w_componente1
  Tr1 = T1 / Tc_componente1
  V1 = (1.9872 * Tc_componente1 / Pc_componente1) * Math.pow(zra1, (1 + Math.pow(1 - Tr1, 2 / 7)))
  zra2 = 0.29056 - 0.08775 * w_componente2
  Tr2 = T1 / Tc_componente2
  V2 = (1.9872 * Tc_componente2 / Pc_componente2) * Math.pow(zra2, (1 + Math.pow(1 - Tr2, 2 / 7)))
  tau12 = (V2 / V1) * Math.exp(-A12 / (1.9872 * T1))
  tau21 = (V1 / V2) * Math.exp(-A21 / (1.9872 * T1))
  ln_atividade1 = Math.log(xvolatil[i] + tau12 * (1 - xvolatil[i])) + (1 - xvolatil[i]) * (tau12 / (xvolatil[i] + tau12 * (1 - xvolatil[i])) - tau21 / ((1 - xvolatil[i]) + xvolatil[i] * tau21))
  atividade1 = Math.exp(ln_atividade1)
  ln_atividade2 = Math.log((1 - xvolatil[i]) + tau21 * xvolatil[i]) + xvolatil[i] * (tau12 / (xvolatil[i] + tau12 * (1 - xvolatil[i])) - tau21 / ((1 - xvolatil[i]) + xvolatil[i] * tau21))
  atividade2 = Math.exp(ln_atividade2)

}

function curvaeq_naoideal() {

  yvolatil = []
  xvolatil = []

  // Criação de um vetor de xvolatil de 0 a 1, com intervalos de 0.01
  xvolatil[0] = 0
  for (i = 1; i < 101; i++) {
    xvolatil[i] = xvolatil[i - 1] + 0.01
  }

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

  for (i = 0; i < xvolatil.length; i++) {
    if (T1sat < T2sat) {

      T1 = xvolatil[i] * T1sat + (1 - xvolatil[i]) * T2sat+273.15
      P1sat = Math.exp(A1 - B1 / ((T1-273.15) + C1))
      P2sat = Math.exp(A2 - B2 / ((T1-273.15) + C2))

      do {

        if (metodo_atividade == "Van Laar") {
          Van_Laar()
        } else if (metodo_atividade == "NRTL") {
          NRTL()
        } else if (metodo_atividade == "Wilson") {
          Wilson()
        }

        P1aux = (pressao / (xvolatil[i] * atividade1 + ((1 - xvolatil[i]) * atividade2 * P2sat) / P1sat))
        T2 = (B1 / (A1 - Math.log(P1aux)) - C1)+273.15
        if (T1 > T2) {
          diferenca = T1 - T2
        } else {
          diferenca = T2 - T1
        }
        T1 = T2
      } while (diferenca >= 0.001)

      yvolatil.push(xvolatil[i] * atividade1 * P1sat / pressao)

    } else if (T2sat < T1sat) {
      T1 = (xvolatil[i] * T2sat + (1 - xvolatil[i]) * T1sat)+273.15
      P1sat = Math.exp(A1 - B1 / ((T1-273.15) + C1))
      P2sat = Math.exp(A2 - B2 / ((T1-273.15) + C2))

      do {
        if (metodo_atividade == "Van Laar") {
          Van_Laar()
        } else if (metodo_atividade == "NRTL") {
          NRTL()
        } else if (metodo_atividade == "Wilson") {
          Wilson()
        }

        P1aux = (pressao / (xvolatil[i] * atividade2 + ((1 - xvolatil[i]) * atividade1 * P1sat) / P2sat))
        T2 = (B2 / (A2 - Math.log(P1aux)) - C2)+273.15
        if (T1 > T2) {
          diferenca = T1 - T2
        } else {
          diferenca = T2 - T1
        }
        T1 = T2
      } while (diferenca >= 0.001)
      yvolatil.push(xvolatil[i] * atividade2 * P2sat / pressao)

    }
  }
}

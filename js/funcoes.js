//Função de cálculo da curva de equilibrio líquido-vapor para misturas ideais
function curvaeq_ideal() {

  //Definição das constantes de Antoine para cada componente de acordo com o banco de dados
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
    for (i = 0; i <= 100; i++) {
      temperaturas.push(T2sat + i * (T1sat - T2sat) / 100)
    }

    if (T1sat - T2sat > 50) {
      alert("O método de McCabe-Thiele não se adequa a essa mistura. Sugere-se o uso do método de Ponchon-Savarit")
    }
  } else if (T2sat > T1sat) {
    compvolatil = componente1
    for (i = 0; i <= 100; i++) {
      temperaturas.push(T1sat + i * (T2sat - T1sat) / 100)
    }
    if (T2sat - T1sat > 50) {
      alert("O método de McCabe-Thiele não se adequa a essa mistura. Sugere-se o uso do método de Ponchon-Savarit")
    }
  } else {
    console.error("Componentes idênticos")
  }

  //Cálculo da pressão saturada para o intervalo de temperaturas
  for (i = 0; i <= 100; i++) {
    P1sat.push(Math.exp(A1 - B1 / (temperaturas[i] + C1)))
    P2sat.push(Math.exp(A2 - B2 / (temperaturas[i] + C2)))
  }

  // Cálculo dos pares x,y da curva ELV e da volatilidade relativa
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
